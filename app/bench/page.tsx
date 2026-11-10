"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BenchRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tools/");
  }, [router]);

  return (
    <article className="lesson">
      <p className="kicker">Redirecting</p>
      <h1>Practice Tools has moved</h1>
      <p className="lede">
        The calculators and interactive tools formerly called “Bench” are now on the Practice Tools page.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/tools/">
          Go to Practice Tools
        </Link>
      </div>
    </article>
  );
}
