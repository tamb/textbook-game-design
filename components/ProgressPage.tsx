"use client";

import Link from "next/link";
import { useState } from "react";
import { chapterLabel, formatWhen } from "@/lib/format";
import type { ClearMode } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

const modes: { id: ClearMode; label: string; confirm: string }[] = [
  { id: "lesson", label: "Reset “read” marks", confirm: "Click again to reset “read” marks" },
  { id: "quiz", label: "Reset review scores", confirm: "Click again to reset review scores" },
  { id: "both", label: "Reset both", confirm: "Click again to reset both" },
];

export function ProgressPage() {
  const { catalog, book, mounted, clear } = useProgress();
  const [picked, setPicked] = useState<string[]>([]);
  const [pending, setPending] = useState<ClearMode | null>(null);
  const [confirmAll, setConfirmAll] = useState(false);

  function toggle(slug: string) {
    setPending(null);
    setPicked((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
  }

  function run(mode: ClearMode) {
    if (picked.length === 0) return;
    if (pending !== mode) {
      setPending(mode);
      setConfirmAll(false);
      return;
    }
    clear(picked, mode);
    setPicked([]);
    setPending(null);
  }

  const studied = catalog.filter((item) => book.lessons[item.slug]).length;
  const passed = catalog.filter((item) => {
    const quiz = book.quizzes[item.slug];
    return Boolean(quiz && quiz.version === item.quizVersion && quiz.passed);
  }).length;

  return (
    <div className="logbook">
      <p>
        {mounted
          ? `You have read ${studied} of ${catalog.length} chapters and passed ${passed} of ${catalog.length} sets of review questions.`
          : "Loading your progress…"}
      </p>
      <ul className="log-list">
        {catalog.map((item) => {
          const lesson = book.lessons[item.slug];
          const stored = book.quizzes[item.slug];
          const quiz = stored && stored.version === item.quizVersion ? stored : null;
          return (
            <li key={item.slug}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={picked.includes(item.slug)}
                  onChange={() => toggle(item.slug)}
                  aria-label={`Select ${chapterLabel(item)}: ${item.title}`}
                />
              </label>
              <div>
                <p className="kicker">{chapterLabel(item)}</p>
                <h2>
                  <Link href={`/learn/${item.slug}/`}>{item.title}</Link>
                </h2>
                {!mounted ? <p>Loading…</p> : null}
                {mounted ? (
                  <ul className="progress-facts">
                    <li>{lesson ? `Marked as read on ${formatWhen(lesson.completedAt)}.` : "Not yet marked as read."}</li>
                    <li>
                      {quiz
                        ? `Best review score: ${quiz.bestCorrect} of ${quiz.total}${quiz.passed ? " (passed)" : ` (${item.passAt} needed to pass)`}. Most recent: ${quiz.lastCorrect} of ${quiz.total} on ${formatWhen(quiz.updatedAt)}. Attempts: ${quiz.attempts}.`
                        : stored
                          ? "The review questions were updated after your last attempt, so your old score is not counted."
                          : "Review questions not yet attempted."}
                    </li>
                  </ul>
                ) : null}
                <p className="inline-links">
                  <Link href={`/learn/${item.slug}/`}>Read the chapter</Link>
                  <Link href={`/quiz/${item.slug}/`}>Review questions</Link>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="clear-bar">
        <h2>Reset selected chapters</h2>
        <p>
          Tick the box next to one or more chapters above, then choose what to reset. You will be asked to click a second
          time to confirm.
        </p>
        <div className="study-actions">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className="button ghost"
              disabled={!mounted || picked.length === 0}
              onClick={() => run(mode.id)}
            >
              {pending === mode.id ? `${mode.confirm} (${picked.length})` : mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="danger-zone">
        <h2>Reset everything</h2>
        <p>This removes every “read” mark and every review score saved in this browser. The chapters themselves are not affected.</p>
        {confirmAll ? (
          <div className="study-actions">
            <button
              type="button"
              className="button danger"
              onClick={() => {
                clear(
                  catalog.map((item) => item.slug),
                  "both",
                );
                setPicked([]);
                setPending(null);
                setConfirmAll(false);
              }}
            >
              Yes, reset all my progress
            </button>
            <button type="button" className="button ghost" onClick={() => setConfirmAll(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" className="button danger" onClick={() => setConfirmAll(true)} disabled={!mounted}>
            Reset all progress
          </button>
        )}
      </div>
    </div>
  );
}
