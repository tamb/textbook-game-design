import type { MetadataRoute } from "next";
import { modules } from "@/lib/course";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tamb.github.io/textbook-game-design";
  const now = new Date();

  const coreRoutes = ["", "introduction", "tools", "glossary", "progress"].map((route) => ({
    url: route ? `${baseUrl}/${route}/` : `${baseUrl}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "introduction" ? 0.9 : 0.8,
  }));

  const chapterRoutes = modules.map((m) => ({
    url: `${baseUrl}/learn/${m.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const quizRoutes = modules.map((m) => ({
    url: `${baseUrl}/quiz/${m.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...chapterRoutes, ...quizRoutes];
}
