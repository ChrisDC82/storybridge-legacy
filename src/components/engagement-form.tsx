"use client";

import { useEffect, useRef, useState } from "react";
import { alumniSupportTypes, type AlumniSupportType } from "@/types/alumni";
import { emptyEngagementForm, engagementRelationships, involvementOptions, type EngagementErrors, type EngagementFormData, type LocalEngagementInterest } from "@/types/engagement";
import { hasEngagementErrors, validateEngagementForm } from "@/lib/engagement-validation";
import { createLocalInterest, readLocalInterests, resetLocalInterests, saveLocalInterest, toPublicInterestSummary } from "@/lib/engagement-storage";

export function EngagementForm() {
  const [form, setForm] = useState<EngagementFormData>(emptyEngagementForm);
  const [errors, setErrors] = useState<EngagementErrors>({});
  const [submission, setSubmission] = useState<LocalEngagementInterest | null>(null);
  const [storedCount, setStoredCount] = useState(0);
  const [status, setStatus] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setStoredCount(readLocalInterests(window.localStorage).length));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateField<K extends keyof EngagementFormData>(field: K, value: EngagementFormData[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function toggleSupport(item: AlumniSupportType) {
    const supportOpportunities = form.supportOpportunities.includes(item) ? form.supportOpportunities.filter((value) => value !== item) : [...form.supportOpportunities, item];
    updateField("supportOpportunities", supportOpportunities);
  }

  function submitInterest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEngagementForm(form);
    setErrors(nextErrors);
    if (hasEngagementErrors(nextErrors)) {
      setStatus("The expression of interest needs correction before it can be saved locally.");
      window.setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }
    const saved = saveLocalInterest(window.localStorage, createLocalInterest(form));
    setSubmission(saved);
    setStoredCount(readLocalInterests(window.localStorage).length);
    setStatus(`Expression ${saved.id} was saved locally with Interest received status.`);
  }

  function startAnother() {
    setForm(emptyEngagementForm); setErrors({}); setSubmission(null);
    setStatus("The form is ready for another fictional demonstration expression of interest.");
  }

  function clearLocalInterests() {
    resetLocalInterests(window.localStorage); setStoredCount(0);
    if (submission) startAnother();
    setStatus("All locally stored demonstration interest records were removed from this browser.");
  }

  const errorEntries = Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1]));
  if (submission) {
    const summary = toPublicInterestSummary(submission);
    return (
      <section className="engagement-form-panel success-panel" aria-labelledby="interest-success-heading">
        <p className="eyebrow">Local demonstration complete</p><h2 id="interest-success-heading">Interest received</h2>
        <p role="status" aria-live="polite">{status}</p>
        <dl className="submission-summary"><div><dt>Local ID</dt><dd>{summary.id}</dd></div><div><dt>Status</dt><dd>{summary.status}</dd></div><div><dt>Saved</dt><dd>{new Date(summary.createdAt).toLocaleString()}</dd></div><div><dt>Name</dt><dd>{summary.fullName}</dd></div><div><dt>Location</dt><dd>{summary.countryOrRegion}</dd></div><div><dt>Field</dt><dd>{summary.professionOrIndustry}</dd></div></dl>
        <h3>Support selected</h3><ul>{summary.supportOpportunities.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="privacy-note">The contact email is stored privately in this browser and is deliberately absent from this confirmation. This record was not sent, published or matched to anyone.</p>
        <div className="wizard-actions"><button className="button button-primary" type="button" onClick={startAnother}>Submit another interest</button><button className="button button-secondary" type="button" onClick={clearLocalInterests}>Reset all local interest records</button></div>
      </section>
    );
  }

  return (
    <section className="engagement-form-panel" aria-labelledby="engagement-form-heading">
      <div className="wizard-heading"><div><p className="eyebrow">Expression of interest</p><h2 id="engagement-form-heading">How might you help?</h2></div><p className="local-count">Local interest records: <strong>{storedCount}</strong></p></div>
      <div className="local-only-notice" role="note"><strong>Local demonstration only.</strong> This form saves to this browser. It does not send email, contact an institution, promise an opportunity, process money or create a binding commitment. Use fictional information and do not enter sensitive data.</div>
      <p className="sr-status" role="status" aria-live="polite">{status}</p>
      {errorEntries.length > 0 && <div className="error-summary" role="alert" tabIndex={-1} ref={errorRef}><h3>Please correct the following</h3><ul>{errorEntries.map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul></div>}
      <form onSubmit={submitInterest} noValidate>
        <div className="form-grid">
          <TextField id="fullName" label="Full name" value={form.fullName} onChange={(value) => updateField("fullName", value)} error={errors.fullName} maximum={100} autoComplete="name" />
          <TextField id="email" label="Contact email" type="email" value={form.email} onChange={(value) => updateField("email", value)} error={errors.email} maximum={254} hint="Stored privately in this browser and never shown in the public-safe confirmation." autoComplete="email" />
          <SelectField id="relationship" label="Relationship to institution" value={form.relationship} onChange={(value) => updateField("relationship", value as EngagementFormData["relationship"])} error={errors.relationship} options={engagementRelationships} placeholder="Select one" />
          <TextField id="schoolPeriod" label="Graduation year or school period" value={form.schoolPeriod} onChange={(value) => updateField("schoolPeriod", value)} error={errors.schoolPeriod} maximum={40} hint="Required for former students; optional for other relationships." required={false} />
          <TextField id="countryOrRegion" label="Current country or region" value={form.countryOrRegion} onChange={(value) => updateField("countryOrRegion", value)} error={errors.countryOrRegion} maximum={100} />
          <TextField id="professionOrIndustry" label="Profession or industry" value={form.professionOrIndustry} onChange={(value) => updateField("professionOrIndustry", value)} error={errors.professionOrIndustry} maximum={120} />
          <TextAreaField id="expertise" label="Areas of expertise" value={form.expertise} onChange={(value) => updateField("expertise", value)} error={errors.expertise} maximum={500} hint="List skills or experience you would be comfortable sharing." />
          <SelectField id="involvementLevel" label="Preferred level of involvement" value={form.involvementLevel} onChange={(value) => updateField("involvementLevel", value as EngagementFormData["involvementLevel"])} error={errors.involvementLevel} options={involvementOptions} placeholder="Select one" />
          <TextField id="professionalUrl" label="Professional profile URL (optional)" type="url" value={form.professionalUrl} onChange={(value) => updateField("professionalUrl", value)} error={errors.professionalUrl} maximum={500} hint="Use an http:// or https:// URL." required={false} />
          <TextField id="languages" label="Languages (optional)" value={form.languages} onChange={(value) => updateField("languages", value)} error={errors.languages} maximum={200} required={false} />
          <TextAreaField id="availabilityNotes" label="Availability notes (optional)" value={form.availabilityNotes} onChange={(value) => updateField("availabilityNotes", value)} error={errors.availabilityNotes} maximum={500} required={false} />
          <TextAreaField id="assistanceDescription" label="How might you assist?" value={form.assistanceDescription} onChange={(value) => updateField("assistanceDescription", value)} error={errors.assistanceDescription} maximum={2000} minimum={80} hint="Use at least 80 characters. Do not promise funding, placement or investment." wide />
        </div>
        <fieldset id="supportOpportunities" className={`support-fieldset${errors.supportOpportunities ? " has-error" : ""}`} aria-describedby={errors.supportOpportunities ? "supportOpportunities-error" : "supportOpportunities-hint"}>
          <legend>Support opportunities</legend><p id="supportOpportunities-hint">Select one or more. These are expressions of interest, not guaranteed offers.</p>
          <div className="support-checkbox-grid">{alumniSupportTypes.map((item) => <label key={item}><input type="checkbox" checked={form.supportOpportunities.includes(item)} onChange={() => toggleSupport(item)} /> <span>{item}</span></label>)}</div>
          {errors.supportOpportunities && <p id="supportOpportunities-error" className="field-error">{errors.supportOpportunities}</p>}
        </fieldset>
        <div className={`check-field${errors.consent ? " has-error" : ""}`}><input id="consent" type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} aria-describedby={errors.consent ? "consent-error" : undefined} /><div><label htmlFor="consent">I consent to saving this fictional demonstration expression of interest in this browser for local review.</label>{errors.consent && <p id="consent-error" className="field-error">{errors.consent}</p>}</div></div>
        <div className="wizard-actions"><button className="button button-primary" type="submit">Save expression of interest locally</button></div>
      </form>
      {storedCount > 0 && <button className="text-button danger-text" type="button" onClick={clearLocalInterests}>Reset all locally stored interest records</button>}
    </section>
  );
}

