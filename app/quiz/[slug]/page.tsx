import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { chapterLabel, getModule, modules, summarize } from "@/lib/course";

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
  if (!chapter) return { title: "Missing review questions" };
  return {
    title: `Review questions: ${chapterLabel(chapter)}`,
    description: `Review questions for ${chapterLabel(chapter)}: ${chapter.title}.`,
  };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getModule(slug);
  if (!chapter) notFound();
  const summary = summarize(chapter);

  return (
    <article className="lesson">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Contents</Link>
        <span aria-hidden="true">›</span>
        <Link href={`/learn/${chapter.slug}/`}>
          {chapterLabel(chapter)}: {chapter.title}
        </Link>
        <span aria-hidden="true">›</span>
        <span>Review questions</span>
      </nav>
      <p className="kicker">Review questions · {chapterLabel(chapter)}</p>
      <h1>{chapter.title}</h1>
      <p className="lede">
        Answer all {summary.questionCount} questions, then select “Check my answers.” You need {summary.passAt} correct
        answers to pass. Each answer comes with an explanation and a link to the section of the chapter that covers it.
      </p>
      <QuizRunner
        slug={chapter.slug}
        title={`${chapterLabel(chapter)}: ${chapter.title}`}
        version={chapter.quizVersion}
        passAt={summary.passAt}
        questions={chapter.quiz}
        nextSlug={nextSlug(slug)}
      />
    </article>
  );
}

function nextSlug(slug: string): string | null {
  const index = modules.findIndex((module) => module.slug === slug);
  return index >= 0 && index < modules.length - 1 ? modules[index + 1].slug : null;
}
