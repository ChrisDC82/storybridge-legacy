"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getModerationSummary, resetModerationStates, updateModerationStatus } from "@/lib/moderation";
import { readLocalSubmissions, resetLocalSubmissions } from "@/lib/submission-storage";
import type { LocalSubmission, ModerationStatus } from "@/types/contribution";

const actionLabels: Array<{ status: ModerationStatus; label: string }> = [
  { status: "Approved", label: "Approve" },
  { status: "More information requested", label: "Request more information" },
  { status: "Rejected", label: "Reject" },
  { status: "Pending review", label: "Return to pending review" },
];

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<LocalSubmission[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteErrors, setNoteErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmModerationReset, setConfirmModerationReset] = useState(false);
  const [confirmStoryRemoval, setConfirmStoryRemoval] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSubmissions(readLocalSubmissions(window.localStorage));
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const summary = getModerationSummary(submissions);
  const approved = submissions.filter((submission) => submission.status === "Approved");

  function moderate(submission: LocalSubmission, nextStatus: ModerationStatus) {
    const result = updateModerationStatus(window.localStorage, submission.id, nextStatus, notes[submission.id] ?? "");
    if (!result.changed) {
      setNoteErrors((current) => ({ ...current, [submission.id]: result.error }));
      setStatusMessage(`No change was saved for ${submission.story.title}.`);
      return;
    }
    setSubmissions(result.submissions);
    setNotes((current) => ({ ...current, [submission.id]: "" }));
    setNoteErrors((current) => ({ ...current, [submission.id]: "" }));
    setStatusMessage(`${submission.story.title} updated to ${nextStatus}. No email was sent.`);
  }

  function resetModeration() {
    if (!confirmModerationReset) {
      setStatusMessage("Confirm the moderation-state reset before continuing.");
      return;
    }
    setSubmissions(resetModerationStates(window.localStorage));
    setConfirmModerationReset(false);
    setStatusMessage("All story moderation states returned to Pending review. Story records were preserved.");
  }

  function removeStorySubmissions() {
    if (!confirmStoryRemoval) {
      setStatusMessage("Confirm local story removal before continuing.");
      return;
    }
    resetLocalSubmissions(window.localStorage);
    setSubmissions([]);
    setConfirmStoryRemoval(false);
    setStatusMessage("All local story submissions were removed. Engagement-interest records were not changed.");
  }

  return (
    <>
      <section className="admin-summary" aria-labelledby="admin-summary-heading">
        <div className="filter-heading-row"><div><p className="eyebrow">Browser-local record</p><h2 id="admin-summary-heading">Moderation summary</h2></div><Link className="button secondary" href="/contribute">Create demonstration submission</Link></div>
        <div className="admin-metrics" aria-label="Local submission counts">
          <Metric label="Total submissions" value={summary.total} />
          <Metric label="Pending review" value={summary.pending} />
          <Metric label="Approved" value={summary.approved} />
          <Metric label="More information requested" value={summary.moreInformation} />
          <Metric label="Rejected" value={summary.rejected} />
        </div>
        <p className="admin-live-status" role="status" aria-live="polite">{statusMessage}</p>
      </section>

      {!loaded ? <p className="empty-state" role="status">Loading local demonstration records…</p> : submissions.length === 0 ? (
        <section className="empty-state" aria-labelledby="admin-empty-heading"><p className="eyebrow">No local submissions</p><h2 id="admin-empty-heading">The moderation queue is empty.</h2><p>Create a fictional contribution in this browser, then return here to review it.</p><Link className="button primary" href="/contribute">Create a demonstration story</Link></section>
      ) : (
        <section className="admin-queue" aria-labelledby="queue-heading">
          <div className="section-heading-row"><div><p className="eyebrow">Human review</p><h2 id="queue-heading">Story submission queue</h2></div><p>Email addresses are deliberately hidden. Guided Story Mode structured contributor-supplied details; it did not verify history.</p></div>
          <div className="admin-submission-list">{submissions.map((submission) => <SubmissionReview key={submission.id} submission={submission} note={notes[submission.id] ?? ""} noteError={noteErrors[submission.id]} onNoteChange={(value) => { setNotes((current) => ({ ...current, [submission.id]: value })); setNoteErrors((current) => ({ ...current, [submission.id]: "" })); }} onModerate={(status) => moderate(submission, status)} />)}</div>
        </section>
      )}

      {approved.length > 0 && <section className="approved-preview" aria-labelledby="approved-preview-heading"><p className="eyebrow">Local preview only</p><h2 id="approved-preview-heading">Approved archive preview</h2><p>These records remain in this browser and have not been published to the public Legacy Timeline or any institution.</p><div className="approved-preview-grid">{approved.map((submission) => <article key={submission.id}><p className="demo-label">Locally approved demonstration</p><h3>{submission.story.title}</h3><p>{submission.story.approvedDraft}</p><p><strong>{submission.story.category}</strong> · {submission.story.approximateEventYear}</p></article>)}</div></section>}

      <section className="admin-reset-panel" aria-labelledby="admin-reset-heading"><p className="eyebrow">Deliberate reset controls</p><h2 id="admin-reset-heading">Reset this browser demonstration</h2><div className="admin-reset-grid"><div><h3>Reset moderation states</h3><p>Return every story to Pending review while preserving submissions and history.</p><label className="reset-confirm"><input type="checkbox" checked={confirmModerationReset} onChange={(event) => setConfirmModerationReset(event.target.checked)} /> I understand that all moderation statuses will change.</label><button className="button secondary" type="button" onClick={resetModeration}>Reset moderation states</button></div><div><h3>Remove local story submissions</h3><p>Delete only locally stored story submissions. Alumni engagement-interest records remain untouched.</p><label className="reset-confirm"><input type="checkbox" checked={confirmStoryRemoval} onChange={(event) => setConfirmStoryRemoval(event.target.checked)} /> I understand that local story records will be removed.</label><button className="button danger-button" type="button" onClick={removeStorySubmissions}>Remove local story submissions</button></div></div></section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) { return <div><strong>{value}</strong><span>{label}</span></div>; }

