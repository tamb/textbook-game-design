import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: { default: "Practice Range: An Introduction to Game Design", template: "%s · Practice Range" },
  description:
    "A beginner's textbook on game design: game feel, attack timing, forgiveness, collision, game structure, and teaching the player.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
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
