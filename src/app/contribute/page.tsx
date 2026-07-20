import type { Metadata } from "next";
import { ContributionWizard } from "@/components/contribution-wizard";

export const metadata: Metadata = {
  title: "Contribute a Story",
  description: "Use the local demonstration workflow to preserve, review and submit a fictional legacy story for human moderation.",
};

export default function ContributePage() {
  return (
    <div>
      <header className="contribute-hero">
        <div className="shell contribute-heading">
          <p className="eyebrow">Share a memory</p>
          <h1>Contribute a story</h1>
          <p className="lead">Capture a memory in your own voice, use optional guided questions, review every word and save a local demonstration submission for human moderation.</p>
        </div>
      </header>
      <div className="shell contribute-layout">
        <aside className="contribution-notice" aria-labelledby="demo-notice-title">
          <h2 id="demo-notice-title">Competition demonstration notice</h2>
          <ul>
            <li>Use fictional demonstration data only. Do not enter sensitive or confidential information.</li>
            <li>Submissions remain in this browser’s local storage and are not published or sent to a server.</li>
            <li>Contact email supports local moderation context and is never displayed publicly.</li>
            <li>Guided Story Mode helps structure submitted details; it does not verify facts or replace human moderation.</li>
            <li>CIC/St. Mary’s College is only the proposed pilot. No institutional endorsement is claimed.</li>
          </ul>
        </aside>
        <ContributionWizard />
      </div>
    </div>
  );
}
