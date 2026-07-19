"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filterAlumniProfiles, getAlumniFilterOptions } from "@/lib/alumni-directory";
import { alumniAvailabilityOptions, alumniSupportTypes, type AlumniAvailability, type AlumniProfile, type AlumniSupportType } from "@/types/alumni";

export function AlumniDirectory({ profiles }: { profiles: AlumniProfile[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const [country, setCountry] = useState("All");
  const [graduationPeriod, setGraduationPeriod] = useState("All");
  const [expertise, setExpertise] = useState("All");
  const [supportType, setSupportType] = useState<AlumniSupportType | "All">("All");
  const [availability, setAvailability] = useState<AlumniAvailability | "All">("All");
  const options = useMemo(() => getAlumniFilterOptions(profiles), [profiles]);
  const results = useMemo(() => filterAlumniProfiles(profiles, { query, industry, country, graduationPeriod, expertise, supportType, availability }), [profiles, query, industry, country, graduationPeriod, expertise, supportType, availability]);
  const activeFilters = [
    query.trim() ? `Search: “${query.trim()}”` : null,
    industry !== "All" ? `Industry: ${industry}` : null,
    country !== "All" ? `Location: ${country}` : null,
    graduationPeriod !== "All" ? `Graduation: ${graduationPeriod}` : null,
    expertise !== "All" ? `Expertise: ${expertise}` : null,
    supportType !== "All" ? `Support: ${supportType}` : null,
    availability !== "All" ? `Availability: ${availability}` : null,
  ].filter(Boolean) as string[];

  function resetFilters() {
    setQuery(""); setIndustry("All"); setCountry("All"); setGraduationPeriod("All");
    setExpertise("All"); setSupportType("All"); setAvailability("All");
  }

  return (
    <>
      <section className="directory-controls" aria-labelledby="alumni-filter-heading">
        <div className="filter-heading-row">
          <div><p className="eyebrow">Find a connection</p><h2 id="alumni-filter-heading">Explore fictional alumni profiles</h2></div>
          <button className="text-button" type="button" onClick={resetFilters} disabled={activeFilters.length === 0}>Reset filters</button>
        </div>
        <div className="alumni-filter-grid">
          <div className="field directory-search"><label htmlFor="alumni-search">Search profiles</label><input id="alumni-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try engineering, Canada or mentorship" /></div>
          <FilterSelect id="alumni-industry" label="Profession or industry" value={industry} onChange={setIndustry} options={options.industries} allLabel="All industries" />
          <FilterSelect id="alumni-country" label="Country or region" value={country} onChange={setCountry} options={options.countries} allLabel="All locations" />
          <FilterSelect id="alumni-period" label="Graduation period" value={graduationPeriod} onChange={setGraduationPeriod} options={options.graduationPeriods} allLabel="All periods" />
          <FilterSelect id="alumni-expertise" label="Expertise" value={expertise} onChange={setExpertise} options={options.expertise} allLabel="All expertise" />
          <div className="field"><label htmlFor="alumni-support">Support type</label><select id="alumni-support" value={supportType} onChange={(event) => setSupportType(event.target.value as AlumniSupportType | "All")}><option value="All">All support types</option>{alumniSupportTypes.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="field"><label htmlFor="alumni-availability">Availability</label><select id="alumni-availability" value={availability} onChange={(event) => setAvailability(event.target.value as AlumniAvailability | "All")}><option value="All">Any availability</option>{alumniAvailabilityOptions.map((item) => <option key={item}>{item}</option>)}</select></div>
        </div>
        <div className="filter-status">
          <p aria-live="polite"><strong>{results.length}</strong> fictional {results.length === 1 ? "profile" : "profiles"} shown</p>
          {activeFilters.length ? <ul className="filter-chips" aria-label="Active alumni filters">{activeFilters.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="muted-copy">No filters active</p>}
        </div>
      </section>

      {results.length ? (
        <section className="alumni-grid" aria-label="Fictional alumni directory results">
          {results.map((profile) => <AlumniCard profile={profile} key={profile.id} />)}
        </section>
      ) : (
        <section className="empty-state" aria-labelledby="alumni-empty-heading">
          <p className="eyebrow">Nothing matched</p><h2 id="alumni-empty-heading">Try a broader alumni search</h2>
          <p>No fictional demonstration profiles match all current filters.</p>
          <button className="button primary" type="button" onClick={resetFilters}>Clear all filters</button>
        </section>
      )}
    </>
  );
}

function FilterSelect({ id, label, value, onChange, options, allLabel }: { id: string; label: string; value: string; onChange: (value: string) => void; options: string[]; allLabel: string }) {
  return <div className="field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)}><option value="All">{allLabel}</option>{options.map((item) => <option key={item}>{item}</option>)}</select></div>;
}

function AlumniCard({ profile }: { profile: AlumniProfile }) {
  const initials = profile.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
  return (
    <article className="alumni-card">
      <div className="alumni-card-head"><div className="alumni-initials" aria-hidden="true">{initials}</div><div><p className="demo-label">Fictional demonstration profile</p><h3>{profile.displayName}</h3><p>{profile.profession}</p></div></div>
      <dl className="alumni-card-facts"><div><dt>Class</dt><dd>{profile.graduationYear}</dd></div><div><dt>Location</dt><dd>{profile.countryOrRegion}</dd></div><div><dt>Availability</dt><dd>{profile.availability}</dd></div></dl>
      <p>{profile.shortBiography}</p>
      <p className="support-heading">How this fictional alumnus may help</p>
      <ul className="tag-list" aria-label={`${profile.displayName} support types`}>{profile.supportOffered.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
      <Link className="detail-link" href={`/alumni/${profile.slug}`}>View demonstration profile <span aria-hidden="true">→</span></Link>
    </article>
  );
}
