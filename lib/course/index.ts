import { passMark } from "../grade";
export { chapterLabel } from "../format";
import { headingId } from "../slug";
import type { Module, Part, PartId, Section, Summary } from "../types";
import { combat } from "./combat";
import { feel } from "./feel";
import { forgiveness } from "./forgiveness";
import { frames } from "./frames";
import { physics } from "./physics";
import { sessions } from "./sessions";
import { structure } from "./structure";
import { teaching } from "./teaching";

export const parts: Part[] = [
  {
    id: "one",
    number: "One",
    title: "How a game feels",
    description:
      "What makes controls feel good, how attacks are timed frame by frame, and how games quietly forgive small mistakes.",
  },
  {
    id: "two",
    number: "Two",
    title: "Bodies in space",
    description:
      "How a game decides that one thing touched another, and how the game's internal clock keeps those decisions consistent.",
  },
  {
    id: "three",
    number: "Three",
    title: "Designing the whole game",
    description:
      "How individual actions become a game worth repeating, how players learn what they can do, and why people come back.",
  },
];

export const modules: Module[] = [feel, frames, forgiveness, combat, physics, structure, teaching, sessions];

export function getModule(slug: string): Module | undefined {
  return modules.find((module) => module.slug === slug);
}

export function getPart(id: PartId): Part {
  return parts.find((part) => part.id === id)!;
}

export function neighbors(slug: string): { prev: Module | null; next: Module | null } {
  const index = modules.findIndex((module) => module.slug === slug);
  return {
    prev: index > 0 ? modules[index - 1] : null,
    next: index >= 0 && index < modules.length - 1 ? modules[index + 1] : null,
  };
}

export function sectionsOf(module: Module): Section[] {
  const chapter = Number(module.number);
  return module.blocks
    .filter((block) => block.type === "h")
    .map((block, index) => ({
      id: headingId(block.text),
      number: `${chapter}.${index + 1}`,
      title: block.text,
    }));
}

export function summarize(module: Module): Summary {
  return {
    slug: module.slug,
    number: module.number,
    part: module.part,
    title: module.title,
    summary: module.summary,
    minutes: module.minutes,
    questionCount: module.quiz.length,
    passAt: passMark(module.quiz.length),
    quizVersion: module.quizVersion,
    termIds: module.termIds,
    sections: sectionsOf(module),
  };
}

export function summaries(): Summary[] {
  return modules.map(summarize);
}
