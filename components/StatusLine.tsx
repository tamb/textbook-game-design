"use client";

import { useProgress } from "./ProgressProvider";

export function StatusLine({ slug, quizVersion }: { slug: string; quizVersion: number }) {
  const { book, mounted } = useProgress();
  if (!mounted) return <p className="status pending">Loading your progress…</p>;
  const studied = Boolean(book.lessons[slug]);
  const quiz = book.quizzes[slug];
  const current = quiz && quiz.version === quizVersion ? quiz : null;
  const bits = [
    studied ? "Read" : "Not yet read",
    current
      ? `Best review score ${current.bestCorrect} of ${current.total}${current.passed ? " (passed)" : ""}`
      : "Review questions not attempted",
  ];
  return <p className="status">{bits.join(" · ")}</p>;
}

export function ProgressMeter() {
  const { catalog, book, mounted } = useProgress();
  const studied = catalog.filter((item) => book.lessons[item.slug]).length;
  const passed = catalog.filter((item) => {
    const quiz = book.quizzes[item.slug];
    return Boolean(quiz && quiz.version === item.quizVersion && quiz.passed);
  }).length;
  return (
    <section className="meter-card" aria-label="Your progress">
      <div>
        <p className="kicker">Your progress</p>
        <p className="meter-readout">
          {mounted
            ? `${studied} of ${catalog.length} chapters read. ${passed} of ${catalog.length} review quizzes passed.`
            : "Loading your progress…"}
        </p>
      </div>
      <div
        className="meter"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={catalog.length}
        aria-valuenow={mounted ? passed : 0}
        aria-label="Review quizzes passed"
      >
        <span style={{ width: mounted ? `${(passed / catalog.length) * 100}%` : "0%" }} />
      </div>
    </section>
  );
}
