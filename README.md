# StoryBridge Legacy

**Preserving our stories. Reconnecting our people. Building opportunities across generations.**

StoryBridge Legacy is a living digital time capsule and alumni-engagement concept for Caribbean educational institutions, developed for the Forward Ever Foundation as an OpenAI Build Week project.

## Current verified release

Stage 7 includes a polished landing page; a searchable Legacy Timeline with ten fictional records and static detail pages; an accessible four-step story-contribution wizard; optional deterministic Guided Story Mode with contributor-controlled editing and skip controls; explicit consent and “Pending review” status; browser-local demonstration persistence and reset; and a Vercel-compatible `/api/story-guide` fallback that works without an API key.

Alumni, engagement and admin moderation features remain placeholders and were not built in Stage 7.

## Safeguards

The competition version uses fictional demonstration data. CIC/St. Mary’s College is a proposed pilot only; no approval, adoption or endorsement is claimed. Guided Story Mode never verifies history or invents missing facts, and all real contributions would require consent and human moderation. Contact email is never displayed in the public-facing submission summary.

Stage 7 stores demonstration submissions only in the current browser’s `localStorage`. Nothing is published, emailed or uploaded. Do not enter sensitive or real personal information.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, ESLint and Vercel-compatible route handlers. No Stage 7 dependency was added.

## Local setup

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

The deterministic Stage 7 guide requires no environment variables. `.env.example` contains empty, server-only placeholders for a separately approved future integration:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Optional future server-only key; never expose it client-side |
| `OPENAI_STORY_MODEL` | Optional future server-side Story Guide model |

No OpenAI request is made by the Stage 7 application.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Manual results are recorded in `ACCEPTANCE_TEST.md` and `AUDIT_REPORT.md`.

## How Codex and GPT-5.6 were used

Codex supported implementation, testing, browser QA, audit repair and documentation. The user interface reported **GPT-5.6 Sol, Medium reasoning, Standard speed**; runtime metadata did not independently expose the exact variant. This Build Week development-session model is distinct from the application’s deterministic Guided Story Mode, which makes no OpenAI API call in Stage 7.

## MVP limitations

There is no server database, production authentication, production moderation workflow, email delivery, media upload, OpenAI runtime integration, payment or investment flow, multi-school tenancy, private messaging, full matching, OCR or native app. Local data is browser-specific and can be cleared by the user or browser.

## Deployment

The application is designed for Vercel, but deployment is outside Stage 7.

## Licence

MIT. See `LICENSE`.
