"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import {
  STORAGE_EVENT,
  STORAGE_KEY,
  clearSlugs,
  emptyLogbook,
  markLesson,
  parseLogbook,
  recordQuiz,
  type ClearMode,
} from "@/lib/progress";
import type { Logbook, Summary } from "@/lib/types";

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(STORAGE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(STORAGE_EVENT, handler);
  };
}

function snapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function serverSnapshot() {
  return "";
}

function mountedSubscribe() {
  return () => {};
}

export function useMounted() {
  return useSyncExternalStore(mountedSubscribe, () => true, () => false);
}

type Api = {
  catalog: Summary[];
  book: Logbook;
  mounted: boolean;
  study: (slug: string) => void;
  saveQuiz: (slug: string, version: number, correct: number, total: number) => void;
  clear: (slugs: string[], mode: ClearMode) => void;
};

const ProgressContext = createContext<Api | null>(null);

export function ProgressProvider({
  catalog,
  children,
}: {
  catalog: Summary[];
  children: React.ReactNode;
}) {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const mounted = useMounted();
  const book = useMemo(() => (mounted ? parseLogbook(raw) : emptyLogbook()), [mounted, raw]);

  const commit = useCallback((next: Logbook) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  const api = useMemo<Api>(
    () => ({
      catalog,
      book,
      mounted,
      study: (slug) => commit(markLesson(parseLogbook(localStorage.getItem(STORAGE_KEY)), slug)),
      saveQuiz: (slug, version, correct, total) =>
        commit(recordQuiz(parseLogbook(localStorage.getItem(STORAGE_KEY)), slug, version, correct, total)),
      clear: (slugs, mode) =>
        commit(clearSlugs(parseLogbook(localStorage.getItem(STORAGE_KEY)), slugs, mode)),
    }),
    [book, catalog, commit, mounted],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress must be used inside ProgressProvider");
  return value;
}
