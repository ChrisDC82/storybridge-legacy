import type { AlumniFilters, AlumniProfile } from "../types/alumni.ts";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("en");
}

export function getGraduationPeriod(year: number) {
  if (year < 1990) return "Before 1990";
  return `${Math.floor(year / 10) * 10}s`;
}

export function getAlumniFilterOptions(profiles: AlumniProfile[]) {
  const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));
  return {
    industries: unique(profiles.map((profile) => profile.industry)),
    countries: unique(profiles.map((profile) => profile.countryOrRegion)),
    graduationPeriods: unique(profiles.map((profile) => getGraduationPeriod(profile.graduationYear))).sort((a, b) => {
      if (a === "Before 1990") return 1;
      if (b === "Before 1990") return -1;
      return Number.parseInt(b) - Number.parseInt(a);
    }),
    expertise: unique(profiles.flatMap((profile) => profile.expertiseAreas)),
  };
}

export function filterAlumniProfiles(profiles: AlumniProfile[], filters: AlumniFilters) {
  const query = normalize(filters.query);
  return profiles
    .filter((profile) => {
      const searchable = normalize([
        profile.displayName,
        profile.profession,
        profile.industry,
        profile.countryOrRegion,
        profile.shortBiography,
        profile.legacyStatement,
        profile.graduationYear.toString(),
        ...profile.expertiseAreas,
        ...profile.mentorshipInterests,
        ...profile.supportOffered,
      ].join(" "));
      return (!query || searchable.includes(query))
        && (filters.industry === "All" || profile.industry === filters.industry)
        && (filters.country === "All" || profile.countryOrRegion === filters.country)
        && (filters.graduationPeriod === "All" || getGraduationPeriod(profile.graduationYear) === filters.graduationPeriod)
        && (filters.expertise === "All" || profile.expertiseAreas.includes(filters.expertise))
        && (filters.supportType === "All" || profile.supportOffered.includes(filters.supportType))
        && (filters.availability === "All" || profile.availability === filters.availability);
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}
