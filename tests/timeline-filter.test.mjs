import assert from "node:assert/strict";
import { test } from "node:test";
import { legacyEntries } from "../src/data/legacy-entries.ts";
import { filterLegacyEntries, getAvailableDecades } from "../src/lib/timeline.ts";

const allFilters = { query: "", category: "All", decade: "All" };

test("timeline seed data covers every required category and stays explicitly fictional", () => {
  const requiredCategories = ["Academic", "Sport", "Culture", "Service", "Innovation", "Alumni", "School Life"];
  const availableCategories = new Set(legacyEntries.map((entry) => entry.category));

  for (const category of requiredCategories) assert.equal(availableCategories.has(category), true);
  assert.equal(legacyEntries.every((entry) => entry.isDemonstration), true);
  assert.equal(legacyEntries.every((entry) => entry.verificationStatus === "Demonstration"), true);
  assert.equal(new Set(legacyEntries.map((entry) => entry.slug)).size, legacyEntries.length);
});

test("timeline search covers story text, tags, category and year", () => {
  assert.deepEqual(
    filterLegacyEntries(legacyEntries, { ...allFilters, query: "brain circulation" }).map((entry) => entry.slug),
    ["diaspora-career-letters"],
  );
  assert.equal(filterLegacyEntries(legacyEntries, { ...allFilters, query: "innovation" }).length, 2);
  assert.equal(filterLegacyEntries(legacyEntries, { ...allFilters, query: "1994" })[0]?.slug, "solar-study-lamp-workshop");
});

test("category and decade filters combine deterministically", () => {
  const results = filterLegacyEntries(legacyEntries, {
    query: "",
    category: "Academic",
    decade: "2010s",
  });
  assert.deepEqual(results.map((entry) => entry.slug), ["peer-tutoring-table"]);
  assert.deepEqual(getAvailableDecades(legacyEntries).slice(0, 3), ["2020s", "2010s", "2000s"]);
});

test("timeline results are newest first and support a no-results state", () => {
  const results = filterLegacyEntries(legacyEntries, allFilters);
  assert.equal(results[0]?.year, 2023);
  assert.equal(results.at(-1)?.year, 1968);
  assert.deepEqual(filterLegacyEntries(legacyEntries, { ...allFilters, query: "no-such-memory" }), []);
});
