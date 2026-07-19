import { emptyContributionForm, type ContributionFormData } from "../types/contribution.ts";
import { generateGuidance } from "./guided-story.ts";

export function getStoryGuideStatus(environment: Record<string, string | undefined>) {
  return {
    service: "StoryBridge Legacy Story Guide",
    status: "ready",
    mode: "deterministic-fallback",
    openAIConfigured: Boolean(environment.OPENAI_API_KEY && environment.OPENAI_STORY_MODEL),
    note: "This MVP does not call OpenAI. Guidance is deterministic and must not be treated as verification.",
  };
}

function safeText(value: unknown, maximum: number) {
  return typeof value === "string" ? value.slice(0, maximum) : "";
}

export function coerceGuidanceInput(value: unknown): ContributionFormData {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    ...emptyContributionForm,
    relationship: safeText(input.relationship, 100) as ContributionFormData["relationship"],
    schoolPeriod: safeText(input.schoolPeriod, 40),
    eventYear: safeText(input.eventYear, 20),
    category: safeText(input.category, 50) as ContributionFormData["category"],
    roughMemory: safeText(input.roughMemory, 5000),
  };
}

export function createFallbackGuidance(value: unknown) {
  return generateGuidance(coerceGuidanceInput(value));
}
