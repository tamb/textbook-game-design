import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import { ProgressProvider } from "@/components/ProgressProvider";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { summaries } from "@/lib/course";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const viewport: Viewport = {
  themeColor: "#12140e",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: { default: "Practice Range: An Introduction to Game Design", template: "%s · Practice Range" },
  description:
    "A beginner's textbook on game design: game feel, attack timing, forgiveness, collision, game structure, and teaching the player.",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Game Design",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
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
