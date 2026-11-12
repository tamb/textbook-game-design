"use client";

import Link from "next/link";
import { useState } from "react";
import { grade } from "@/lib/grade";
import type { Question } from "@/lib/types";
import { useProgress } from "./ProgressProvider";

export function QuizRunner({
  slug,
  title,
  version,
  passAt,
  questions,
  nextSlug,
}: {
  slug: string;
  title: string;
  version: number;
  passAt: number;
  questions: Question[];
  nextSlug: string | null;
}) {
  const { book, saveQuiz } = useProgress();
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ correct: number; passed: boolean } | null>(null);
  const [error, setError] = useState("");
  const savedRow = book.quizzes[slug];
  const saved = savedRow && savedRow.version === version ? savedRow : null;
  const answered = questions.filter((question) => chosen[question.id]).length;

  function submit() {
    const missing = questions.some((question) => !chosen[question.id]);
    if (missing) {
      setError(`Please answer every question before checking. You have answered ${answered} of ${questions.length}.`);
      return;
    }
    const graded = grade(
      questions.map((question) => chosen[question.id]),
      questions.map((question) => question.answer),
    );
    setError("");
    setResult({ correct: graded.correct, passed: graded.passed });
    saveQuiz(slug, version, graded.correct, graded.total);
  }

  function retry() {
    setChosen({});
    setResult(null);
    setError("");
    window.scrollTo({ top: 0 });
  }

  return (
    <form
      className="quiz"
      onSubmit={(event) => {
        event.preventDefault();
        if (!result) submit();
      }}
    >
      {questions.map((question, index) => {
        const picked = chosen[question.id];
        const unanswered = Boolean(error) && !picked;
        const gotIt = result ? picked === question.answer : null;
        return (
          <fieldset id={question.id} key={question.id} className={unanswered ? "needs-answer" : undefined}>
            <legend>
              <span>Question {index + 1}</span>
              {question.prompt}
            </legend>
            {question.choices.map((choice) => {
              const state = !result
                ? ""
                : choice.id === question.answer
                  ? "correct"
                  : picked === choice.id
                    ? "wrong"
                    : "";
              return (
                <label key={choice.id} className={`choice ${state}`} data-state={state}>
                  <input
                    type="radio"
                    name={question.id}
                    value={choice.id}
                    checked={picked === choice.id}
                    disabled={Boolean(result)}
                    onChange={() => {
                      setError("");
                      setChosen((current) => ({ ...current, [question.id]: choice.id }));
                    }}
                  />
                  <span>{choice.text}</span>
                </label>
              );
            })}
            {result ? (
              <div className="why">
                <p className={gotIt ? "verdict correct" : "verdict wrong"}>{gotIt ? "Correct." : "Not quite."}</p>
                <p>
                  <strong>Explanation:</strong> {question.why}{" "}
                  {question.review ? (
                    <Link href={`/learn/${slug}/#${question.review}`}>Read the section on this topic.</Link>
                  ) : null}
                </p>
              </div>
            ) : null}
          </fieldset>
        );
      })}
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      {result ? (
        <div className="quiz-result" role="status">
          <h2>{result.passed ? "You passed." : "Not passed yet."}</h2>
          <p>
            You answered {result.correct} of {questions.length} questions correctly.{" "}
            {result.passed
              ? "Well done."
              : `You need ${passAt} to pass. Read the explanations above, review the linked sections, and try again.`}
            {saved ? ` Your best score so far is ${saved.bestCorrect} of ${saved.total}.` : ""}
          </p>
          <div className="study-actions">
            {result.passed && nextSlug ? (
              <Link className="button" href={`/learn/${nextSlug}/`}>
                Go to the next chapter
              </Link>
            ) : null}
            <button type="button" className={result.passed && nextSlug ? "button secondary" : "button"} onClick={retry}>
              Try again
            </button>
            <Link className="button ghost" href={`/learn/${slug}/`}>
              Back to {title}
            </Link>
          </div>
        </div>
      ) : (
        <div className="study-actions">
          <button type="submit" className="button">
            Check my answers
          </button>
          <span className="status">
            {answered} of {questions.length} answered
          </span>
        </div>
      )}
    </form>
  );
}
