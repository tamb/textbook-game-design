import type { Metadata } from "next";
import { ProgressPage } from "@/components/ProgressPage";

export const metadata: Metadata = {
  title: "My Progress",
  description: "Chapters you have marked as read and your review question scores.",
};

export default function MyProgressPage() {
  return (
    <article className="lesson">
      <p className="kicker">Saved in this browser</p>
      <h1>My Progress</h1>
      <p className="lede">
        This page shows which chapters you have marked as read and your best score on each set of review questions. Your
        progress is stored only in this web browser. If you use a different browser or device, it will not appear there.
      </p>
      <ProgressPage />
    </article>
  );
}
