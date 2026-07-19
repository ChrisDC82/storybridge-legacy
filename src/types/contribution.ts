import type { LegacyCategory } from "@/types/legacy";

export const institutionRelationships = [
  "Current student",
  "Former student or alumnus",
  "Teacher or former teacher",
  "Staff or former staff",
  "Parent or guardian",
  "Community member",
  "Other",
] as const;

export type InstitutionRelationship = (typeof institutionRelationships)[number];

export type ContributionFormData = {
  fullName: string;
  email: string;
  relationship: InstitutionRelationship | "";
  schoolPeriod: string;
  storyTitle: string;
  eventYear: string;
  category: LegacyCategory | "";
  roughMemory: string;
  imageUrl: string;
  consent: boolean;
};

export const emptyContributionForm: ContributionFormData = {
  fullName: "",
  email: "",
  relationship: "",
  schoolPeriod: "",
  storyTitle: "",
  eventYear: "",
  category: "",
  roughMemory: "",
  imageUrl: "",
  consent: false,
};

export type ContributionField = keyof ContributionFormData | "finalDraft" | "draftReviewed";
export type ContributionErrors = Partial<Record<ContributionField, string>>;

export type GuidanceQuestion = {
  id: string;
  prompt: string;
  reason: string;
};

export type GuidanceAnswerMap = Record<string, string>;

export type GuidanceResult = {
  mode: "guided-story-mode";
  questions: GuidanceQuestion[];
  warning: string;
};

export const moderationStatuses = [
  "Pending review",
  "Approved",
  "More information requested",
  "Rejected",
] as const;

export type ModerationStatus = (typeof moderationStatuses)[number];

export type ModerationHistoryEntry = {
  status: ModerationStatus;
  updatedAt: string;
  note?: string;
};

export type LocalSubmission = {
  id: string;
  createdAt: string;
  status: ModerationStatus;
  updatedAt: string;
  moderationNote?: string;
  moderationHistory: ModerationHistoryEntry[];
  contributor: {
    fullName: string;
    email: string;
    relationship: InstitutionRelationship;
    schoolPeriod: string;
  };
  story: {
    title: string;
    approximateEventYear: string;
    category: LegacyCategory;
    optionalImageUrl?: string;
    originalRoughMemory: string;
    approvedDraft: string;
  };
  guidedStoryMode: "Used" | "Skipped";
  consentConfirmed: true;
};

export type PublicSubmissionSummary = {
  id: string;
  createdAt: string;
  status: ModerationStatus;
  title: string;
  category: LegacyCategory;
  approvedDraft: string;
};
