"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filterLegacyEntries, getAvailableDecades } from "@/lib/timeline";
import { legacyCategories, type LegacyCategory, type LegacyEntry } from "@/types/legacy";

type TimelineExplorerProps = {
  entries: LegacyEntry[];
};

export function TimelineExplorer({ entries }: TimelineExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<LegacyCategory | "All">("All");
  const [decade, setDecade] = useState<string | "All">("All");
  const decades = useMemo(() => getAvailableDecades(entries), [entries]);
  const results = useMemo(
    () => filterLegacyEntries(entries, { query, category, decade }),
    [entries, query, category, decade],
  );
  const hasFilters = Boolean(query.trim()) || category !== "All" || decade !== "All";
  const activeFilters = [
    query.trim() ? `Search: “${query.trim()}”` : null,
    category !== "All" ? `Category: ${category}` : null,
    decade !== "All" ? `Decade: ${decade}` : null,
  ].filter(Boolean) as string[];

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setDecade("All");
  }

  return (
    <>
      <section className="timeline-controls" aria-labelledby="filter-heading">
        <div className="filter-heading-row">
          <div>
            <p className="eyebrow">Find a memory</p>
            <h2 id="filter-heading">Search the demonstration archive</h2>
          </div>
          <button className="text-button" type="button" onClick={resetFilters} disabled={!hasFilters}>
            Reset filters
          </button>
        </div>
        <div className="filter-grid">
          <div className="field search-field">
            <label htmlFor="legacy-search">Search stories</label>
            <input
              id="legacy-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try mentorship, culture or 2002"
            />
          </div>
          <div className="field">
            <label htmlFor="legacy-category">Category</label>
            <select
              id="legacy-category"
              value={category}
              onChange={(event) => setCategory(event.target.value as LegacyCategory | "All")}
            >
              <option value="All">All categories</option>
              {legacyCategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="legacy-decade">Decade</label>
            <select id="legacy-decade" value={decade} onChange={(event) => setDecade(event.target.value)}>
              <option value="All">All decades</option>
              {decades.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
        <div className="filter-status">
          <p aria-live="polite">
            <strong>{results.length}</strong> {results.length === 1 ? "record" : "records"} shown
          </p>
          {activeFilters.length > 0 ? (
            <ul className="filter-chips" aria-label="Active filters">
              {activeFilters.map((filter) => <li key={filter}>{filter}</li>)}
            </ul>
          ) : <p className="muted-copy">No filters active</p>}
        </div>
      </section>

      {results.length > 0 ? (
        <section className="timeline-list" aria-label="Legacy records">
          {results.map((entry) => (
            <article className="timeline-entry" key={entry.id}>
              <div className="timeline-year" aria-label={`Year ${entry.year}`}>{entry.year}</div>
              <div className="timeline-card">
                <div className="record-meta">
                  <span>{entry.category}</span>
                  <span>{entry.verificationStatus} status</span>
                </div>
                <div className="timeline-visual" role="img" aria-label={entry.visualLabel}>
                  <span aria-hidden="true">{entry.category.slice(0, 1)}</span>
                  <p>{entry.visualLabel}</p>
                </div>
                <div className="timeline-card-body">
                  <p className="demo-label">Fictional demonstration record</p>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <p className="record-contributor">Shared by {entry.contributorDisplayName} · {entry.contributorRelationship}</p>
                  {entry.tags ? (
                    <ul className="tag-list" aria-label="Themes">
                      {entry.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  ) : null}
                  <Link className="detail-link" href={`/legacy/${entry.slug}`}>
                    Read the full demonstration story <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state" aria-labelledby="no-results-heading">
          <p className="eyebrow">Nothing matched</p>
          <h2 id="no-results-heading">Try a broader search</h2>
          <p>No fictional demonstration records match the current filters.</p>
          <button className="button primary" type="button" onClick={resetFilters}>Clear all filters</button>
        </section>
      )}
    </>
  );
}
