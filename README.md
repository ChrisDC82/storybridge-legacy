# StoryBridge Legacy

**Preserving our stories. Reconnecting our people. Building opportunities across generations.**

StoryBridge Legacy is a Forward Ever Foundation Build Week MVP: a living digital time capsule and alumni-engagement concept for Caribbean educational institutions. It demonstrates how carefully preserved institutional memory can renew relationships among students, educators, local alumni and the global diaspora.

## Inspiration and problem

School history is often scattered across boxes, yearbooks, social platforms and private memories. Alumni relationships can also weaken across geography and generations, limiting access to mentorship, professional knowledge and wider networks. Technology cannot solve these structural challenges by itself, but it can help communities organise stories, consent and connection around responsible human relationships.

## From brain drain to brain circulation

Migration is not betrayal, and overseas experience is not more valuable than local knowledge. StoryBridge Legacy treats local and diaspora alumni as equally important participants in a two-way exchange of expertise, mentorship, introductions and support. Nothing in the MVP guarantees placements, scholarships, funding, donations, partnerships or investment outcomes.

## Core MVP features

- Public landing page with approved StoryBridge Legacy branding
- Searchable, filterable Legacy Timeline with ten fictional records and detail pages
- Four-step story contribution with validation, consent and contributor-controlled editing
- Deterministic, optional and skippable Guided Story Mode
- Browser-local submissions beginning at `Pending review`
- Alumni Directory with 12 fictional profiles, seven filter dimensions and detail pages
- Engagement Opportunities form with separate browser-local storage
- Demonstration Admin Dashboard with four reversible moderation states, notes, timestamps and history
- Local-only approved archive preview
- Impact and Scale narrative, proposal roadmap, sustainability options and safeguards
- Automated tests, acceptance evidence, audit history and demo instructions

## Complete user journeys

1. Explore the Legacy Timeline, combine search/category/decade filters, open a fictional detail record and reset the filters.
2. Enter a fictional memory, optionally answer guided questions, edit the suggested draft, confirm contributor review and consent, then save it locally for moderation.
3. Open the Demonstration Admin Dashboard, compare the original and final drafts, request information, return to pending, approve or reject, and inspect retained history and the local-only approved preview.
4. Search the fictional Alumni Directory by profession, location, graduation period, expertise, support type and availability, then open a profile.
5. Explore engagement pathways and save a fictional expression of interest locally; its contact email remains private.
6. Finish on Impact and Scale to review brain circulation, future roadmap, sustainability possibilities and governance safeguards.

## Technology stack

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4 and project CSS
- Semantic accessible HTML
- Node’s built-in test runner
- ESLint
- Vercel-compatible configuration
- Browser `localStorage` for explicitly local demonstration records

No database, production authentication, payment service, email service or runtime OpenAI dependency is required.

## Project architecture

```text
src/app/                 App Router pages, layout, styling and Story Guide route
src/components/          Timeline, contribution, directory, engagement and admin UI
src/data/                Fictional timeline and alumni seed records
src/lib/                 Filtering, validation, guidance, storage and moderation logic
src/types/               Shared TypeScript domain models
tests/                   Automated route, data, validation, storage and moderation tests
public/branding/         Approved StoryBridge Legacy logo
```

Story and engagement records use separate storage keys. Browser access occurs only inside client components or storage functions invoked by those components.

## Local setup

Requirements: Node.js 20.9 or later and npm.

