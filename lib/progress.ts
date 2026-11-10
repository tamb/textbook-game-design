import { passMark } from "./grade";
import type { Logbook, QuizRecord } from "./types";

export const STORAGE_KEY = "practice-range-logbook-v1";
export const STORAGE_EVENT = "practice-range-logbook";

export function emptyLogbook(): Logbook {
  return { version: 1, lessons: {}, quizzes: {} };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function parseLogbook(raw: string | null | undefined): Logbook {
  if (!raw) return emptyLogbook();
  try {
    const data = JSON.parse(raw) as Partial<Logbook>;
    if (data?.version !== 1 || !isRecord(data.lessons) || !isRecord(data.quizzes)) return emptyLogbook();
    const lessons: Logbook["lessons"] = {};
    for (const [slug, value] of Object.entries(data.lessons)) {
      if (isRecord(value) && typeof value.completedAt === "string") lessons[slug] = { completedAt: value.completedAt };
    }
    const quizzes: Logbook["quizzes"] = {};
    for (const [slug, value] of Object.entries(data.quizzes)) {
      if (!isRecord(value)) continue;
      const version = value.version;
      const bestCorrect = value.bestCorrect;
      const total = value.total;
      const lastCorrect = value.lastCorrect;
      const attempts = value.attempts;
      const passed = value.passed;
      const updatedAt = value.updatedAt;
      if (
        typeof version !== "number" ||
        typeof bestCorrect !== "number" ||
        typeof total !== "number" ||
        typeof lastCorrect !== "number" ||
        typeof attempts !== "number" ||
        typeof passed !== "boolean" ||
        typeof updatedAt !== "string"
      ) {
        continue;
      }
      quizzes[slug] = { version, bestCorrect, total, lastCorrect, attempts, passed, updatedAt };
    }
    return { version: 1, lessons, quizzes };
  } catch {
    return emptyLogbook();
  }
}

export function markLesson(book: Logbook, slug: string, at = new Date().toISOString()): Logbook {
  return { ...book, lessons: { ...book.lessons, [slug]: { completedAt: at } } };
}

export function recordQuiz(
  book: Logbook,
  slug: string,
  version: number,
  correct: number,
  total: number,
  at = new Date().toISOString(),
): Logbook {
  const prev = book.quizzes[slug];
  const compatible = Boolean(prev && prev.version === version && prev.total === total);
  const bestCorrect = Math.max(compatible ? prev!.bestCorrect : 0, correct);
  const next: QuizRecord = {
    version,
    bestCorrect,
    total,
    lastCorrect: correct,
    attempts: (compatible ? prev!.attempts : 0) + 1,
    passed: bestCorrect >= passMark(total),
    updatedAt: at,
  };
  return { ...book, quizzes: { ...book.quizzes, [slug]: next } };
}

export type ClearMode = "lesson" | "quiz" | "both";

export function clearSlugs(book: Logbook, slugs: readonly string[], mode: ClearMode): Logbook {
  const drop = new Set(slugs);
  const lessons = { ...book.lessons };
  const quizzes = { ...book.quizzes };
  for (const slug of drop) {
    if (mode === "lesson" || mode === "both") delete lessons[slug];
    if (mode === "quiz" || mode === "both") delete quizzes[slug];
  }
  return { ...book, lessons, quizzes };
}

export function quizIfCurrent(
  book: Logbook,
  slug: string,
  version: number,
): QuizRecord | null {
  const row = book.quizzes[slug];
  if (!row || row.version !== version) return null;
  return row;
}
