export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "term"; term: string; text: string }
  | { type: "callout"; tone: "note" | "rule" | "warn"; title: string; text: string }
  | { type: "example"; title: string; text: string }
  | {
      type: "frames";
      caption: string;
      startup: number;
      active: number;
      recovery: number;
      note?: string;
    }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] };

export type Choice = { id: string; text: string };

export type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  answer: string;
  why: string;
  review?: string;
};

export type PartId = "one" | "two" | "three";

export type Part = {
  id: PartId;
  number: string;
  title: string;
  description: string;
};

export type Module = {
  slug: string;
  number: string;
  part: PartId;
  title: string;
  summary: string;
  minutes: number;
  termIds: string[];
  quizVersion: number;
  objectives: string[];
  blocks: Block[];
  recap: string[];
  quiz: Question[];
};

export type Term = {
  id: string;
  name: string;
  module: string;
  anchor?: string;
  short: string;
  detail: string;
};

export type Section = { id: string; number: string; title: string };

export type Summary = {
  slug: string;
  number: string;
  part: PartId;
  title: string;
  summary: string;
  minutes: number;
  questionCount: number;
  passAt: number;
  quizVersion: number;
  termIds: string[];
  sections: Section[];
};

export type LessonRecord = { completedAt: string };

export type QuizRecord = {
  version: number;
  bestCorrect: number;
  total: number;
  lastCorrect: number;
  attempts: number;
  passed: boolean;
  updatedAt: string;
};

export type Logbook = {
  version: 1;
  lessons: Record<string, LessonRecord>;
  quizzes: Record<string, QuizRecord>;
};
