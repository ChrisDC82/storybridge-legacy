import { legacyCategories } from "../types/legacy.ts";
import { institutionRelationships, type ContributionErrors, type ContributionFormData } from "../types/contribution.ts";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uncertainYearPattern = /^(not sure|unknown|unsure|approximate)$/i;

function validHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateContributionDetails(
  data: ContributionFormData,
  currentYear = new Date().getFullYear(),
) {
  const errors: ContributionErrors = {};
  const name = data.fullName.trim();
  const email = data.email.trim();
  const period = data.schoolPeriod.trim();
  const title = data.storyTitle.trim();
  const eventYear = data.eventYear.trim();
  const memory = data.roughMemory.trim();
  const imageUrl = data.imageUrl.trim();

  if (!name) errors.fullName = "Enter your full name.";
  else if (name.length < 2 || name.length > 100) errors.fullName = "Use between 2 and 100 characters.";

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 254 || !emailPattern.test(email)) errors.email = "Enter a valid email address.";

  if (!data.relationship) errors.relationship = "Select your relationship to the institution.";
  else if (!institutionRelationships.includes(data.relationship)) errors.relationship = "Select a listed relationship.";

  if (!period) errors.schoolPeriod = "Enter a graduation year or school period.";
  else if (period.length < 2 || period.length > 40) errors.schoolPeriod = "Use between 2 and 40 characters.";

  if (!title) errors.storyTitle = "Enter a story title.";
  else if (title.length < 5 || title.length > 120) errors.storyTitle = "Use between 5 and 120 characters.";

  if (!eventYear) errors.eventYear = "Enter an approximate year or choose “Not sure”.";
  else if (!uncertainYearPattern.test(eventYear)) {
    const parsedYear = Number(eventYear);
    if (!/^\d{4}$/.test(eventYear) || parsedYear < 1850 || parsedYear > currentYear + 1) {
      errors.eventYear = `Enter a year from 1850 to ${currentYear + 1}, or “Not sure”.`;
    }
  }

  if (!data.category) errors.category = "Select a story category.";
  else if (!legacyCategories.includes(data.category)) errors.category = "Select a listed category.";

  if (!memory) errors.roughMemory = "Enter the memory or account you want to preserve.";
  else if (memory.length < 80) errors.roughMemory = "Add at least 80 characters so the memory has useful context.";
  else if (memory.length > 5000) errors.roughMemory = "Keep the rough memory to 5,000 characters or fewer.";

  if (imageUrl.length > 500) errors.imageUrl = "Keep the image URL to 500 characters or fewer.";
  else if (imageUrl && !validHttpUrl(imageUrl)) errors.imageUrl = "Enter a valid http or https URL.";

  return errors;
}

export function validateDraftReview(finalDraft: string, draftReviewed: boolean) {
  const errors: ContributionErrors = {};
  const draft = finalDraft.trim();
  if (draft.length < 80) errors.finalDraft = "Keep at least 80 characters in the final draft.";
  else if (draft.length > 7000) errors.finalDraft = "Keep the final draft to 7,000 characters or fewer.";
  if (!draftReviewed) errors.draftReviewed = "Confirm that you reviewed and edited the suggested draft.";
  return errors;
}

export function validateFinalSubmission(
  data: ContributionFormData,
  finalDraft: string,
  draftReviewed: boolean,
  currentYear = new Date().getFullYear(),
) {
  const errors = {
    ...validateContributionDetails(data, currentYear),
    ...validateDraftReview(finalDraft, draftReviewed),
  };
  if (!data.consent) errors.consent = "Confirm consent before submitting for moderation.";
  return errors;
}

export function hasValidationErrors(errors: ContributionErrors) {
  return Object.keys(errors).length > 0;
}
