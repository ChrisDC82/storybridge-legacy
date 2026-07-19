import type { LocalSubmission, ModerationStatus } from "../types/contribution.ts";
import { readLocalSubmissions, SUBMISSION_STORAGE_KEY, type StorageLike } from "./submission-storage.ts";

export type ModerationSummary = Record<"total" | "pending" | "approved" | "moreInformation" | "rejected", number>;

export function getModerationSummary(submissions: LocalSubmission[]): ModerationSummary {
  return {
    total: submissions.length,
    pending: submissions.filter((item) => item.status === "Pending review").length,
    approved: submissions.filter((item) => item.status === "Approved").length,
    moreInformation: submissions.filter((item) => item.status === "More information requested").length,
    rejected: submissions.filter((item) => item.status === "Rejected").length,
  };
}

export function validateModerationNote(status: ModerationStatus, note: string) {
  const trimmed = note.trim();
  if (trimmed.length > 500) return "Keep the moderation note to 500 characters or fewer.";
  if ((status === "More information requested" || status === "Rejected") && trimmed.length < 20) {
    return status === "Rejected" ? "Provide a rejection reason using at least 20 characters." : "Explain what information is needed using at least 20 characters.";
  }
  if (status === "Approved" && trimmed && trimmed.length < 5) return "Use at least 5 characters for an optional approval note.";
  return "";
}

export function updateModerationStatus(storage: StorageLike, submissionId: string, status: ModerationStatus, note: string, updatedAt = new Date().toISOString()) {
  const submissions = readLocalSubmissions(storage);
  const index = submissions.findIndex((item) => item.id === submissionId);
  if (index < 0) return { changed: false, error: "Submission not found.", submissions };
  const noteError = validateModerationNote(status, note);
  if (noteError) return { changed: false, error: noteError, submissions };
  const trimmedNote = note.trim();
  const current = submissions[index];
  if (current.status === status && (current.moderationNote ?? "") === trimmedNote) return { changed: false, error: "This moderation state is already recorded.", submissions };
  const updated: LocalSubmission = {
    ...current,
    status,
    updatedAt,
    moderationNote: trimmedNote || undefined,
    moderationHistory: [...current.moderationHistory, { status, updatedAt, note: trimmedNote || undefined }],
  };
  submissions[index] = updated;
  storage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(submissions));
  return { changed: true, error: "", submissions, updated };
}

export function resetModerationStates(storage: StorageLike, updatedAt = new Date().toISOString()) {
  const submissions = readLocalSubmissions(storage).map((submission) => ({
    ...submission,
    status: "Pending review" as const,
    updatedAt,
    moderationNote: undefined,
    moderationHistory: [...submission.moderationHistory, { status: "Pending review" as const, updatedAt, note: "Demonstration moderation state reset." }],
  }));
  storage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(submissions));
  return submissions;
}
