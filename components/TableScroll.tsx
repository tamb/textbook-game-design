"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Edge = "start" | "middle" | "end";

export function TableScroll({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [edge, setEdge] = useState<Edge>("start");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let alive = true;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!alive) return;
        const canScroll = el.scrollWidth > el.clientWidth + 1;
        let nextEdge: Edge = "start";
        if (canScroll && el.scrollLeft > 1) {
          nextEdge = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 ? "end" : "middle";
        }
        setOverflow((current) => (current === canScroll ? current : canScroll));
        setEdge((current) => (current === nextEdge ? current : nextEdge));
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    const table = el.querySelector("table");
    if (table) observer.observe(table);
    document.fonts?.ready.then(() => {
      if (alive) update();
    });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="table-scroll"
      data-overflow={overflow ? "true" : "false"}
      data-scroll-edge={edge}
      tabIndex={overflow ? 0 : undefined}
      role={overflow ? "region" : undefined}
      aria-label={overflow ? `${label}. This table scrolls horizontally.` : undefined}
    >
      {children}
    </div>
  );
}
