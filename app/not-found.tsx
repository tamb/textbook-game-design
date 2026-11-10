import Link from "next/link";

export default function NotFound() {
  return (
    <article className="lesson">
      <p className="kicker">Page not found</p>
      <h1>This page does not exist.</h1>
      <p className="lede">
        The page may have moved. The calculators are now on the Practice Tools page, and your saved progress is on the My
        Progress page.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/">
          Go to the table of contents
        </Link>
        <Link className="button secondary" href="/tools/">
          Practice Tools
        </Link>
        <Link className="button secondary" href="/progress/">
          My Progress
        </Link>
      </div>
    </article>
  );
}
