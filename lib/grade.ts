/** Pass at 80% of the questions, rounded up. Six questions means five correct. */
export function passMark(total: number): number {
  if (total <= 0) return 1;
  return Math.ceil(total * 0.8);
}

export function grade(chosen: readonly string[], answers: readonly string[]): {
  correct: number;
  total: number;
  passed: boolean;
} {
  const total = answers.length;
  let correct = 0;
  for (let i = 0; i < total; i++) {
    if (chosen[i] === answers[i]) correct++;
  }
  return { correct, total, passed: correct >= passMark(total) };
}
