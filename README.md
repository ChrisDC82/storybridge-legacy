# StoryBridge Legacy

**Preserving our stories. Reconnecting our people. Building opportunities across generations.**

StoryBridge Legacy is a living digital time capsule and alumni-engagement concept for Caribbean educational institutions, developed for the Forward Ever Foundation as an OpenAI Build Week project.

## Current verified release

Stage 8 includes:

- a polished landing page and searchable Legacy Timeline with ten fictional records;
- an accessible four-step story-contribution wizard and deterministic Guided Story Mode;
- a filterable Alumni Directory with 12 fictional profiles and statically generated detail routes;
- text, industry, country, graduation-period, expertise, support-type and availability filtering;
- four engagement pathways covering knowledge, access, institutional support and future enterprise;
- a validated expression-of-interest form with private browser-local persistence, local IDs, timestamps, “Interest received” status and reset controls; and
- explicit privacy, human-review, fundraising and responsible-investment boundaries.

Admin moderation, production authentication and final Impact-page refinement remain later-stage work.

## Fictional profile policy

Every competition profile and story is fictional demonstration data. Profiles do not represent real CIC alumni, employers, awards, availability or professional claims. Initials-based placeholders avoid remote imagery and unlicensed headshots.

CIC/St. Mary’s College is a proposed pilot only; no approval, adoption, partnership or endorsement is claimed.

## Brain drain to brain circulation

Skilled migration can weaken direct institutional connections, but migration is not betrayal and overseas alumni are not inherently more valuable than local alumni. StoryBridge Legacy demonstrates how knowledge, relationships and opportunity can circulate across borders through mentorship, career guidance, programme support, fundraising readiness, international introductions and responsible enterprise conversations.

Nothing in the demonstration guarantees mentorship, placements, scholarships, funding, donations, introductions or investment.

## Local persistence and privacy

Story contributions and engagement interests use separate `localStorage` keys. They remain only in the current browser and can be reset independently. Contact email is retained privately in the local record but omitted from public-safe confirmations. Nothing is emailed, uploaded, published or transmitted externally.

Do not enter real or sensitive personal information.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, ESLint and Vercel-compatible route handlers. Stage 8 added no dependency.

## Local setup

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

The current deterministic Story Guide requires no environment variables. `.env.example` contains empty server-only placeholders for a separately approved future integration:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Optional future server-only key; never expose it client-side |
| `OPENAI_STORY_MODEL` | Optional future server-side Story Guide model |

No OpenAI request is made by the current application.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Manual results are recorded in `ACCEPTANCE_TEST.md` and `AUDIT_REPORT.md`.

## How Codex and GPT-5.6 were used

Codex supported architecture, implementation, tests, browser QA, audit repair and documentation. The user interface reported **GPT-5.6 Sol, Medium reasoning, Standard speed**; runtime metadata did not independently expose the exact variant. The development-session model is distinct from the application’s deterministic Guided Story Mode.

## Fundraising and investment boundaries

The product may explain how alumni reconnection can create foundations for scholarships, programme sponsorship, equipment support, diaspora philanthropy, fundraising and future responsible investment introductions. It does not collect money, present financial products, promise returns, claim investors or partners, or present investment opportunities to minors.

## MVP limitations

There is no server database, production authentication, real alumni verification, automated matching, private messaging, email delivery, payment or donation collection, investment transaction, media upload, multi-school tenancy, OCR or native app. Local data is browser-specific and can be cleared by the user or browser.

## Deployment

The application is designed for Vercel, but deployment remains outside Stage 8.

## Licence

MIT. See `LICENSE`.
