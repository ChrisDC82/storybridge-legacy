import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { alumniProfiles } from "../src/data/alumni-profiles.ts";
import { alumniAvailabilityOptions, alumniSupportTypes } from "../src/types/alumni.ts";
import { filterAlumniProfiles, getAlumniFilterOptions, getGraduationPeriod } from "../src/lib/alumni-directory.ts";

const allFilters = { query: "", industry: "All", country: "All", graduationPeriod: "All", expertise: "All", supportType: "All", availability: "All" };

test("fictional alumni data is complete, unique and uses approved values", () => {
  assert.equal(alumniProfiles.length, 12);
  assert.equal(new Set(alumniProfiles.map((profile) => profile.id)).size, alumniProfiles.length);
  assert.equal(new Set(alumniProfiles.map((profile) => profile.slug)).size, alumniProfiles.length);
  for (const profile of alumniProfiles) {
    for (const field of [profile.id, profile.slug, profile.displayName, profile.profession, profile.industry, profile.countryOrRegion, profile.shortBiography, profile.legacyStatement]) assert.ok(field);
    assert.equal(profile.isDemonstration, true);
    assert.ok(profile.shortBiography.toLowerCase().includes("fictional"));
    assert.ok(profile.expertiseAreas.length && profile.mentorshipInterests.length && profile.supportOffered.length);
    assert.ok(profile.supportOffered.every((item) => alumniSupportTypes.includes(item)));
    assert.ok(alumniAvailabilityOptions.includes(profile.availability));
    assert.doesNotMatch(`${profile.shortBiography} ${profile.legacyStatement}`, /award-winning|employed by|confirmed investor|guaranteed/i);
  }
});

test("directory search covers identity, profession, location, biography, expertise, support and year", () => {
  assert.deepEqual(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "Leila Baptiste" }).map((item) => item.slug), ["leila-baptiste"]);
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "engineer" }).some((item) => item.slug === "kieron-mendez"));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "Canada" }).some((item) => item.slug === "maya-laurent"));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "digital inclusion" }).some((item) => item.slug === "elise-fontaine"));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "fundraising support" }).some((item) => item.slug === "inez-charles"));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "2015" }).some((item) => item.slug === "zara-duke"));
});

test("every alumni filter and combined filtering work deterministically", () => {
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, industry: "Technology" }).every((item) => item.industry === "Technology"));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, country: "Trinidad and Tobago" }).every((item) => item.countryOrRegion === "Trinidad and Tobago"));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, graduationPeriod: "2000s" }).every((item) => getGraduationPeriod(item.graduationYear) === "2000s"));
  assert.deepEqual(filterAlumniProfiles(alumniProfiles, { ...allFilters, expertise: "Web accessibility" }).map((item) => item.slug), ["jelani-quashie"]);
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, supportType: "Portfolio review" }).every((item) => item.supportOffered.includes("Portfolio review")));
  assert.ok(filterAlumniProfiles(alumniProfiles, { ...allFilters, availability: "Available now" }).every((item) => item.availability === "Available now"));
  assert.deepEqual(filterAlumniProfiles(alumniProfiles, { ...allFilters, country: "Trinidad and Tobago", supportType: "Future responsible investment conversation" }).map((item) => item.slug), ["andre-solomon"]);
});

test("reset-equivalent filters restore all results and impossible filters return none", () => {
  assert.equal(filterAlumniProfiles(alumniProfiles, allFilters).length, alumniProfiles.length);
  assert.deepEqual(filterAlumniProfiles(alumniProfiles, { ...allFilters, query: "no-such-fictional-alumnus" }), []);
  assert.deepEqual(getAlumniFilterOptions(alumniProfiles).graduationPeriods, ["2010s", "2000s", "1990s", "Before 1990"]);
});

test("directory UI includes reset, no-results, fictional notices and static detail views", async () => {
  const component = await readFile("src/components/alumni-directory.tsx", "utf8");
  const page = await readFile("src/app/alumni/page.tsx", "utf8");
  const detail = await readFile("src/app/alumni/[slug]/page.tsx", "utf8");
  assert.match(component, /Reset filters/); assert.match(component, /No fictional demonstration profiles/); assert.match(component, /Fictional demonstration profile/);
  assert.match(page, /brain drain to brain circulation/i); assert.match(page, /does not guarantee mentorship/i);
  assert.match(detail, /generateStaticParams/); assert.match(detail, /This person, professional history and availability are fictional/); assert.match(detail, /Express similar interest/);
});
