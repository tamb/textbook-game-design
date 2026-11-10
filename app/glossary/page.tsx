import type { Metadata } from "next";
import { GlossaryFilter } from "@/components/GlossaryFilter";
import { chapterLabel, modules } from "@/lib/course";
import { termsForModule } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary of Game Design Terms",
  description:
    "Comprehensive glossary of essential game design terms: game feel, frame data, hitboxes, hurtboxes, pushboxes, coyote time, input buffering, AABB, MDA, and more.",
  alternates: {
    canonical: "/glossary/",
  },
  openGraph: {
    title: "Glossary of Game Design Terms · Practice Range",
    description:
      "Definitions and explanations of over 70 fundamental game design terms, grouped by chapter with search.",
    url: "https://tamb.github.io/textbook-game-design/glossary/",
  },
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
