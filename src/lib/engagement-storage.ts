import type { EngagementFormData, LocalEngagementInterest, PublicInterestSummary } from "../types/engagement.ts";

export const ENGAGEMENT_STORAGE_KEY = "storybridge-legacy-demo-interests";
export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readLocalInterests(storage: StorageLike): LocalEngagementInterest[] {
  try { const raw = storage.getItem(ENGAGEMENT_STORAGE_KEY); if (!raw) return []; const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) ? parsed as LocalEngagementInterest[] : []; } catch { return []; }
}

export function createLocalInterest(data: EngagementFormData, options: { id?: string; createdAt?: string } = {}): LocalEngagementInterest {
  return {
    id: options.id ?? `SBL-EOI-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: options.createdAt ?? new Date().toISOString(), status: "Interest received",
    contact: { fullName: data.fullName.trim(), email: data.email.trim(), relationship: data.relationship as LocalEngagementInterest["contact"]["relationship"], schoolPeriod: data.schoolPeriod.trim() || undefined, countryOrRegion: data.countryOrRegion.trim(), professionOrIndustry: data.professionOrIndustry.trim(), professionalUrl: data.professionalUrl.trim() || undefined },
    offer: { expertise: data.expertise.trim(), supportOpportunities: [...data.supportOpportunities], assistanceDescription: data.assistanceDescription.trim(), involvementLevel: data.involvementLevel as LocalEngagementInterest["offer"]["involvementLevel"], languages: data.languages.trim() || undefined, availabilityNotes: data.availabilityNotes.trim() || undefined },
    consentConfirmed: true,
  };
}

export function saveLocalInterest(storage: StorageLike, interest: LocalEngagementInterest) { storage.setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify([interest, ...readLocalInterests(storage)])); return interest; }
export function resetLocalInterests(storage: StorageLike) { storage.removeItem(ENGAGEMENT_STORAGE_KEY); }
export function toPublicInterestSummary(interest: LocalEngagementInterest): PublicInterestSummary { return { id: interest.id, createdAt: interest.createdAt, status: interest.status, fullName: interest.contact.fullName, countryOrRegion: interest.contact.countryOrRegion, professionOrIndustry: interest.contact.professionOrIndustry, supportOpportunities: interest.offer.supportOpportunities, involvementLevel: interest.offer.involvementLevel }; }
