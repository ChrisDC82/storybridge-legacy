import type { ContributionFormData, LocalSubmission, PublicSubmissionSummary } from "@/types/contribution";

export const SUBMISSION_STORAGE_KEY = "storybridge-legacy-demo-submissions";

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readLocalSubmissions(storage: StorageLike): LocalSubmission[] {
  try {
    const stored = storage.getItem(SUBMISSION_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as LocalSubmission[]) : [];
  } catch {
    return [];
  }
}

export function createLocalSubmission(
  data: ContributionFormData,
  approvedDraft: string,
  guidedMode: "Used" | "Skipped",
  options: { id?: string; createdAt?: string } = {},
): LocalSubmission {
  const generatedId = options.id ?? `SBL-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  return {
    id: generatedId,
    createdAt: options.createdAt ?? new Date().toISOString(),
    status: "Pending review",
    contributor: {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      relationship: data.relationship as LocalSubmission["contributor"]["relationship"],
      schoolPeriod: data.schoolPeriod.trim(),
    },
    story: {
      title: data.storyTitle.trim(),
      approximateEventYear: data.eventYear.trim(),
      category: data.category as LocalSubmission["story"]["category"],
      optionalImageUrl: data.imageUrl.trim() || undefined,
      originalRoughMemory: data.roughMemory.trim(),
      approvedDraft: approvedDraft.trim(),
    },
    guidedStoryMode: guidedMode,
    consentConfirmed: true,
  };
}

export function saveLocalSubmission(storage: StorageLike, submission: LocalSubmission) {
  const submissions = readLocalSubmissions(storage);
  storage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify([submission, ...submissions]));
  return submission;
}

export function resetLocalSubmissions(storage: StorageLike) {
  storage.removeItem(SUBMISSION_STORAGE_KEY);
}

export function toPublicSubmissionSummary(submission: LocalSubmission): PublicSubmissionSummary {
  return {
    id: submission.id,
    createdAt: submission.createdAt,
    status: submission.status,
    title: submission.story.title,
    category: submission.story.category,
    approvedDraft: submission.story.approvedDraft,
  };
}
