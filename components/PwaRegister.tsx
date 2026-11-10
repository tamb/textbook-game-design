"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      const swUrl = `${basePath}/sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .catch((err) => console.warn("PWA service worker registration failed:", err));
    }
  }, []);

  return null;
}
