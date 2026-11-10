import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { StatusLine } from "@/components/StatusLine";
import { StudyBar } from "@/components/StudyBar";
import { chapterLabel, getModule, getPart, modules, neighbors, summarize } from "@/lib/course";
import { termsForModule } from "@/lib/glossary";

export function generateStaticParams() {
  return modules.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getModule(slug);
  if (!chapter) return { title: "Missing chapter" };
  return { title: `${chapterLabel(chapter)}: ${chapter.title}`, description: chapter.summary };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getModule(slug);
  if (!chapter) notFound();
  const summary = summarize(chapter);
  const part = getPart(chapter.part);
  const adjacent = neighbors(slug);
  const terms = termsForModule(slug);
  const number = Number(chapter.number);

  return (
    <article className="lesson chapter">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Contents</Link>
        <span aria-hidden="true">›</span>
        <span>
          Part {part.number}: {part.title}
        </span>
      </nav>
      <header className="chapter-head">
        <p className="kicker">
          {chapterLabel(chapter)} · About {chapter.minutes} minutes
        </p>
        <h1>{chapter.title}</h1>
        <p className="lede">{chapter.summary}</p>
        <StatusLine slug={chapter.slug} quizVersion={chapter.quizVersion} />
      </header>

      <div className="chapter-layout">
        <aside className="toc" aria-label="In this chapter">
          <p className="toc-title">In this chapter</p>
          <ol>
            {summary.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span className="section-num">{section.number}</span> {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#chapter-summary">Chapter summary</a>
            </li>
            <li>
              <a href="#key-terms">Key terms</a>
            </li>
            <li>
              <a href="#review">Review questions</a>
            </li>
          </ol>
        </aside>

        <div className="chapter-body">
          <section className="objectives" aria-labelledby="objectives-title">
            <p className="callout-title" id="objectives-title">
              Learning objectives
            </p>
            <p>After reading this chapter, you should be able to:</p>
            <ul>
              {chapter.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </section>

          <Blocks blocks={chapter.blocks} chapter={number} />

          <section className="recap" id="chapter-summary">
            <h2>Chapter summary</h2>
            <ul>
              {chapter.recap.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="term-list" id="key-terms">
            <h2>Key terms</h2>
            <p>Each term links to its full entry in the glossary.</p>
            <ul>
              {terms.map((term) => (
                <li key={term.id}>
                  <Link href={`/glossary/#${term.id}`}>{term.name}</Link>
                  <span>{term.short}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="review">
            <h2>Review questions</h2>
            <StudyBar
              slug={chapter.slug}
              quizVersion={chapter.quizVersion}
              passAt={summary.passAt}
              questionCount={summary.questionCount}
            />
          </section>

          <nav className="chapter-nav" aria-label="Chapters">
            {adjacent.prev ? (
              <Link href={`/learn/${adjacent.prev.slug}/`}>
                <small>Previous</small>
                {chapterLabel(adjacent.prev)}: {adjacent.prev.title}
              </Link>
            ) : (
              <Link href="/introduction/">
                <small>Previous</small>
                Introduction
              </Link>
            )}
            {adjacent.next ? (
              <Link href={`/learn/${adjacent.next.slug}/`} className="next">
                <small>Next</small>
                {chapterLabel(adjacent.next)}: {adjacent.next.title}
              </Link>
            ) : (
              <Link href="/" className="next">
                <small>Finished</small>
                Back to contents
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
