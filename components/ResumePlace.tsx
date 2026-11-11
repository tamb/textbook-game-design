"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  PLACE_KEY,
  SECTION_SELECTOR,
  canonicalPlace,
  isPlaceSection,
  parsePlace,
  serializePlace,
  type Place,
} from "@/lib/place";

declare global {
  interface Window {
    /** Set by the launch script when this document is about to be replaced. */
    __resumeHold?: boolean;
  }
}

const READING_LINE = 112;

function hashSection(): string | null {
  const raw = location.hash.startsWith("#") ? location.hash.slice(1) : "";
  if (!raw) return null;
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    return null;
  }
  if (!isPlaceSection(id)) return null;
  const element = document.getElementById(id);
  if (!element || !element.matches(SECTION_SELECTOR)) return null;
  return id;
}

/** The section whose heading has reached the top of the reading area. */
export function activeSection(): string | null {
  let active: string | null = null;
  document.querySelectorAll(SECTION_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement) || !isPlaceSection(node.id)) return;
    if (node.getBoundingClientRect().top <= READING_LINE) active = node.id;
  });
  return active;
}

function remember(place: Place) {
  const raw = serializePlace(place);
  if (localStorage.getItem(PLACE_KEY) === raw) return;
  localStorage.setItem(PLACE_KEY, raw);
}

export function ResumePlace() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.__resumeHold) return;

    let stopped = false;
    let timer = 0;
    // Wheel, keys, and dragging count as reading on. A hash jump does not, until it arrives.
    let userMoved = false;
    let stickToHash = Boolean(hashSection());
    let lastHashTop: number | null = null;

    const write = (section: string | null, allowEmpty: boolean) => {
      if (stopped || window.__resumeHold) return;
      try {
        if (new URLSearchParams(location.search).get("source") === "pwa") return;
        const place = canonicalPlace(pathname || "/", section);
        if (!place) return;
        if (!place.section && !allowEmpty) {
          const existing = parsePlace(localStorage.getItem(PLACE_KEY));
          if (existing && existing.path === place.path && existing.section) return;
        }
        remember(place);
      } catch {
        /* Storage can be unavailable in private mode. */
      }
    };

    const publish = () => {
      const hash = hashSection();
      const visible = activeSection();
      if (stickToHash && hash) {
        const top = document.getElementById(hash)?.getBoundingClientRect().top;
        if (typeof top === "number" && top > READING_LINE) {
          const scrollingAway = userMoved && lastHashTop !== null && top > lastHashTop + 24;
          lastHashTop = top;
          if (!scrollingAway) {
            write(hash, true);
            return;
          }
        }
        stickToHash = false;
      }
      const section = !userMoved && hash ? hash : visible;
      write(section, userMoved || Boolean(section));
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(publish, 150);
    };

    const markMoved = () => {
      userMoved = true;
      onScroll();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      let id = href.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        return;
      }
      if (!isPlaceSection(id)) return;
      const element = document.getElementById(id);
      if (!element || !element.matches(SECTION_SELECTOR)) return;
      stickToHash = true;
      lastHashTop = null;
      write(id, true);
    };

    const movedUnlessLink = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a[href]")) return;
      markMoved();
    };

    const onKey = (event: KeyboardEvent) => {
      if ([" ", "PageDown", "PageUp", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) markMoved();
    };

    const onHide = () => {
      if (document.visibilityState === "hidden") publish();
    };

    // The launch script turns off smooth scrolling so a restored section does not animate down from the top.
    document.documentElement.style.scrollBehavior = "";
    publish();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("pagehide", publish);
    window.addEventListener("wheel", markMoved, { passive: true });
    window.addEventListener("touchstart", movedUnlessLink, { passive: true });
    window.addEventListener("pointerdown", movedUnlessLink);
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onHide);
    document.addEventListener("click", onClick);

    return () => {
      stopped = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
      window.removeEventListener("pagehide", publish);
      window.removeEventListener("wheel", markMoved);
      window.removeEventListener("touchstart", movedUnlessLink);
      window.removeEventListener("pointerdown", movedUnlessLink);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onHide);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
