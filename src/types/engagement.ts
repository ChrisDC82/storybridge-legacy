import type { AlumniSupportType } from "./alumni.ts";

export const engagementRelationships = [
  "Alumnus or former student",
  "Current or former teacher",
  "Current or former staff member",
  "Parent or guardian",
  "Community partner",
  "Corporate or institutional partner",
  "Friend of the institution",
  "Other",
] as const;

export const involvementOptions = [
  "One-time contribution",
  "Occasional support",
  "Monthly availability",
  "Programme-specific involvement",
  "Open to discussion",
] as const;

export type EngagementRelationship = (typeof engagementRelationships)[number];
export type InvolvementLevel = (typeof involvementOptions)[number];

export type EngagementFormData = {
  fullName: string;
  email: string;
  relationship: EngagementRelationship | "";
  schoolPeriod: string;
  countryOrRegion: string;
  professionOrIndustry: string;
  expertise: string;
  supportOpportunities: AlumniSupportType[];
  assistanceDescription: string;
  involvementLevel: InvolvementLevel | "";
  professionalUrl: string;
  languages: string;
  availabilityNotes: string;
  consent: boolean;
};

export const emptyEngagementForm: EngagementFormData = {
  fullName: "", email: "", relationship: "", schoolPeriod: "", countryOrRegion: "",
  professionOrIndustry: "", expertise: "", supportOpportunities: [], assistanceDescription: "",
  involvementLevel: "", professionalUrl: "", languages: "", availabilityNotes: "", consent: false,
};

export type EngagementField = keyof EngagementFormData;
export type EngagementErrors = Partial<Record<EngagementField, string>>;

export type LocalEngagementInterest = {
  id: string;
  createdAt: string;
  status: "Interest received";
  contact: { fullName: string; email: string; relationship: EngagementRelationship; schoolPeriod?: string; countryOrRegion: string; professionOrIndustry: string; professionalUrl?: string };
  offer: { expertise: string; supportOpportunities: AlumniSupportType[]; assistanceDescription: string; involvementLevel: InvolvementLevel; languages?: string; availabilityNotes?: string };
  consentConfirmed: true;
};

export type PublicInterestSummary = {
  id: string;
  createdAt: string;
  status: "Interest received";
  fullName: string;
  countryOrRegion: string;
  professionOrIndustry: string;
  supportOpportunities: AlumniSupportType[];
  involvementLevel: InvolvementLevel;
};
