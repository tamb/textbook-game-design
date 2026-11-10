"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Term } from "@/lib/types";

export type GlossaryGroup = {
  slug: string;
  title: string;
  terms: Term[];
};

export function GlossaryFilter({ groups }: { groups: GlossaryGroup[] }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const totalTerms = useMemo(() => groups.reduce((acc, g) => acc + g.terms.length, 0), [groups]);

  const filtered = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          terms: group.terms.filter((term) => {
            if (!needle) return true;
            return `${term.name} ${term.short} ${term.detail}`.toLowerCase().includes(needle);
          }),
        }))
        .filter((group) => group.terms.length > 0),
    [groups, needle],
  );

  const matchCount = useMemo(() => filtered.reduce((acc, g) => acc + g.terms.length, 0), [filtered]);

  return (
    <div>
      <form role="search" className="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="glossary-query">Search the glossary</label>
        <div className="search-row">
          <input
            id="glossary-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="For example: hitbox, coyote time, core loop"
            autoComplete="off"
          />
          {query ? (
            <button type="button" className="button ghost" onClick={() => setQuery("")}>
              Clear
            </button>
          ) : null}
        </div>
      </form>
      {query ? (
        <p className="status">
          {matchCount === 0
            ? "No terms match that search."
            : `Showing ${matchCount} of ${totalTerms} terms matching “${query}”.`}
        </p>
      ) : (
        <p className="status">{totalTerms} terms across 8 chapters.</p>
      )}
      {filtered.map((group) => (
        <section key={group.slug} className="glossary-group">
          <h2>
            <Link href={`/learn/${group.slug}/`}>{group.title}</Link>
          </h2>
          <dl>
            {group.terms.map((term) => (
              <div key={term.id} id={term.id}>
                <dt>
                  <a href={`#${term.id}`}>{term.name}</a>
                </dt>
                <dd>
                  <p>{term.short}</p>
                  <p>{term.detail}</p>
                  <p>
                    <Link href={term.anchor ? `/learn/${term.module}/#${term.anchor}` : `/learn/${term.module}/`}>
                      Read about this in the chapter
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
