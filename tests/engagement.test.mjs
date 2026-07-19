import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { emptyEngagementForm } from "../src/types/engagement.ts";
import { validateEngagementForm } from "../src/lib/engagement-validation.ts";
import { createLocalInterest, readLocalInterests, resetLocalInterests, saveLocalInterest, toPublicInterestSummary } from "../src/lib/engagement-storage.ts";

const validForm = {
  ...emptyEngagementForm,
  fullName: "Fictional Supporter",
  email: "supporter@example.test",
  relationship: "Alumnus or former student",
  schoolPeriod: "2008",
  countryOrRegion: "Trinidad and Tobago",
  professionOrIndustry: "Education technology",
  expertise: "Accessible learning design and careful programme planning",
  supportOpportunities: ["Student mentorship", "Career talk"],
  assistanceDescription: "I could offer a fictional career discussion and review a student project brief while following school safeguarding and moderation requirements.",
  involvementLevel: "Occasional support",
  professionalUrl: "https://example.test/fictional-profile",
  languages: "English",
  availabilityNotes: "Weekday afternoons in this fictional demonstration.",
  consent: true,
};

class MemoryStorage {
  data = new Map();
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, value); }
  removeItem(key) { this.data.delete(key); }
}

test("engagement validation covers required fields and all requested safeguards", () => {
  const emptyErrors = validateEngagementForm(emptyEngagementForm, 2026);
  for (const field of ["fullName", "email", "relationship", "countryOrRegion", "professionOrIndustry", "expertise", "supportOpportunities", "assistanceDescription", "involvementLevel", "consent"]) assert.ok(emptyErrors[field]);
  assert.equal(Object.keys(validateEngagementForm(validForm, 2026)).length, 0);
  assert.ok(validateEngagementForm({ ...validForm, email: "invalid" }, 2026).email);
  assert.ok(validateEngagementForm({ ...validForm, schoolPeriod: "1940" }, 2026).schoolPeriod);
  assert.ok(validateEngagementForm({ ...validForm, professionalUrl: "ftp://example.test/profile" }, 2026).professionalUrl);
  assert.ok(validateEngagementForm({ ...validForm, supportOpportunities: [] }, 2026).supportOpportunities);
  assert.ok(validateEngagementForm({ ...validForm, assistanceDescription: "Too short" }, 2026).assistanceDescription);
  assert.ok(validateEngagementForm({ ...validForm, consent: false }, 2026).consent);
});

test("valid interest persists under a separate key and public confirmation omits email", () => {
  const storage = new MemoryStorage();
  const interest = createLocalInterest(validForm, { id: "SBL-EOI-DEMO", createdAt: "2026-07-18T20:00:00.000Z" });
  saveLocalInterest(storage, interest);
  const stored = readLocalInterests(storage)[0];
  assert.equal(stored.status, "Interest received");
  assert.deepEqual(stored.offer.supportOpportunities, validForm.supportOpportunities);
  assert.equal(stored.contact.email, validForm.email);
  const publicSummary = toPublicInterestSummary(stored);
  assert.equal("email" in publicSummary, false);
  assert.equal(publicSummary.status, "Interest received");
  resetLocalInterests(storage);
  assert.deepEqual(readLocalInterests(storage), []);
});

test("engagement page and form state the local, privacy, fundraising and investment boundaries", async () => {
  const page = await readFile("src/app/engage/page.tsx", "utf8");
  const form = await readFile("src/components/engagement-form.tsx", "utf8");
  for (const phrase of ["Share knowledge", "Create access", "Strengthen institutions", "Support future enterprise", "does not sell investments", "promise returns", "collect donations"]) assert.match(page, new RegExp(phrase, "i"));
  for (const phrase of ["Local demonstration only", "does not send email", "Interest received", "Reset all locally stored interest records", "deliberately absent from this confirmation"]) assert.match(form, new RegExp(phrase, "i"));
  assert.doesNotMatch(form, /console\./);
  assert.doesNotMatch(page, /guaranteed return|confirmed investor|donation total/i);
});

test("global pilot notice remains in the shared layout", async () => {
  const layout = await readFile("src/app/layout.tsx", "utf8");
  assert.match(layout, /proposed pilot only/); assert.match(layout, /fictional\s+demonstration data/); assert.match(layout, /no institutional endorsement|claims no institutional endorsement/);
});
