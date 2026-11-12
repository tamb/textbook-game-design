import vm from "node:vm";
import { attackerBusy, frameAdvantage, framesFromMs } from "../lib/designMath";
import { passMark } from "../lib/grade";
import { glossary } from "../lib/glossary";
import { modules } from "../lib/course";
import { canonicalPlace, parsePlace, PLACE_KEY, resumeBootScript, resumeHref, SESSION_KEY } from "../lib/place";
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

expect(canonicalPlace("/learn/feel", "polish")?.path === "/learn/feel/", "a chapter path gains a trailing slash");
expect(canonicalPlace("/learn/feel/", "polish")?.section === "polish", "a safe section is kept");
expect(canonicalPlace("/logbook/", null)?.path === "/progress/", "the old logbook address resumes on My Progress");
expect(canonicalPlace("/bench/", "frame-advantage")?.path === "/tools/", "the old bench address resumes on Practice Tools");
expect(canonicalPlace("https://evil.example/", "polish") === null, "an off-site address is not a place");
expect(canonicalPlace("/learn/feel/../../", "polish") === null, "a path cannot climb out of the site");
expect(canonicalPlace("/learn/feel/", "../polish")?.section === null, "a section cannot be a path");
expect(canonicalPlace("/learn/feel/", "polish<script>")?.section === null, "a section is limited to an anchor id");
expect(parsePlace('{"path":"/quiz/frames/","section":"frames-2"}')?.section === "frames-2", "a saved quiz question is a section");
expect(parsePlace("{") === null, "broken place data is ignored");
expect(resumeHref({ path: "/learn/feel/", section: "polish" }, "/textbook-game-design") === "/textbook-game-design/learn/feel/#polish", "resume keeps the site prefix and the section");
expect(resumeHref({ path: "/", section: null }) === "", "the contents page with no section is not a resume target");
expect(resumeHref({ path: "/", section: "part-two" }, "") === "/#part-two", "a contents part is restored");

type BootOptions = {
  base?: string;
  pathname: string;
  search?: string;
  hash?: string;
  place?: unknown;
  standalone?: boolean;
  ios?: boolean;
  session?: string | null;
};

function boot(options: BootOptions) {
  const local = new Map<string, string>();
  if ("place" in options) local.set(PLACE_KEY, JSON.stringify(options.place));
  const session = new Map<string, string>();
  if (options.session) session.set(SESSION_KEY, options.session);
  let replaced: string | null = null;
  let replacedState: string | null = null;
  const window = {
    location: {
      pathname: options.pathname,
      search: options.search ?? "",
      hash: options.hash ?? "",
      replace(url: string) {
        replaced = url;
      },
    },
    localStorage: {
      getItem: (key: string) => local.get(key) ?? null,
      setItem: (key: string, value: string) => local.set(key, value),
    },
    sessionStorage: {
      getItem: (key: string) => session.get(key) ?? null,
      setItem: (key: string, value: string) => session.set(key, value),
    },
    navigator: { standalone: Boolean(options.ios) },
    matchMedia(query: string) {
      return { matches: Boolean(options.standalone) && query.includes("display-mode: standalone") };
    },
    history: {
      replaceState(_state: unknown, _title: string, url: string) {
        replacedState = url;
      },
    },
    __resumeHold: false,
  };
  const context = vm.createContext({ window, JSON, URLSearchParams });
  vm.runInContext(resumeBootScript(options.base ?? ""), context);
  return { replaced, replacedState, hold: window.__resumeHold, session: session.get(SESSION_KEY) ?? null };
}

const savedChapter = { path: "/learn/feel/", section: "polish" };
const coldStart = boot({
  base: "/textbook-game-design",
  pathname: "/textbook-game-design/",
  search: "?source=pwa",
  place: savedChapter,
});
expect(coldStart.replaced === "/textbook-game-design/learn/feel/#polish", "launching the installed app opens the saved section");
expect(coldStart.hold, "the contents page does not overwrite the saved place while it is leaving");
expect(coldStart.session === "1", "a launch counts as a session");

const ordinary = boot({ pathname: "/", place: savedChapter });
expect(ordinary.replaced === null, "opening the site in a browser tab stays on the page that was requested");

const inSession = boot({
  pathname: "/",
  standalone: true,
  session: "1",
  place: savedChapter,
});
expect(inSession.replaced === null, "refreshing the contents page during a session stays on contents");

const freshStandalone = boot({ pathname: "/", standalone: true, place: savedChapter });
expect(freshStandalone.replaced === "/learn/feel/#polish", "a fresh standalone launch without the query still resumes");

const ios = boot({ pathname: "/", search: "", ios: true, place: savedChapter });
expect(ios.replaced === "/learn/feel/#polish", "an iOS home-screen launch resumes");

const samePage = boot({
  base: "/textbook-game-design",
  pathname: "/textbook-game-design/learn/frames/",
  standalone: true,
  place: { path: "/learn/frames/", section: "startup" },
});
expect(samePage.replaced === "/textbook-game-design/learn/frames/#startup", "reopening a chapter restores its section");
expect(!samePage.hold, "restoring a hash on the current page keeps recording");

const explicitChapter = boot({
  pathname: "/learn/combat/",
  search: "?source=pwa",
  standalone: true,
  place: savedChapter,
});
expect(explicitChapter.replaced === null, "a direct chapter address is not replaced by a different saved page");
expect(explicitChapter.replacedState === "/learn/combat/", "the launch query is removed from a direct address");

const hostile = boot({
  pathname: "/",
  search: "?source=pwa",
  place: { path: "https://evil.example/learn/feel/", section: "polish" },
});
expect(hostile.replaced === null, "a saved address outside the book is ignored");
expect(hostile.replacedState === "/", "a launch with nothing safe to open still clears the launch query");

const homePart = boot({ pathname: "/", search: "?source=pwa", place: { path: "/", section: "part-two" } });
expect(homePart.replaced === "/#part-two", "a saved part of the contents page is restored");

const noHistory = boot({ pathname: "/", search: "?source=pwa" });
expect(noHistory.replaced === null && noHistory.replacedState === "/", "the first launch opens the contents page");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`ok: ${modules.length} chapters, ${questionIds.size} questions, ${glossary.length} terms`);
