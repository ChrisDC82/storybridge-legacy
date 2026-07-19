import type { ContributionFormData, GuidanceAnswerMap, GuidanceQuestion, GuidanceResult } from "@/types/contribution";

const uncertaintyPattern = /\b(maybe|perhaps|not sure|unsure|approximately|around|i think|might|uncertain|possibly)\b/i;
const placePattern = /\b(at|inside|outside|near|in the|on the|classroom|hall|field|library|school|court|lab|stage|yard|community)\b/i;
const peoplePattern = /\b(with|teacher|student|students|classmates|friends|coach|family|alumni|staff|parent|guardian|we|they)\b/i;
const significancePattern = /\b(because|meant|matter|important|changed|impact|learned|remember|significant|inspired|helped)\b/i;

const categoryQuestions: Record<string, string> = {
  Academic: "What learning, subject or academic practice is central to this memory?",
  Sport: "What activity took place, and what did participation mean to the people involved?",
  Culture: "What tradition, performance or creative practice should a future reader understand?",
  Service: "Who was served, and what did participants learn from the community?",
  Innovation: "What problem were people trying to solve, and what was tested or learned?",
  Alumni: "How did alumni remain connected, and what knowledge or opportunity circulated?",
  "School Life": "Which everyday detail best captures what school life felt like at the time?",
};

const relationshipQuestions: Record<string, string> = {
  "Current student": "Is this your own experience, or a memory shared with you by someone else?",
  "Former student or alumnus": "How has your perspective on this memory changed since leaving school?",
  "Teacher or former teacher": "What could students see or experience that staff may have understood differently?",
  "Staff or former staff": "What behind-the-scenes context would otherwise be missing from the record?",
  "Parent or guardian": "What did families notice about this event or period?",
  "Community member": "How did the school and wider community connect in this memory?",
  Other: "What perspective or connection are you bringing to this memory?",
};

function addQuestion(questions: GuidanceQuestion[], id: string, prompt: string, reason: string) {
  if (!questions.some((question) => question.id === id)) questions.push({ id, prompt, reason });
}

export function guidanceFingerprint(data: ContributionFormData) {
  return JSON.stringify({
    relationship: data.relationship,
    schoolPeriod: data.schoolPeriod.trim(),
    eventYear: data.eventYear.trim(),
    category: data.category,
    roughMemory: data.roughMemory.trim(),
  });
}

export function generateGuidance(data: ContributionFormData): GuidanceResult {
  const questions: GuidanceQuestion[] = [];
  const memory = data.roughMemory.trim();
  const year = data.eventYear.trim();

  if (!year || uncertaintyPattern.test(year)) {
    addQuestion(questions, "year", "What year or school period was this? If you are unsure, what range feels most accurate?", "A date range helps place the memory without pretending to certainty.");
  }
  if (memory.length < 200) {
    addQuestion(questions, "expand", "What sensory detail, action or brief moment would help someone picture what happened?", "The account is concise and may benefit from one more concrete detail.");
  }
  if (!placePattern.test(memory)) {
    addQuestion(questions, "place", "Where did this happen?", "A place gives the story context.");
  }
  if (!peoplePattern.test(memory)) {
    addQuestion(questions, "people", "Who else was present, and how should they be described without exposing private details?", "The current account does not identify who shared the experience.");
  }
  if (!significancePattern.test(memory)) {
    addQuestion(questions, "significance", "Why does this memory matter to you or the school community?", "Significance helps future readers understand why the memory was preserved.");
    addQuestion(questions, "change", "What, if anything, changed because of the event?", "Outcomes should come from the contributor rather than be inferred by the guide.");
  }
  if (uncertaintyPattern.test(`${year} ${memory}`)) {
    addQuestion(questions, "certainty", "Which details are certain and which are approximate?", "Uncertainty should be visible rather than silently rewritten as fact.");
  }
  if (data.category && categoryQuestions[data.category]) {
    addQuestion(questions, "category", categoryQuestions[data.category], `The selected ${data.category} category shapes the useful context.`);
  }
  if (data.relationship && relationshipQuestions[data.relationship]) {
    addQuestion(questions, "relationship", relationshipQuestions[data.relationship], "The contributor's relationship can reveal a distinct point of view.");
  }
  addQuestion(questions, "verification", "Is there a photograph, document or person who could help verify the account?", "Possible sources support later human moderation; they do not verify the story automatically.");

  return {
    mode: "guided-story-mode",
    questions,
    warning: "Guided Story Mode structures only submitted information and does not verify historical accuracy.",
  };
}

const answerLabels: Record<string, string> = {
  year: "Date context",
  expand: "Additional detail",
  place: "Place",
  people: "People present",
  significance: "Why it matters",
  change: "What changed",
  certainty: "Certainty and approximation",
  category: "Category context",
  relationship: "Contributor perspective",
  verification: "Possible verification source",
};

export function buildSuggestedDraft(data: ContributionFormData, answers: GuidanceAnswerMap) {
  const context = Object.entries(answers)
    .map(([id, value]) => ({ label: answerLabels[id] ?? "Additional context", value: value.trim() }))
    .filter((item) => item.value)
    .map((item) => `- ${item.label}: ${item.value}`);

  const submittedContext = [
    `- Approximate event year or period: ${data.eventYear.trim()}`,
    `- Contributor relationship: ${data.relationship}`,
    `- Story category: ${data.category}`,
    ...context,
  ];

  return [
    data.roughMemory.trim(),
    "Context supplied by the contributor:",
    submittedContext.join("\n"),
    "Editorial note: This draft uses only submitted information. It has not been historically verified and must be reviewed by the contributor and a human moderator.",
  ].join("\n\n");
}
