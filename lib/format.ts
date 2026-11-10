export function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "an unknown time";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function signed(value: number): string {
  if (value > 0) return `+${value}`;
  return `${value}`;
}

export function chapterLabel(module: { number: string }): string {
  return `Chapter ${Number(module.number)}`;
}