function SubmissionReview({ submission, note, noteError, onNoteChange, onModerate }: { submission: LocalSubmission; note: string; noteError?: string; onNoteChange: (value: string) => void; onModerate: (status: ModerationStatus) => void }) {
  const noteId = `moderation-note-${submission.id}`;
  return (
    <article className="admin-submission-card">
      <div className="submission-card-heading"><div><p className="demo-label">{submission.id}</p><h3>{submission.story.title}</h3><p>{submission.contributor.fullName} · {submission.contributor.relationship}</p></div><p className="status-badge"><span>Status</span><strong>{submission.status}</strong></p></div>
      <dl className="admin-record-facts"><div><dt>Event year</dt><dd>{submission.story.approximateEventYear}</dd></div><div><dt>Category</dt><dd>{submission.story.category}</dd></div><div><dt>Submitted</dt><dd>{new Date(submission.createdAt).toLocaleString()}</dd></div><div><dt>Guidance</dt><dd>{submission.guidedStoryMode}</dd></div><div><dt>Updated</dt><dd>{new Date(submission.updatedAt).toLocaleString()}</dd></div></dl>
      <details className="review-details"><summary>Open human review</summary><div className="review-comparison"><section><h4>1. Original rough memory</h4><p>{submission.story.originalRoughMemory}</p></section><section><h4>2. Guidance record</h4><p>Guided Story Mode: <strong>{submission.guidedStoryMode}</strong>. This MVP does not store detailed question responses.</p></section><section><h4>3. Final contributor-approved draft</h4><p>{submission.story.approvedDraft}</p></section><section><h4>4. Accuracy reminder</h4><p>Approximate date: {submission.story.approximateEventYear}. Treat memory as an account, not verified fact. Check permissions, uncertainty and supporting sources before any future publication.</p></section></div>
        <section className="moderation-history" aria-labelledby={`history-${submission.id}`}><h4 id={`history-${submission.id}`}>Moderation history</h4><ol>{submission.moderationHistory.map((item, index) => <li key={`${item.updatedAt}-${index}`}><strong>{item.status}</strong> · {new Date(item.updatedAt).toLocaleString()}{item.note ? <p>{item.note}</p> : null}</li>)}</ol>{submission.moderationNote ? <p><strong>Current note:</strong> {submission.moderationNote}</p> : null}</section>
        <div className="moderation-controls"><label htmlFor={noteId}>Moderation note <span>(required for information requests and rejection; optional for approval)</span></label><textarea id={noteId} value={note} onChange={(event) => onNoteChange(event.target.value)} maxLength={500} rows={4} aria-invalid={Boolean(noteError)} aria-describedby={noteError ? `${noteId}-error` : `${noteId}-hint`} /><p id={`${noteId}-hint`} className="field-hint">20–500 characters when requesting information or rejecting. No email will be sent.</p>{noteError ? <p id={`${noteId}-error`} className="field-error">{noteError}</p> : null}<div className="moderation-actions">{actionLabels.map((action) => <button className={`button ${action.status === "Approved" ? "button-primary" : "button-secondary"}`} type="button" key={action.status} onClick={() => onModerate(action.status)} disabled={submission.status === action.status}>{action.label}</button>)}</div></div>
      </details>
    </article>
  );
}
