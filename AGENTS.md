# StoryBridge Legacy agent guide

- Work only in `C:\Projects\AI Projects\StoryBridge Legacy`. Inspect this file and the repository before each major stage. Do not search OneDrive or reuse another project path.
- StoryBridge Legacy is a Forward Ever Foundation Build Week project: a living digital time capsule and alumni-engagement platform that preserves Caribbean school history and turns diaspora relationships into brain circulation, mentorship and opportunity.
- CIC/St. Mary's College is a proposed pilot only. Never claim approval, adoption or endorsement. Use fictional, generic or properly authorised demonstration data and label it clearly.
- MVP stack: Next.js App Router, React, TypeScript, Tailwind CSS, semantic accessible HTML, Vercel-compatible configuration, local seed data and server-only OpenAI integration with a deterministic fallback.
- Required journeys: landing page, legacy timeline, moderated story contribution, GPT-5.6 Story Guide plus fallback, alumni directory, engagement expressions of interest, demo moderation and impact/scale page.
- Out of scope: payments or investments, multi-tenancy, production authentication, private messaging, full matching, large uploads, OCR, native apps, identity verification and production safeguarding infrastructure.
- Preserve contributor voice; never invent history. Label uncertainty, verification status, fictional records and AI/fallback mode. Require human review before submission.
- Protect privacy and young people. Never expose contributor email, secrets, private student/alumni data or unauthorised school material. Do not put API keys client-side.
- Design for mobile first with warm, trustworthy, archive-inspired restraint, accessible contrast, keyboard support, clear hierarchy and explicit loading, empty, error and success states.
- After each stage: run lint, typecheck, tests and production build when appropriate; inspect routes, controls, responsiveness, accessibility, privacy, secrets, wording, console and hydration behavior; fix confirmed issues and retest.
- Keep `README.md`, `CHANGELOG.md`, `BUILD_WEEK_EVIDENCE.md`, acceptance tests and audit records accurate. Never mark untested work as passed.
- Audit before completion. A stage is complete only when its journey works, checks pass, no blocker remains and documentation reflects reality. Do not initialize Git, commit, connect a remote or deploy without the requested stage approval.
- This Next.js version may differ from prior knowledge. Read relevant guidance in `node_modules/next/dist/docs/` before changing framework conventions and heed deprecations.
