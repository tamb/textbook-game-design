import type { Metadata } from "next";
import { GlossaryFilter } from "@/components/GlossaryFilter";
import { chapterLabel, modules } from "@/lib/course";
import { termsForModule } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Definitions of every key term in the book, grouped by chapter.",
};

export default function GlossaryPage() {
  const groups = modules.map((chapter) => ({
    slug: chapter.slug,
    title: `${chapterLabel(chapter)}: ${chapter.title}`,
    terms: termsForModule(chapter.slug),
  }));

  return (
    <article className="lesson">
      <p className="kicker">Reference</p>
      <h1>Glossary</h1>
      <p className="lede">
        Every key term in the book, grouped by the chapter that introduces it. Each entry gives a one-sentence
        definition, a short explanation, and a link to the section where the term is taught. Use the search box to find
        a term quickly.
      </p>
      <GlossaryFilter groups={groups} />
    </article>
  );
}
