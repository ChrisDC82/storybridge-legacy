"use client";

import { useEffect, useRef, useState } from "react";
import { legacyCategories } from "@/types/legacy";
import {
  emptyContributionForm,
  institutionRelationships,
  type ContributionErrors,
  type ContributionFormData,
  type GuidanceAnswerMap,
  type GuidanceResult,
  type LocalSubmission,
} from "@/types/contribution";
import {
  hasValidationErrors,
  validateContributionDetails,
  validateDraftReview,
  validateFinalSubmission,
} from "@/lib/contribution-validation";
import { buildSuggestedDraft, generateGuidance, guidanceFingerprint } from "@/lib/guided-story";
import { getFieldAccessibility } from "@/lib/field-accessibility";
import {
  createLocalSubmission,
  readLocalSubmissions,
  resetLocalSubmissions,
  saveLocalSubmission,
} from "@/lib/submission-storage";

const steps = ["Enter memory", "Guided questions", "Review draft", "Consent and submit"];

export function ContributionWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ContributionFormData>(emptyContributionForm);
  const [errors, setErrors] = useState<ContributionErrors>({});
  const [guidance, setGuidance] = useState<GuidanceResult | null>(null);
  const [guidanceSource, setGuidanceSource] = useState("");
  const [answers, setAnswers] = useState<GuidanceAnswerMap>({});
  const [finalDraft, setFinalDraft] = useState("");
  const [guidedMode, setGuidedMode] = useState<"Used" | "Skipped" | null>(null);
  const [draftReviewed, setDraftReviewed] = useState(false);
  const [submission, setSubmission] = useState<LocalSubmission | null>(null);
  const [storedCount, setStoredCount] = useState(0);
  const [status, setStatus] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setStoredCount(readLocalSubmissions(window.localStorage).length);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateField<K extends keyof ContributionFormData>(field: K, value: ContributionFormData[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function showErrors(nextErrors: ContributionErrors) {
    setErrors(nextErrors);
    if (hasValidationErrors(nextErrors)) {
      window.setTimeout(() => errorRef.current?.focus(), 0);
      return true;
    }
    return false;
  }

  function continueToGuidance() {
    if (showErrors(validateContributionDetails(form))) return;
    const fingerprint = guidanceFingerprint(form);
    if (!guidance || fingerprint !== guidanceSource) {
      setGuidance(generateGuidance(form));
      setGuidanceSource(fingerprint);
      setAnswers({});
    }
    setStatus("Your details are valid. Guided questions are ready.");
    setStep(2);
  }

  function refreshGuidance() {
    setGuidance(generateGuidance(form));
    setGuidanceSource(guidanceFingerprint(form));
    setAnswers({});
    setStatus("Guided questions refreshed from your current memory.");
  }

  function skipGuidance() {
    setFinalDraft(form.roughMemory.trim());
    setGuidedMode("Skipped");
    setDraftReviewed(false);
    setStatus("Guided Story Mode skipped. Review your original memory as the draft.");
    setStep(3);
  }

  function createDraft() {
    setFinalDraft(buildSuggestedDraft(form, answers));
    setGuidedMode("Used");
    setDraftReviewed(false);
    setStatus("A suggested draft was created only from the information you supplied.");
    setStep(3);
  }

  function continueToConsent() {
    if (showErrors(validateDraftReview(finalDraft, draftReviewed))) return;
    setStatus("Draft review confirmed. Please review the consent statement.");
    setStep(4);
  }

  function submitStory() {
    const nextErrors = validateFinalSubmission(form, finalDraft, draftReviewed);
    if (showErrors(nextErrors) || !guidedMode) return;
    const saved = saveLocalSubmission(
      window.localStorage,
      createLocalSubmission(form, finalDraft, guidedMode),
    );
    setSubmission(saved);
    setStoredCount(readLocalSubmissions(window.localStorage).length);
    setStatus(`Submission ${saved.id} saved locally with Pending review status.`);
  }

  function startAnother() {
    setForm(emptyContributionForm);
    setErrors({});
    setGuidance(null);
    setGuidanceSource("");
    setAnswers({});
    setFinalDraft("");
    setGuidedMode(null);
    setDraftReviewed(false);
    setSubmission(null);
    setStatus("The form is ready for another fictional demonstration story.");
    setStep(1);
  }

  function clearDemoData() {
    resetLocalSubmissions(window.localStorage);
    setStoredCount(0);
    if (submission) startAnother();
    setStatus("All locally stored demonstration submissions were removed from this browser.");
  }

  const errorEntries = Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1]));

  if (submission) {
    return (
      <section className="wizard-panel success-panel" aria-labelledby="submission-success-title">
        <p className="eyebrow">Local demonstration complete</p>
        <h2 id="submission-success-title">Your story is pending human review</h2>
        <p role="status" aria-live="polite">{status}</p>
        <dl className="submission-summary">
          <div><dt>Local ID</dt><dd>{submission.id}</dd></div>
          <div><dt>Status</dt><dd>{submission.status}</dd></div>
          <div><dt>Saved</dt><dd>{new Date(submission.createdAt).toLocaleString()}</dd></div>
          <div><dt>Title</dt><dd>{submission.story.title}</dd></div>
        </dl>
        <h3>Approved draft</h3>
        <p className="draft-preview">{submission.story.approvedDraft}</p>
        <p className="privacy-note">Your contact email is stored only in this browser for the demonstration and is not shown in this public-facing summary.</p>
        <div className="wizard-actions">
          <button className="button button-primary" type="button" onClick={startAnother}>Start another story</button>
          <button className="button button-secondary" type="button" onClick={clearDemoData}>Reset all local demo data</button>
        </div>
      </section>
    );
  }

  return (
    <section className="wizard-panel" aria-labelledby="wizard-title">
      <div className="wizard-heading">
        <div><p className="eyebrow">Four-step contribution</p><h2 id="wizard-title">Preserve a memory in your own words</h2></div>
        <p className="local-count">Local demo submissions: <strong>{storedCount}</strong></p>
      </div>

      <ol className="wizard-steps" aria-label="Contribution progress">
        {steps.map((label, index) => {
          const number = index + 1;
          return <li key={label} className={number === step ? "is-current" : number < step ? "is-complete" : ""} aria-current={number === step ? "step" : undefined}><span>{number}</span>{label}</li>;
        })}
      </ol>

      <p className="sr-status" role="status" aria-live="polite">{status}</p>
      {errorEntries.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={errorRef}>
          <h3>Please correct the following</h3>
          <ul>{errorEntries.map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul>
        </div>
      )}

      {step === 1 && (
        <div className="wizard-step-panel">
          <h3>1. Enter your memory</h3>
          <p>Required fields are marked. Use fictional information in this competition demonstration and do not include sensitive personal details.</p>
          <div className="form-grid">
            <Field id="fullName" label="Full name" error={errors.fullName}><input id="fullName" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} maxLength={100} required autoComplete="name" {...getFieldAccessibility("fullName", false, errors.fullName)} /></Field>
            <Field id="email" label="Contact email" error={errors.email} hint="Stored locally for this demonstration and never displayed publicly."><input id="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} maxLength={254} required autoComplete="email" {...getFieldAccessibility("email", true, errors.email)} /></Field>
            <Field id="relationship" label="Relationship to the institution" error={errors.relationship}><select id="relationship" value={form.relationship} onChange={(event) => updateField("relationship", event.target.value as ContributionFormData["relationship"])} required {...getFieldAccessibility("relationship", false, errors.relationship)}><option value="">Select one</option>{institutionRelationships.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field id="schoolPeriod" label="School period or connection" error={errors.schoolPeriod} hint="For example: Form 4, 2008–2010, or community partner."><input id="schoolPeriod" value={form.schoolPeriod} onChange={(event) => updateField("schoolPeriod", event.target.value)} maxLength={40} required {...getFieldAccessibility("schoolPeriod", true, errors.schoolPeriod)} /></Field>
            <Field id="storyTitle" label="Story title" error={errors.storyTitle}><input id="storyTitle" value={form.storyTitle} onChange={(event) => updateField("storyTitle", event.target.value)} maxLength={120} required {...getFieldAccessibility("storyTitle", false, errors.storyTitle)} /></Field>
            <Field id="eventYear" label="Event year" error={errors.eventYear} hint='Enter a four-digit year or “Not sure”.'><input id="eventYear" value={form.eventYear} onChange={(event) => updateField("eventYear", event.target.value)} maxLength={20} required inputMode="numeric" {...getFieldAccessibility("eventYear", true, errors.eventYear)} /></Field>
            <Field id="category" label="Category" error={errors.category}><select id="category" value={form.category} onChange={(event) => updateField("category", event.target.value as ContributionFormData["category"])} required {...getFieldAccessibility("category", false, errors.category)}><option value="">Select one</option>{legacyCategories.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field id="imageUrl" label="Optional image link" error={errors.imageUrl} hint="Use an http:// or https:// link only; no upload occurs."><input id="imageUrl" type="url" value={form.imageUrl} onChange={(event) => updateField("imageUrl", event.target.value)} maxLength={500} {...getFieldAccessibility("imageUrl", true, errors.imageUrl)} /></Field>
            <Field id="roughMemory" label="Rough memory" error={errors.roughMemory} hint="80–5,000 characters. Write what you remember; uncertainty is welcome." wide><textarea id="roughMemory" value={form.roughMemory} onChange={(event) => updateField("roughMemory", event.target.value)} minLength={80} maxLength={5000} required rows={9} {...getFieldAccessibility("roughMemory", true, errors.roughMemory)} /><span className="character-count">{form.roughMemory.length}/5,000</span></Field>
          </div>
          <div className="wizard-actions"><button className="button button-primary" type="button" onClick={continueToGuidance}>Continue to guided questions</button></div>
        </div>
      )}

      {step === 2 && guidance && (
        <div className="wizard-step-panel">
          <h3>2. Guided Story Mode</h3>
          <div className="guide-warning"><strong>This is an editing aid, not a fact checker.</strong><p>{guidance.warning} Questions and draft suggestions are generated deterministically in this browser; this MVP makes no OpenAI request.</p></div>
          <p>Answer any questions that help. Every response is optional, and you may skip this mode entirely.</p>
          <div className="question-list">
            {guidance.questions.map((question) => <div className="guided-question" key={question.id}><label htmlFor={`answer-${question.id}`}>{question.prompt}</label><p>{question.reason}</p><textarea id={`answer-${question.id}`} value={answers[question.id] ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} maxLength={800} rows={3} /></div>)}
          </div>
          <div className="wizard-actions"><button className="button button-secondary" type="button" onClick={() => setStep(1)}>Back</button><button className="button button-secondary" type="button" onClick={refreshGuidance}>Refresh guidance</button><button className="button button-secondary" type="button" onClick={skipGuidance}>Skip guidance and continue</button><button className="button button-primary" type="button" onClick={createDraft}>Create suggested draft</button></div>
        </div>
      )}

      {step === 3 && (
        <div className="wizard-step-panel">
          <h3>3. Review and edit your draft</h3>
          <p>Guided Story Mode was <strong>{guidedMode?.toLowerCase()}</strong>. The draft remains yours: edit it until every statement reflects what you intended to submit.</p>
          <Field id="finalDraft" label="Final story draft" error={errors.finalDraft} hint="80–7,000 characters." wide><textarea id="finalDraft" value={finalDraft} onChange={(event) => { setFinalDraft(event.target.value); setErrors((current) => ({ ...current, finalDraft: undefined })); }} minLength={80} maxLength={7000} required rows={16} {...getFieldAccessibility("finalDraft", true, errors.finalDraft)} /></Field>
          <div className={`check-field${errors.draftReviewed ? " has-error" : ""}`}><input id="draftReviewed" type="checkbox" checked={draftReviewed} onChange={(event) => { setDraftReviewed(event.target.checked); setErrors((current) => ({ ...current, draftReviewed: undefined })); }} {...getFieldAccessibility("draftReviewed", false, errors.draftReviewed)} /><div><label htmlFor="draftReviewed">I reviewed this draft and confirm that it represents my account.</label>{errors.draftReviewed && <p id="draftReviewed-error" className="field-error">{errors.draftReviewed}</p>}</div></div>
          <div className="wizard-actions"><button className="button button-secondary" type="button" onClick={() => setStep(2)}>Back to guidance</button><button className="button button-primary" type="button" onClick={continueToConsent}>Continue to consent</button></div>
        </div>
      )}

      {step === 4 && (
        <div className="wizard-step-panel">
          <h3>4. Consent and submit locally</h3>
          <div className="review-card"><p><strong>{form.storyTitle}</strong></p><p>{form.eventYear} · {form.category} · {guidedMode} guidance</p><p>Your contact email will be stored locally for moderation context but will not be displayed publicly.</p></div>
          <div className={`check-field${errors.consent ? " has-error" : ""}`}><input id="consent" type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} {...getFieldAccessibility("consent", false, errors.consent)} /><div><label htmlFor="consent">I consent to storing this fictional demonstration submission in this browser for human moderation review.</label>{errors.consent && <p id="consent-error" className="field-error">{errors.consent}</p>}</div></div>
          <p className="privacy-note">Submitting does not publish the story, send an email, upload a file or contact an institution. Status begins as “Pending review”.</p>
          <div className="wizard-actions"><button className="button button-secondary" type="button" onClick={() => setStep(3)}>Back to draft</button><button className="button button-primary" type="button" onClick={submitStory}>Submit story locally</button></div>
        </div>
      )}

      {storedCount > 0 && <button className="text-button danger-text" type="button" onClick={clearDemoData}>Reset all locally stored demo submissions</button>}
    </section>
  );
}

function Field({ id, label, hint, error, wide, children }: { id: string; label: string; hint?: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <div className={`field contribution-field${wide ? " field-wide" : ""}${error ? " has-error" : ""}`}><label htmlFor={id}>{label}{id !== "imageUrl" && <span aria-hidden="true"> *</span>}</label>{hint && <p id={`${id}-hint`} className="field-hint">{hint}</p>}{children}{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}
