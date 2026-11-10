import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tamb.github.io/textbook-game-design";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/bench/", "/logbook/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
