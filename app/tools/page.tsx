import type { Metadata } from "next";
import { PracticeTools } from "@/components/PracticeTools";

export const metadata: Metadata = {
  title: "Practice Tools",
  description: "Interactive calculators for frame advantage, forgiveness windows, and game feel.",
};

export default function ToolsPage() {
  return (
    <article className="lesson">
      <p className="kicker">Interactive</p>
      <h1>Practice Tools</h1>
      <p className="lede">
        These calculators let you experiment with the numbers from the chapters. Change any value and the results update
        immediately. Nothing you do here affects your saved progress.
      </p>
      <ul className="tool-index">
        <li>
          <a href="#frame-advantage">Tool 1: Frame advantage calculator</a> (Chapter 2)
        </li>
        <li>
          <a href="#forgiveness">Tool 2: Forgiveness window converter</a> (Chapter 3)
        </li>
        <li>
          <a href="#game-feel">Tool 3: Game feel checklist</a> (Chapter 1)
        </li>
      </ul>
      <PracticeTools />
    </article>
  );
}
