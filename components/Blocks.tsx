import Link from "next/link";
import { headingId } from "@/lib/slug";
import type { Block } from "@/lib/types";

function rich(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link key={index} href={link[2]}>
          {link[1]}
        </Link>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function Blocks({ blocks, chapter }: { blocks: Block[]; chapter: number }) {
  let section = 0;
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        if (block.type === "p") return <p key={index}>{rich(block.text)}</p>;
        if (block.type === "h") {
          section += 1;
          return (
            <h2 key={index} id={headingId(block.text)}>
              <span className="section-num">
                {chapter}.{section}
              </span>{" "}
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const Tag = block.type;
          return (
            <Tag key={index}>
              {block.items.map((item) => (
                <li key={item}>{rich(item)}</li>
              ))}
            </Tag>
          );
        }
        if (block.type === "term") {
          return (
            <aside key={index} className="key-term">
              <p className="callout-title">Key term</p>
              <p>
                <dfn>{block.term}</dfn>: {rich(block.text)}
              </p>
            </aside>
          );
        }
        if (block.type === "callout") {
          return (
            <aside key={index} className={`callout ${block.tone}`}>
              <p className="callout-title">{block.title}</p>
              <p>{rich(block.text)}</p>
            </aside>
          );
        }
        if (block.type === "example") {
          return (
            <aside key={index} className="example">
              <p className="callout-title">{block.title}</p>
              <p>{rich(block.text)}</p>
            </aside>
          );
        }
        if (block.type === "frames") {
          return (
            <figure key={index} className="frame-strip">
              <figcaption>{block.caption}</figcaption>
              <div
                className="frame-bar"
                style={{ gridTemplateColumns: `${Math.max(block.startup, 1)}fr ${Math.max(block.active, 1)}fr ${Math.max(block.recovery, 1)}fr` }}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </div>
              <ul className="frame-key">
                <li>Startup: {block.startup} frames</li>
                <li>Active: {block.active} {block.active === 1 ? "frame" : "frames"}</li>
                <li>Recovery: {block.recovery} frames</li>
              </ul>
              {block.note ? <p>{block.note}</p> : null}
            </figure>
          );
        }
        return (
          <figure key={index} className="table-wrap">
            {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th key={`${header}-${headerIndex}`} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${cell}-${cellIndex}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
        );
      })}
    </div>
  );
}