function TextField({ id, label, value, onChange, error, hint, maximum, minimum, type = "text", autoComplete, required = true }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string; hint?: string; maximum: number; minimum?: number; type?: string; autoComplete?: string; required?: boolean }) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return <div className={`field contribution-field${error ? " has-error" : ""}`}><label htmlFor={id}>{label}{required ? " *" : ""}</label>{hint && <p id={`${id}-hint`} className="field-hint">{hint}</p>}<input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} maxLength={maximum} minLength={minimum} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy} autoComplete={autoComplete} />{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}

function TextAreaField({ id, label, value, onChange, error, hint, maximum, minimum, wide, required = true }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string; hint?: string; maximum: number; minimum?: number; wide?: boolean; required?: boolean }) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return <div className={`field contribution-field${wide ? " field-wide" : ""}${error ? " has-error" : ""}`}><label htmlFor={id}>{label}{required ? " *" : ""}</label>{hint && <p id={`${id}-hint`} className="field-hint">{hint}</p>}<textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} maxLength={maximum} minLength={minimum} rows={wide ? 7 : 4} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy} />{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}

function SelectField({ id, label, value, onChange, error, options, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string; options: readonly string[]; placeholder: string }) {
  return <div className={`field contribution-field${error ? " has-error" : ""}`}><label htmlFor={id}>{label} *</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}><option value="">{placeholder}</option>{options.map((item) => <option key={item}>{item}</option>)}</select>{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}
