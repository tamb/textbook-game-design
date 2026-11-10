import type { Metadata } from "next";
import Link from "next/link";
import { chapterLabel, modules, parts } from "@/lib/course";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "How this game design textbook is organized, how each chapter works, and the classic games used as examples throughout.",
  alternates: {
    canonical: "/introduction/",
  },
  openGraph: {
    title: "Introduction · Practice Range",
    description:
      "How this game design textbook is organized, how each chapter works, and the classic games used as examples throughout.",
    url: "https://tamb.github.io/textbook-game-design/introduction/",
  },
};

export default function IntroductionPage() {
  return (
    <article className="lesson chapter">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Contents</Link>
        <span aria-hidden="true">›</span>
        <span>Introduction</span>
      </nav>
      <header className="chapter-head">
        <p className="kicker">Introduction · About 5 minutes</p>
        <h1>How to use this book</h1>
        <p className="lede">
          This short introduction explains what the book covers, how each chapter is organized, and the example game
          that appears throughout.
        </p>
      </header>

      <div className="prose">
        <h2 id="what-this-book-covers">What this book covers</h2>
        <p>
          Game design is the work of deciding how a game should play: what the player can do, how the game responds,
          what the goals are, and why someone would want to keep playing. This book introduces the most important ideas
          and vocabulary that game designers use to discuss these decisions.
        </p>
        <p>
          You do not need any experience with programming or game development. Every term is defined when it first
          appears, and each chapter builds on the chapters before it. If you read the chapters in order, you should
          never meet a word that has not already been explained.
        </p>

        <h2 id="how-the-book-is-organized">How the book is organized</h2>
        <p>The eight chapters are divided into three parts.</p>
        <ul>
          {parts.map((part) => (
            <li key={part.id}>
              <strong>
                Part {part.number}: {part.title}.
              </strong>{" "}
              {part.description} (
              {modules
                .filter((chapter) => chapter.part === part.id)
                .map((chapter) => chapterLabel(chapter))
                .join(", ")}
              .)
            </li>
          ))}
        </ul>

        <h2 id="how-each-chapter-is-organized">How each chapter is organized</h2>
        <p>Every chapter follows the same structure, so you always know where to find things.</p>
        <ol>
          <li>
            <strong>Learning objectives</strong> list what you should be able to do after reading the chapter.
          </li>
          <li>
            <strong>Numbered sections</strong> (for example, 2.3) explain the ideas one at a time. The “In this chapter”
            list at the side of each page lets you jump to any section.
          </li>
          <li>
            <strong>Key term boxes</strong> give a short definition whenever an important new word is introduced.
          </li>
          <li>
            <strong>Example boxes</strong> show how an idea applies to the example game described below.
          </li>
          <li>
            <strong>A chapter summary</strong> repeats the main points in a short list.
          </li>
          <li>
            <strong>Review questions</strong> check your understanding. Each answer explanation links back to the section
            that covers it.
          </li>
        </ol>

        <h2 id="a-few-basic-words">A few basic words</h2>
        <p>These everyday words appear throughout the book.</p>
        <aside className="key-term">
          <p className="callout-title">Key term</p>
          <p>
            <dfn>Input</dfn>: anything the player does to control the game, such as pressing a button or moving a stick.
          </p>
        </aside>
        <aside className="key-term">
          <p className="callout-title">Key term</p>
          <p>
            <dfn>Character</dfn>: the person, creature, or object the player controls in the game. It is sometimes
            called the avatar.
          </p>
        </aside>
        <aside className="key-term">
          <p className="callout-title">Key term</p>
          <p>
            <dfn>Mechanic</dfn>: a rule of the game, such as “pressing A makes the character jump” or “touching an enemy
            costs one point of health.”
          </p>
        </aside>
        <aside className="key-term">
          <p className="callout-title">Key term</p>
          <p>
            <dfn>Millisecond</dfn>: one thousandth of a second. Game designers often measure short moments, such as how
            quickly a game responds to a button, in milliseconds.
          </p>
        </aside>

        <h2 id="examples-from-classic-games">Examples from classic games</h2>
        <p>
          Design concepts are easiest to understand when connected to games you may already know or can easily picture.
          Rather than inventing an imaginary game with made-up rules, this book illustrates ideas using famous,
          widely played classics:
        </p>
        <ul>
          <li>
            <strong>Super Mario Bros. and Super Mario 64</strong> for jump feel, running momentum, tilemaps, and teaching
            without words.
          </li>
          <li>
            <strong>Street Fighter and Super Smash Bros.</strong> for attack timing, hitboxes, hurtboxes, cancels, and
            hit-stop.
          </li>
          <li>
            <strong>Celeste</strong> for coyote time, input buffering, and corner correction.
          </li>
          <li>
            <strong>Tetris and Pac-Man</strong> for core loops and enemy chase behavior.
          </li>
          <li>
            <strong>Dark Souls and Elden Ring</strong> for invulnerability frames (i-frames), animation commitment, and
            risk versus reward.
          </li>
          <li>
            <strong>Mario Kart</strong> for negative feedback loops and catch-up mechanics.
          </li>
          <li>
            <strong>Portal, Metroid, and Outer Wilds</strong> for affordances, signifiers, and knowledge gates.
          </li>
        </ul>
        <p>
          Whenever a specific mechanic or scenario is discussed, it is grounded in these real-world designs so you can
          see how professional designers solve practical problems.
        </p>

        <h2 id="using-this-site">Using this site</h2>
        <ul>
          <li>
            <Link href="/">Contents</Link> lists every chapter and section.
          </li>
          <li>
            <Link href="/tools/">Practice Tools</Link> has interactive calculators for the timing ideas in Chapters 2 and
            3. You can change the numbers and see the results immediately.
          </li>
          <li>
            <Link href="/glossary/">Glossary</Link> lists every key term in the book with a short definition.
          </li>
          <li>
            <Link href="/progress/">My Progress</Link> shows which chapters you have marked as read and your review
            scores. Your progress is saved only in this web browser. There is no account, and nothing is sent anywhere.
          </li>
        </ul>
      </div>

      <nav className="chapter-nav" aria-label="Chapters">
        <Link href="/">
          <small>Previous</small>
          Contents
        </Link>
        <Link href="/learn/feel/" className="next">
          <small>Next</small>
          Chapter 1: Game feel
        </Link>
      </nav>
    </article>
  );
}
