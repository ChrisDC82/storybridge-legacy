export const alumniSupportTypes = [
  "Student mentorship",
  "Career talk",
  "Internship opportunity",
  "Portfolio review",
  "Scholarship support",
  "Club or programme support",
  "Equipment sponsorship",
  "International introduction",
  "Youth-enterprise advice",
  "Fundraising support",
  "Future responsible investment conversation",
] as const;

export type AlumniSupportType = (typeof alumniSupportTypes)[number];

export const alumniAvailabilityOptions = [
  "Available now",
  "Occasional availability",
  "Programme-specific",
  "Open to discussion",
] as const;

export type AlumniAvailability = (typeof alumniAvailabilityOptions)[number];

export type AlumniProfile = {
  id: string;
  slug: string;
  displayName: string;
  graduationYear: number;
  profession: string;
  industry: string;
  countryOrRegion: string;
  shortBiography: string;
  legacyStatement: string;
  expertiseAreas: string[];
  mentorshipInterests: string[];
  supportOffered: AlumniSupportType[];
  availability: AlumniAvailability;
  languages?: string[];
  isDemonstration: true;
};

export type AlumniFilters = {
  query: string;
  industry: string | "All";
  country: string | "All";
  graduationPeriod: string | "All";
  expertise: string | "All";
  supportType: AlumniSupportType | "All";
  availability: AlumniAvailability | "All";
};
