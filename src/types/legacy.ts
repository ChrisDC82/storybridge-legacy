export const legacyCategories = [
  "Academic",
  "Sport",
  "Culture",
  "Service",
  "Innovation",
  "Alumni",
  "School Life",
] as const;

export type LegacyCategory = (typeof legacyCategories)[number];

export type VerificationStatus =
  | "Demonstration"
  | "Pending verification"
  | "Verified";

export type LegacyEntry = {
  id: string;
  slug: string;
  title: string;
  year: number;
  category: LegacyCategory;
  summary: string;
  fullStory: string;
  contributorDisplayName: string;
  contributorRelationship: string;
  verificationStatus: VerificationStatus;
  location?: string;
  tags?: string[];
  visualLabel?: string;
  isDemonstration: true;
};

export type TimelineFilters = {
  query: string;
  category: LegacyCategory | "All";
  decade: string | "All";
};
