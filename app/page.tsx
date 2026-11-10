import Link from "next/link";
import { ProgressMeter, StatusLine } from "@/components/StatusLine";
import { chapterLabel, parts, summaries } from "@/lib/course";

export default function HomePage() {
  const chapters = summaries();
  return (
    <div className="home">
      <section className="hero">
        <p className="kicker">A beginner's textbook · 8 chapters</p>
        <h1>An Introduction to Game Design</h1>
        <p className="lede">
          This book explains the ideas and vocabulary that game designers use to make games feel good, play fairly, and
          stay worth returning to. No programming or design experience is needed. Each chapter builds on the ones before
          it and ends with a short set of review questions.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/introduction/">
            Start with the introduction
          </Link>
          <Link className="button secondary" href="/learn/feel/">
            Skip to Chapter 1
          </Link>
        </div>
      </section>

      <ProgressMeter />

      <section className="contents" aria-labelledby="contents-title">
        <h2 id="contents-title">Table of contents</h2>
        <ol className="contents-list">
          <li className="contents-intro">
            <Link href="/introduction/">Introduction: How to use this book</Link>
            <p>What this book covers, a few basic terms, and the example game used throughout.</p>
          </li>
        </ol>
        {parts.map((part) => (
          <section key={part.id} className="part">
            <p className="kicker">Part {part.number}</p>
            <h3>{part.title}</h3>
            <p className="part-description">{part.description}</p>
            <ol className="contents-list">
              {chapters
                .filter((chapter) => chapter.part === part.id)
                .map((chapter) => (
                  <li key={chapter.slug}>
                    <h4>
                      <Link href={`/learn/${chapter.slug}/`}>
                        {chapterLabel(chapter)}: {chapter.title}
                      </Link>
                    </h4>
                    <p>{chapter.summary}</p>
                    <ol className="section-list">
                      {chapter.sections.map((section) => (
                        <li key={section.id}>
                          <Link href={`/learn/${chapter.slug}/#${section.id}`}>
                            <span className="section-num">{section.number}</span> {section.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <p className="inline-links">
                      <span className="status">About {chapter.minutes} minutes</span>
                      <Link href={`/quiz/${chapter.slug}/`}>Review questions</Link>
                    </p>
                    <StatusLine slug={chapter.slug} quizVersion={chapter.quizVersion} />
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </section>
    </div>
  );
}
