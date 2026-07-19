import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { moderationStatuses, emptyContributionForm } from "../src/types/contribution.ts";
import { createLocalSubmission, readLocalSubmissions, resetLocalSubmissions, saveLocalSubmission, SUBMISSION_STORAGE_KEY } from "../src/lib/submission-storage.ts";
import { getModerationSummary, resetModerationStates, updateModerationStatus, validateModerationNote } from "../src/lib/moderation.ts";

class MemoryStorage {
  data = new Map();
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, value); }
  removeItem(key) { this.data.delete(key); }
}

const validForm = {
  ...emptyContributionForm,
  fullName: "Fictional Contributor",
  email: "contributor@example.test",
  relationship: "Former student or alumnus",
  schoolPeriod: "2008",
  storyTitle: "A fictional moderation journey",
  eventYear: "Not sure",
  category: "School Life",
  roughMemory: "This fictional original memory is long enough to preserve the contributor’s account before any guided drafting or human moderation takes place.",
  consent: true,
};

function seededStorage() {
  const storage = new MemoryStorage();
  saveLocalSubmission(storage, createLocalSubmission(validForm, `${validForm.roughMemory}\n\nThis is the final contributor-approved draft.`, "Used", { id: "SBL-MOD-DEMO", createdAt: "2026-07-18T18:00:00.000Z" }));
  return storage;
}

test("approved moderation statuses are bounded and summary counts match local records", () => {
  assert.deepEqual(moderationStatuses, ["Pending review", "Approved", "More information requested", "Rejected"]);
  assert.deepEqual(getModerationSummary([]), { total: 0, pending: 0, approved: 0, moreInformation: 0, rejected: 0 });
  const storage = seededStorage();
  const submissions = readLocalSubmissions(storage);
  assert.deepEqual(getModerationSummary(submissions), { total: 1, pending: 1, approved: 0, moreInformation: 0, rejected: 0 });
});

test("approval updates status, timestamp and history while safely rejecting duplicates", () => {
  const storage = seededStorage();
  const result = updateModerationStatus(storage, "SBL-MOD-DEMO", "Approved", "Reviewed for the local preview.", "2026-07-18T19:00:00.000Z");
  assert.equal(result.changed, true);
  assert.equal(result.updated.status, "Approved");
  assert.equal(result.updated.updatedAt, "2026-07-18T19:00:00.000Z");
  assert.equal(result.updated.moderationHistory.at(-1).status, "Approved");
  const duplicate = updateModerationStatus(storage, "SBL-MOD-DEMO", "Approved", "Reviewed for the local preview.", "2026-07-18T20:00:00.000Z");
  assert.equal(duplicate.changed, false);
  assert.match(duplicate.error, /already recorded/i);
  assert.equal(readLocalSubmissions(storage)[0].moderationHistory.length, 2);
});

test("information requests and rejection require useful notes and preserve the record", () => {
  const storage = seededStorage();
  assert.match(validateModerationNote("More information requested", "short"), /20 characters/i);
  assert.match(validateModerationNote("Rejected", "short"), /20 characters/i);
  const request = updateModerationStatus(storage, "SBL-MOD-DEMO", "More information requested", "Please clarify the approximate year and who was present.", "2026-07-18T19:00:00.000Z");
  assert.equal(request.changed, true);
  assert.match(readLocalSubmissions(storage)[0].moderationNote, /approximate year/);
  const reject = updateModerationStatus(storage, "SBL-MOD-DEMO", "Rejected", "The demonstration account lacks permission for the named details.", "2026-07-18T20:00:00.000Z");
  assert.equal(reject.changed, true);
  assert.equal(readLocalSubmissions(storage).length, 1);
  assert.equal(readLocalSubmissions(storage)[0].status, "Rejected");
});

test("return to pending and moderation reset are reversible without deleting stories", () => {
  const storage = seededStorage();
  updateModerationStatus(storage, "SBL-MOD-DEMO", "Rejected", "The fictional record needs a clear source and permission note.", "2026-07-18T19:00:00.000Z");
  const pending = updateModerationStatus(storage, "SBL-MOD-DEMO", "Pending review", "", "2026-07-18T20:00:00.000Z");
  assert.equal(pending.updated.status, "Pending review");
  updateModerationStatus(storage, "SBL-MOD-DEMO", "Approved", "", "2026-07-18T21:00:00.000Z");
  const reset = resetModerationStates(storage, "2026-07-18T22:00:00.000Z");
  assert.equal(reset.length, 1);
  assert.equal(reset[0].status, "Pending review");
  assert.match(reset[0].moderationHistory.at(-1).note, /reset/i);
});

test("story reset is independent from engagement-interest storage", () => {
  const storage = seededStorage();
  storage.setItem("storybridge-legacy-demo-interests", "[{}]");
  resetLocalSubmissions(storage);
  assert.equal(storage.getItem(SUBMISSION_STORAGE_KEY), null);
  assert.equal(storage.getItem("storybridge-legacy-demo-interests"), "[{}]");
});

test("admin UI exposes empty, review, privacy, history, preview and deliberate reset states", async () => {
  const page = await readFile("src/app/admin/page.tsx", "utf8");
  const dashboard = await readFile("src/components/admin-dashboard.tsx", "utf8");
  for (const phrase of ["Demonstration Admin Dashboard", "no production authentication", "proposed pilot", "this browser"]) assert.match(page, new RegExp(phrase, "i"));
  for (const phrase of ["moderation queue is empty", "Original rough memory", "Final contributor-approved draft", "Moderation history", "Approved archive preview", "No email was sent", "Engagement-interest records were not changed"]) assert.match(dashboard, new RegExp(phrase, "i"));
  assert.doesNotMatch(dashboard, /contributor\.email/);
  assert.doesNotMatch(dashboard, /console\./);
});

test("cross-route records preserve original, final and guidance mode without rendering email", () => {
  const storage = seededStorage();
  const stored = readLocalSubmissions(storage)[0];
  assert.equal(stored.story.originalRoughMemory, validForm.roughMemory);
  assert.match(stored.story.approvedDraft, /final contributor-approved draft/);
  assert.equal(stored.guidedStoryMode, "Used");
  assert.equal(stored.contributor.email, validForm.email);
});
