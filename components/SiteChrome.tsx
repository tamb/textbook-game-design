"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sources } from "@/lib/sources";
import { useProgress } from "./ProgressProvider";

const links = [
  { href: "/", label: "Contents" },
  { href: "/introduction/", label: "Introduction" },
  { href: "/tools/", label: "Practice Tools" },
  { href: "/glossary/", label: "Glossary" },
  { href: "/progress/", label: "My Progress" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { catalog, book, mounted } = useProgress();
  const studied = catalog.filter((item) => book.lessons[item.slug]).length;

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>
          <strong>Practice Range</strong>
          <small>An introduction to game design</small>
        </span>
      </Link>
      <nav aria-label="Primary">
        {links.map((link) => {
          const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
          const active =
            link.href === "/"
              ? path === "/" || path.startsWith("/learn/") || path.startsWith("/quiz/")
              : path.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/progress/" className="header-score">
        {mounted ? `${studied} of ${catalog.length} chapters read` : "My Progress"}
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        Examples in this book reference classic games such as <strong>Super Mario Bros.</strong>,{" "}
        <strong>Street Fighter</strong>, <strong>Celeste</strong>, and <strong>Tetris</strong>. Your progress is saved
        only in this browser.
      </p>
      <p>Further reading:</p>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
