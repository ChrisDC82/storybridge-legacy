import { alumniSupportTypes } from "../types/alumni.ts";
import { engagementRelationships, involvementOptions, type EngagementErrors, type EngagementFormData } from "../types/engagement.ts";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validHttpUrl(value: string) {
  try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:"; } catch { return false; }
}

export function validateEngagementForm(data: EngagementFormData, currentYear = new Date().getFullYear()) {
  const errors: EngagementErrors = {};
  const limits: Array<[keyof EngagementFormData, number, string]> = [
    ["fullName", 100, "Full name"], ["email", 254, "Email"], ["schoolPeriod", 40, "School period"],
    ["countryOrRegion", 100, "Country or region"], ["professionOrIndustry", 120, "Profession or industry"],
    ["expertise", 500, "Expertise"], ["assistanceDescription", 2000, "Assistance description"],
    ["professionalUrl", 500, "Professional URL"], ["languages", 200, "Languages"], ["availabilityNotes", 500, "Availability notes"],
  ];
  for (const [field, maximum, label] of limits) {
    const value = data[field];
    if (typeof value === "string" && value.trim().length > maximum) errors[field] = `${label} must be ${maximum} characters or fewer.`;
  }
  if (data.fullName.trim().length < 2) errors.fullName = "Enter your full name using at least 2 characters.";
  if (!emailPattern.test(data.email.trim())) errors.email = "Enter a valid email address.";
  if (!data.relationship || !engagementRelationships.includes(data.relationship)) errors.relationship = "Select your relationship to the institution.";
  const period = data.schoolPeriod.trim();
  if (data.relationship === "Alumnus or former student" && !period) errors.schoolPeriod = "Enter a graduation year or school period.";
  if (/^\d+$/.test(period)) {
    const year = Number(period);
    if (!/^\d{4}$/.test(period) || year < 1950 || year > currentYear + 1) errors.schoolPeriod = `Use a year from 1950 to ${currentYear + 1}, or describe a school period.`;
  } else if (period && period.length < 2) errors.schoolPeriod = "Describe the school period using at least 2 characters.";
  if (data.countryOrRegion.trim().length < 2) errors.countryOrRegion = "Enter your current country or region.";
  if (data.professionOrIndustry.trim().length < 2) errors.professionOrIndustry = "Enter your profession or industry.";
  if (data.expertise.trim().length < 2) errors.expertise = "Describe at least one area of expertise.";
  if (!data.supportOpportunities.length) errors.supportOpportunities = "Select at least one support opportunity.";
  else if (data.supportOpportunities.some((item) => !alumniSupportTypes.includes(item))) errors.supportOpportunities = "Select only listed support opportunities.";
  const descriptionLength = data.assistanceDescription.trim().length;
  if (descriptionLength < 80) errors.assistanceDescription = "Use at least 80 characters to explain how you may assist.";
  if (!data.involvementLevel || !involvementOptions.includes(data.involvementLevel)) errors.involvementLevel = "Select a preferred level of involvement.";
  if (data.professionalUrl.trim() && !validHttpUrl(data.professionalUrl.trim())) errors.professionalUrl = "Enter a valid http or https URL.";
  if (!data.consent) errors.consent = "Confirm consent before saving this local expression of interest.";
  return errors;
}

export function hasEngagementErrors(errors: EngagementErrors) { return Object.keys(errors).length > 0; }
