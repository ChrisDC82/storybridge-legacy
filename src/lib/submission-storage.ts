import { moderationStatuses, type ContributionFormData, type LocalSubmission, type PublicSubmissionSummary } from "../types/contribution.ts";

export const SUBMISSION_STORAGE_KEY = "storybridge-legacy-demo-submissions";

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readLocalSubmissions(storage: StorageLike): LocalSubmission[] {
  try {
    const stored = storage.getItem(SUBMISSION_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return (parsed as LocalSubmission[]).map(normalizeLocalSubmission);
  } catch {
    return [];
  }
}

export function normalizeLocalSubmission(submission: LocalSubmission): LocalSubmission {
  const status = moderationStatuses.includes(submission.status) ? submission.status : "Pending review";
  const updatedAt = submission.updatedAt || submission.createdAt;
  return {
    ...submission,
    status,
    updatedAt,
    moderationHistory: Array.isArray(submission.moderationHistory) && submission.moderationHistory.length
      ? submission.moderationHistory
      : [{ status, updatedAt, note: submission.moderationNote }],
  };
}

export function createLocalSubmission(
  data: ContributionFormData,
  approvedDraft: string,
  guidedMode: "Used" | "Skipped",
  options: { id?: string; createdAt?: string } = {},
): LocalSubmission {
  const generatedId = options.id ?? `SBL-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const createdAt = options.createdAt ?? new Date().toISOString();
  return {
    id: generatedId,
    createdAt,
    status: "Pending review",
    updatedAt: createdAt,
    moderationHistory: [{ status: "Pending review", updatedAt: createdAt }],
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
