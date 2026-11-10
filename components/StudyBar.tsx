"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import { useProgress } from "./ProgressProvider";

export function StudyBar({
  slug,
  quizVersion,
  passAt,
  questionCount,
}: {
  slug: string;
  quizVersion: number;
  passAt: number;
  questionCount: number;
}) {
  const { book, mounted, study, clear } = useProgress();
  const lesson = mounted ? book.lessons[slug] : undefined;
  const stored = mounted ? book.quizzes[slug] : undefined;
  const quiz = stored && stored.version === quizVersion ? stored : null;

  return (
    <div className="study-bar">
      <div>
        <p>
          Test your understanding with {questionCount} multiple-choice questions. You need {passAt} correct answers to
          pass. You can retake the questions as many times as you like.
        </p>
        {!mounted ? <p className="status">Loading your progress…</p> : null}
        {mounted && lesson ? <p className="status">You marked this chapter as read on {formatWhen(lesson.completedAt)}.</p> : null}
        {mounted && quiz ? (
          <p className="status">
            Your best score is {quiz.bestCorrect} out of {quiz.total}
            {quiz.passed ? ", which is a pass." : `. You need ${passAt} to pass.`} You have tried {quiz.attempts}{" "}
            {quiz.attempts === 1 ? "time" : "times"}.
          </p>
        ) : null}
        {mounted && stored && !quiz ? (
          <p className="status">These questions have been updated since your last attempt, so your old score is not shown.</p>
        ) : null}
      </div>
      <div className="study-actions">
        <Link className="button" href={`/quiz/${slug}/`}>
          {quiz ? "Retake the review questions" : "Start the review questions"}
        </Link>
        {mounted && lesson ? (
          <button type="button" className="button ghost" onClick={() => clear([slug], "lesson")}>
            Unmark as read
          </button>
        ) : (
          <button type="button" className="button secondary" onClick={() => study(slug)} disabled={!mounted}>
            Mark chapter as read
          </button>
        )}
      </div>
    </div>
  );
}
