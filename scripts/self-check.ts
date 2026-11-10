import { attackerBusy, frameAdvantage, framesFromMs } from "../lib/designMath";
import { passMark } from "../lib/grade";
import { glossary } from "../lib/glossary";
import { modules } from "../lib/course";
import { clearSlugs, emptyLogbook, markLesson, parseLogbook, quizIfCurrent, recordQuiz } from "../lib/progress";
import { headingId } from "../lib/slug";

const failures: string[] = [];
const staticRoutes = new Set(["/", "/introduction/", "/tools/", "/glossary/", "/progress/", "/bench/", "/logbook/"]);

function expect(condition: unknown, message: string) {
  if (!condition) failures.push(message);
}

expect(passMark(6) === 5, "six questions pass at five");
expect(frameAdvantage(8, 1, 7, 1) === 1, "jab is +1 on block");
expect(frameAdvantage(10, 3, 16, 1) === -8, "sweep is -8 on the first active frame");
expect(frameAdvantage(10, 3, 16, 3) === -6, "meaty sweep is -6");
expect(attackerBusy(3, 16, 1) === 18, "busy time includes leftover active frames");
expect(Math.abs(framesFromMs(100, 60) - 6) < 0.05, "100ms is about 6 frames at 60fps");

const slugs = new Set<string>();
const questionIds = new Set<string>();
const termIds = new Set(glossary.map((term) => term.id));

expect(termIds.size === glossary.length, "glossary ids are unique");

for (const chapter of modules) {
  expect(!slugs.has(chapter.slug), `duplicate slug ${chapter.slug}`);
  slugs.add(chapter.slug);
  expect(chapter.quiz.length === 6, `${chapter.slug} should have 6 questions`);
  const headingList = chapter.blocks
    .filter((block) => block.type === "h")
    .map((block) => (block.type === "h" ? headingId(block.text) : ""));
  const headings = new Set(headingList);
  expect(headings.size === headingList.length, `${chapter.slug} has two headings with the same anchor`);
  for (const question of chapter.quiz) {
    expect(!questionIds.has(question.id), `duplicate question ${question.id}`);
    questionIds.add(question.id);
    const choiceIds = new Set(question.choices.map((choice) => choice.id));
    expect(choiceIds.size === question.choices.length, `${question.id} has duplicate choices`);
    expect(choiceIds.has(question.answer), `${question.id} answer is missing`);
    expect(question.choices.length >= 3, `${question.id} needs choices`);
    if (question.review) expect(headings.has(question.review), `${question.id} review anchor ${question.review} missing`);
  }
  expect(chapter.objectives.length > 0, `${chapter.slug} needs learning objectives`);
  expect(chapter.recap.length > 0, `${chapter.slug} needs a chapter summary`);
  for (const block of chapter.blocks) {
    const texts =
      block.type === "p" || block.type === "callout" || block.type === "example" || block.type === "term"
        ? [block.text]
        : block.type === "ul" || block.type === "ol"
          ? block.items
          : [];
    for (const text of texts) {
      for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
        const href = match[1];
        const lesson = href.match(/^\/learn\/([^/]+)\/$/);
        const ok = lesson ? modules.some((item) => item.slug === lesson[1]) : staticRoutes.has(href);
        expect(ok, `${chapter.slug} links to unknown page ${href}`);
      }
    }
  }
  for (const termId of chapter.termIds) {
    expect(termIds.has(termId), `${chapter.slug} missing glossary term ${termId}`);
  }
}

for (const term of glossary) {
  const chapter = modules.find((item) => item.slug === term.module);
  expect(chapter, `${term.id} points at missing module`);
  expect(chapter?.termIds.includes(term.id), `${term.id} is not listed on its module`);
  if (term.anchor && chapter) {
    const headings = chapter.blocks.filter((block) => block.type === "h").map((block) => (block.type === "h" ? headingId(block.text) : ""));
    expect(headings.includes(term.anchor), `${term.id} anchor ${term.anchor} missing`);
  }
}

let book = markLesson(emptyLogbook(), "feel", "2026-01-01T00:00:00.000Z");
book = recordQuiz(book, "feel", 1, 4, 6, "2026-01-01T00:00:00.000Z");
book = recordQuiz(book, "feel", 1, 6, 6, "2026-01-02T00:00:00.000Z");
book = recordQuiz(book, "feel", 1, 3, 6, "2026-01-03T00:00:00.000Z");
expect(book.quizzes.feel.bestCorrect === 6, "best score is retained");
expect(book.quizzes.feel.lastCorrect === 3, "last score updates");
expect(book.quizzes.feel.passed, "best score still passes");
expect(book.quizzes.feel.attempts === 3, "attempts increment");
expect(quizIfCurrent(book, "feel", 2) === null, "version mismatch hides the old score");
book = clearSlugs(book, ["feel"], "quiz");
expect(!book.quizzes.feel && Boolean(book.lessons.feel), "clearing a quiz leaves the study mark");
book = clearSlugs(book, ["feel"], "lesson");
expect(!book.lessons.feel, "clearing a study mark removes it");
const dirty = parseLogbook(JSON.stringify({ version: 1, lessons: { feel: { completedAt: "2026-01-01T00:00:00.000Z" }, bad: { completedAt: 4 } }, quizzes: { feel: { nope: true }, frames: book.quizzes.frames } }));
expect(dirty.lessons.feel?.completedAt === "2026-01-01T00:00:00.000Z", "valid study marks survive a dirty logbook");
expect(!dirty.lessons.bad, "a study mark without a timestamp is dropped");
expect(!dirty.quizzes.feel, "a quiz record missing its fields is dropped");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`ok: ${modules.length} chapters, ${questionIds.size} questions, ${glossary.length} terms`);
