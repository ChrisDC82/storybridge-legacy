import type { LegacyEntry, TimelineFilters } from "@/types/legacy";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("en");
}

export function getEntryDecade(year: number) {
  return `${Math.floor(year / 10) * 10}s`;
}

export function getAvailableDecades(entries: LegacyEntry[]) {
  return [...new Set(entries.map((entry) => getEntryDecade(entry.year)))].sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  );
}

export function filterLegacyEntries(
  entries: LegacyEntry[],
  filters: TimelineFilters,
) {
  const query = normalize(filters.query);

  return entries
    .filter((entry) => {
      const matchesCategory =
        filters.category === "All" || entry.category === filters.category;
      const matchesDecade =
        filters.decade === "All" || getEntryDecade(entry.year) === filters.decade;
      const searchable = normalize(
        [
          entry.title,
          entry.summary,
          entry.fullStory,
          entry.category,
          entry.year.toString(),
          ...(entry.tags ?? []),
        ].join(" "),
      );

      return matchesCategory && matchesDecade && (!query || searchable.includes(query));
    })
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}