```bash
git clone https://github.com/ChrisDC82/storybridge-legacy.git
cd storybridge-legacy
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Development and testing commands

```bash
npm run dev        # local development server
npm run lint       # ESLint
npm run typecheck  # TypeScript without emitting files
npm test           # all automated tests
npm run build      # production build
npm start          # serve a completed production build
```

## Environment variables

The MVP requires no environment variables. `.env.example` contains empty placeholders for a separately approved future server-side integration:

| Variable | Current requirement | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | Not required | Optional future server-only credential; never expose client-side |
| `OPENAI_STORY_MODEL` | Not required | Optional future server-side model selection |

Do not add a real key to the repository. Populated `.env*` files are ignored while `.env.example` remains tracked.

## Guided Story Mode and future OpenAI integration

The MVP uses deterministic Guided Story Mode. It asks context-sensitive questions and creates a suggested draft only from contributor-supplied information. It is an editing aid, not a fact checker; contributors may skip it and must review the final draft.

The isolated `/api/story-guide` route is a future server-side integration point, but currently returns deterministic guidance and requires no API key. A future OpenAI integration would need separate approval, server-only secrets, human review and the existing deterministic fallback. Do not claim that runtime GPT-5.6 is active.

## How Codex and GPT-5.6 were used

The Codex user interface reported **GPT-5.6 Sol, Medium reasoning, Standard speed**. GPT-5.6 was used through Codex for architecture, implementation, testing, repair, auditing and documentation. Runtime metadata did not independently expose the exact model variant. This development-session model is distinct from the application’s deterministic Guided Story Mode.

## Key human decisions

- Forward Ever Foundation owns the project direction.
- CIC/St. Mary’s College is only the proposed pilot.
- Competition stories and profiles use fictional demonstration data.
- Local and diaspora alumni are positioned as equally important.
- Contributor voice, consent, uncertainty and human moderation take priority over automation.
- The MVP stays browser-local and avoids production infrastructure that cannot be responsibly demonstrated during Build Week.

## Trust, accuracy and privacy

Every competition story and alumni profile is fictional and labelled. No record claims real CIC history, real alumni, employers, awards, availability or institutional participation. CIC/St. Mary’s College has not formally approved, adopted or endorsed this MVP.

Guided Story Mode does not verify history or invent unsupported facts. Contributors review their drafts, uncertainty remains visible, and a human moderator must review any record before possible future publication. Approval in the dashboard creates only a browser-local preview; it does not publish to the Legacy Timeline.

Contact emails are retained only inside the corresponding private browser-local record and are omitted from public-safe summaries and the moderation interface. No contributor or engagement data is emailed, uploaded or transmitted externally. Local records are device/browser-specific, can be cleared by the browser and are not suitable for real or sensitive information.

## Moderation model

Submissions support `Pending review`, `Approved`, `More information requested` and `Rejected`. Information requests and rejections require notes. Every transition records a timestamp and history entry, and actions remain reversible. Moderation-state reset preserves stories; story deletion does not alter the separate engagement-interest storage.

The dashboard is explicitly a demonstration and has no production authentication or security claim.

## Deployment

The repository is prepared for Vercel import and does not require environment variables, a database or server secrets.

1. Sign in to Vercel and choose **Add New → Project**.
2. Import `ChrisDC82/storybridge-legacy` from GitHub.
3. Confirm **Next.js** is detected and leave the root directory as the repository root.
4. Leave environment variables empty for the MVP.
5. Select **Deploy**.
6. After deployment, verify every route, all static detail paths, `/api/story-guide`, branding, browser-local persistence, console output and responsive behaviour.
7. Record the real production URL in `BUILD_WEEK_EVIDENCE.md` only after successful verification.

Deployment has not yet been performed or claimed.

## Known MVP limitations

- Browser-local, device-specific storage rather than a durable database
- No production authentication, roles or institutional administration
- No real alumni or historical verification workflow
- No outbound email, messaging, automated matching or media upload
- No payment, donation, fundraising transaction, financial product or investment transaction
- No production safeguarding infrastructure, multi-school tenancy, OCR or native app
- Deterministic guidance rather than runtime OpenAI generation
- Deployment and independent secondary-thread audit remain pending

## Post-competition roadmap

Subject to evidence, permission, safeguarding and resources: validate a proposed institutional pilot; design production governance and role-based access; introduce durable storage and verified moderation; evaluate an optional server-side OpenAI integration; test a Trinidad and Tobago rollout; then consider Caribbean and global diaspora participation. These are proposals, not commitments.

## Build Week evidence summary

The project was created on 2026-07-18 and developed through bounded, human-approved stages covering scaffold, repository setup, landing/timeline, contribution/guidance, alumni/engagement, moderation/impact and final readiness. Each feature stage includes commit, automated-test, browser-QA, secret-scan and audit evidence in `BUILD_WEEK_EVIDENCE.md`, `CHANGELOG.md`, `ACCEPTANCE_TEST.md` and `AUDIT_REPORT.md`. Deployment URL, demo video, `/feedback` Session ID and final submission date remain explicit placeholders until those events occur.

## Licence

MIT. See `LICENSE`.
