import type { Metadata } from "next";
import { TimelineExplorer } from "@/components/timeline-explorer";
import { legacyEntries } from "@/data/legacy-entries";

export const metadata: Metadata = {
  title: "Legacy timeline",
  description: "Explore fictional demonstration records showing how StoryBridge Legacy can preserve institutional memory.",
};

export default function LegacyPage() {
  return (
    <>
      <header className="page-hero legacy-hero">
        <div className="shell narrow-shell">
          <p className="eyebrow">Preserve our past</p>
          <h1>Everyday memories belong in the record.</h1>
          <p className="lede">
            Explore a filterable timeline that demonstrates how school communities could preserve academic life,
            sport, culture, service, innovation, alumni connections and the texture of school life.
          </p>
          <div className="demo-notice" role="note">
            <strong>Build Week demonstration:</strong>{" "}Every record on this page is fictional and illustrative.
            None describes a real CIC/St. Mary&apos;s College event, person or achievement.
          </div>
        </div>
      </header>
      <div className="shell timeline-shell">
        <TimelineExplorer entries={legacyEntries} />
      </div>
    </>
  );
}
