import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { emptyContributionForm } from "../src/types/contribution.ts";
import { validateContributionDetails, validateFinalSubmission } from "../src/lib/contribution-validation.ts";
import { buildSuggestedDraft, generateGuidance } from "../src/lib/guided-story.ts";
import { getFieldAccessibility } from "../src/lib/field-accessibility.ts";
import { createFallbackGuidance, getStoryGuideStatus } from "../src/lib/story-guide-route.ts";
import { createLocalSubmission, readLocalSubmissions, resetLocalSubmissions, saveLocalSubmission, toPublicSubmissionSummary } from "../src/lib/submission-storage.ts";

const validForm = {
  ...emptyContributionForm,
  fullName: "Demo Contributor",
  email: "demo@example.test",
  relationship: "Former student or alumnus",
  schoolPeriod: "2008–2010",
  storyTitle: "The fictional workshop memory",
  eventYear: "Not sure",
  category: "Innovation",
  roughMemory: "I remember a fictional workshop where our group tested an idea together. The details are approximate, but the shared learning stayed with me.",
  imageUrl: "https://example.test/fictional-image",
  consent: true,
};

class MemoryStorage {
  data = new Map();
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, value); }
  removeItem(key) { this.data.delete(key); }
}

test("contribution validation covers required fields, formats, lengths and consent", () => {
  const emptyErrors = validateContributionDetails(emptyContributionForm, 2026);
  assert.ok(emptyErrors.fullName && emptyErrors.email && emptyErrors.eventYear && emptyErrors.roughMemory);
  assert.equal(Object.keys(validateContributionDetails(validForm, 2026)).length, 0);
  assert.ok(validateContributionDetails({ ...validForm, email: "invalid" }, 2026).email);
  assert.ok(validateContributionDetails({ ...validForm, eventYear: "1700" }, 2026).eventYear);
  assert.ok(validateContributionDetails({ ...validForm, imageUrl: "ftp://example.test/file" }, 2026).imageUrl);
  assert.ok(validateContributionDetails({ ...validForm, roughMemory: "too short" }, 2026).roughMemory);
  assert.ok(validateFinalSubmission({ ...validForm, consent: false }, validForm.roughMemory, true, 2026).consent);
});

test("guided questions respond to missing context, uncertainty and category", () => {
  const result = generateGuidance(validForm);
  const ids = result.questions.map((question) => question.id);
  assert.ok(ids.includes("year"));
  assert.ok(ids.includes("expand"));
  assert.ok(ids.includes("certainty"));
  assert.ok(ids.includes("category"));
  assert.match(result.questions.find((question) => question.id === "category").prompt, /problem|tested|learned/i);
});

test("suggested draft preserves submitted wording and adds only supplied context", () => {
  const draft = buildSuggestedDraft(validForm, { place: "A fictional classroom", change: "We tried again." });
  assert.ok(draft.startsWith(validForm.roughMemory));
  assert.match(draft, /A fictional classroom/);
  assert.match(draft, /We tried again/);
  assert.doesNotMatch(draft, /Principal|championship|Port of Spain/);
  assert.match(draft, /not been historically verified/i);
});

test("local persistence retains original and approved drafts while public summary excludes email", () => {
  const storage = new MemoryStorage();
  const submission = createLocalSubmission(validForm, `${validForm.roughMemory} Edited.`, "Used", { id: "SBL-DEMO-1", createdAt: "2026-07-18T12:00:00.000Z" });
  saveLocalSubmission(storage, submission);
  const stored = readLocalSubmissions(storage)[0];
  assert.equal(stored.status, "Pending review");
  assert.equal(stored.story.originalRoughMemory, validForm.roughMemory);
  assert.match(stored.story.approvedDraft, /Edited/);
  assert.equal(stored.guidedStoryMode, "Used");
  assert.equal("email" in toPublicSubmissionSummary(stored), false);
  resetLocalSubmissions(storage);
  assert.deepEqual(readLocalSubmissions(storage), []);
});

test("fallback guide remains usable without an API key", () => {
  const status = getStoryGuideStatus({});
  assert.equal(status.mode, "deterministic-fallback");
  assert.equal(status.openAIConfigured, false);
  assert.ok(createFallbackGuidance(validForm).questions.length > 0);
});

test("contribution interface exposes the four-step, editable and skippable workflow", async () => {
  const source = await readFile("src/components/contribution-wizard.tsx", "utf8");
  const pageSource = await readFile("src/app/contribute/page.tsx", "utf8");
  for (const phrase of ["Enter memory", "Guided questions", "Review draft", "Consent and submit", "Skip guidance and continue", "Create suggested draft", "Back to guidance", "Submit story locally", "Pending review"]) assert.match(source, new RegExp(phrase));
  assert.match(source, /setFinalDraft\(event\.target\.value\)/);
  assert.match(source, /window\.localStorage/);
  assert.doesNotMatch(source, /console\./);
  assert.doesNotMatch(pageSource, /<main[\s>]/, "the shared layout owns the single main landmark");
});

test("contribution errors expose stable accessible descriptions without marking valid fields invalid", async () => {
  assert.deepEqual(getFieldAccessibility("email", true, "Enter a valid email."), {
    "aria-invalid": true,
    "aria-describedby": "email-hint email-error",
  });
  assert.deepEqual(getFieldAccessibility("email", true), {
    "aria-invalid": undefined,
    "aria-describedby": "email-hint",
  });
  assert.deepEqual(getFieldAccessibility("storyTitle", false), {
    "aria-invalid": undefined,
    "aria-describedby": undefined,
  });

  const source = await readFile("src/components/contribution-wizard.tsx", "utf8");
  for (const id of ["fullName", "email", "relationship", "schoolPeriod", "storyTitle", "eventYear", "category", "imageUrl", "roughMemory", "finalDraft", "draftReviewed", "consent"]) {
    assert.match(source, new RegExp(`getFieldAccessibility\\("${id}"`), `${id} must receive accessible error props`);
  }
  assert.match(source, /id="draftReviewed-error"/);
  assert.match(source, /id="consent-error"/);
  assert.match(source, /id=\{`\$\{id\}-error`\}/, "standard field errors must use matching stable IDs");
});

test("contribution metadata relies on the root title template exactly once", async () => {
  const pageSource = await readFile("src/app/contribute/page.tsx", "utf8");
  assert.match(pageSource, /title: "Contribute a Story"/);
  assert.doesNotMatch(pageSource, /Contribute a Story \| StoryBridge Legacy/);
});
