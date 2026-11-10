"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogbookRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/progress/");
  }, [router]);

  return (
    <article className="lesson">
      <p className="kicker">Redirecting</p>
      <h1>My Progress has moved</h1>
      <p className="lede">
        Your reading marks and review scores formerly called “Logbook” are now on the My Progress page.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/progress/">
          Go to My Progress
        </Link>
      </div>
    </article>
  );
}
