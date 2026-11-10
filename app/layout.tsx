import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import { ProgressProvider } from "@/components/ProgressProvider";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { modules, summarize, summaries } from "@/lib/course";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteUrl = "https://tamb.github.io/textbook-game-design";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const viewport: Viewport = {
  themeColor: "#12140e",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Practice Range: An Introduction to Game Design",
    template: "%s · Practice Range",
  },
  description:
    "A free, beginner-friendly online textbook and PWA on game design fundamentals: game feel, attack timing, input forgiveness, collision, structure, and player teaching.",
  keywords: [
    "game design",
    "game feel",
    "game development",
    "gamedev",
    "frame data",
    "hitboxes",
    "coyote time",
    "input buffering",
    "MDA framework",
    "game design textbook",
    "interactive textbook",
    "PWA",
    "game physics",
    "game mechanics",
  ],
  authors: [{ name: "Tom Saporito", url: "https://github.com/tamb" }],
  creator: "Tom Saporito",
  publisher: "Practice Range",
  category: "education",
  applicationName: "Practice Range",
  alternates: {
    canonical: "./",
  },
  manifest: `${basePath}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "32x32" },
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Practice Range: An Introduction to Game Design",
    description:
      "A free, beginner-friendly interactive textbook on game design fundamentals: game feel, attack timing, forgiveness, collision math, and structure.",
    url: siteUrl,
    siteName: "Practice Range",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tamb.github.io/textbook-game-design/og-image.png",
        width: 1200,
        height: 630,
        alt: "Practice Range: An Introduction to Game Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice Range: An Introduction to Game Design",
    description:
      "A free, beginner-friendly interactive textbook on game design fundamentals.",
    images: ["https://tamb.github.io/textbook-game-design/og-image.png"],
    creator: "@tamb",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Game Design",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": `${siteUrl}/`,
        "name": "Practice Range: An Introduction to Game Design",
        "description":
          "A free, beginner-friendly interactive textbook and PWA on game design fundamentals.",
        "inLanguage": "en",
        "publisher": {
          "@type": "Person",
          "name": "Tom Saporito",
          "url": "https://github.com/tamb",
        },
      },
      {
        "@type": "Book",
        "@id": `${siteUrl}/#book`,
        "name": "Practice Range: An Introduction to Game Design",
        "headline": "An Introduction to Game Design",
        "description":
          "A free, beginner-friendly interactive online textbook and Progressive Web App on game design fundamentals: game feel, attack timing, forgiveness, collision math, and game structure.",
        "url": `${siteUrl}/`,
        "inLanguage": "en",
        "isAccessibleForFree": true,
        "genre": ["Game Design", "Game Development", "Computer Science Education"],
        "educationalLevel": "Beginner",
        "learningResourceType": "Textbook",
        "author": {
          "@type": "Person",
          "name": "Tom Saporito",
          "url": "https://github.com/tamb",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Practice Range",
          "url": `${siteUrl}/`,
        },
        "hasPart": modules.map((m) => ({
          "@type": "Chapter",
          "position": Number(m.number),
          "name": `Chapter ${Number(m.number)}: ${m.title}`,
          "description": m.summary,
          "url": `${siteUrl}/learn/${m.slug}/`,
        })),
      },
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PwaRegister />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <ProgressProvider catalog={summaries()}>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  );
}
