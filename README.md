# StoryBridge Legacy

**Preserving our stories. Reconnecting our people. Building opportunities across generations.**

StoryBridge Legacy is a living digital time capsule and alumni-engagement platform for Caribbean educational institutions. It is being developed for the Forward Ever Foundation as an OpenAI Build Week project.

## The problem

Institutional memories can disappear while alumni expertise becomes disconnected through migration. Schools then lose stories, relationships, mentorship capacity and pathways to wider opportunity.

## The solution

The platform will preserve moderated stories, reconnect alumni, surface expertise and create pathways for mentorship, fundraising, internships, international introductions and future responsible entrepreneurship support.

## Brain Drain to Brain Circulation

Migration does not have to mean permanent disconnection. Alumni abroad can keep knowledge, networks and support circulating between their adopted homes and the communities that helped shape them.

## Features

The verified Stage 6 release includes a polished public landing page and a functional Legacy Timeline with ten fictional demonstration records, text search, category and decade filters, active-filter feedback, reset and no-results states, and statically generated detail pages. Story contribution, the AI Story Guide, alumni functionality, engagement workflows and moderation actions remain clearly labelled placeholders for later stages.

The approved StoryBridge Legacy logo is stored unchanged at `public/branding/storybridge-legacy-logo.png` and used responsively without remote image dependencies.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, ESLint and a Vercel-compatible server architecture. The later Story Guide will call OpenAI only from a server route and will include a deterministic fallback.

## Local setup

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` only when implementing the server-side Story Guide. Never commit `.env.local`.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Optional server-only key; leave empty to use fallback mode |
| `OPENAI_MODEL` | Server-side model name, planned for GPT-5.6 access |

## Sample data

The competition version uses fictional demonstration data. CIC/St. Mary's College is a proposed pilot only; no approval, adoption or endorsement is claimed.

## Testing

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Manual acceptance status is tracked in `ACCEPTANCE_TEST.md`.

## How Codex was used

Codex supports architecture, implementation, testing, audits, repairs and documentation under staged human approval.

## How GPT-5.6 is used

The planned Story Guide will ask contextual questions, identify missing details and suggest a polished version without inventing facts. The user interface reports GPT-5.6 Sol with Medium reasoning and Standard speed for the Build Week session; runtime metadata did not expose the exact variant. The API integration is not implemented in this scaffold.

## Key human product decisions

The Forward Ever Foundation owns the product direction. Human decisions include a local-first Git workflow, fictional MVP data, the proposed pilot framing, mandatory moderation, explicit privacy safeguards and the focus on brain circulation.

## Historical accuracy principles

Stories must retain contributor voice, distinguish memory from verified fact, label uncertainty and show verification status. No real historical claim should be published without authorisation and review.

## Privacy principles

Do not publish contributor email addresses, private student or alumni information, secrets or unauthorised media. Human review and consent are required before publication.

## MVP limitations

No payments, investment transactions, multi-school tenancy, production authentication, private messaging, full matching, large uploads, OCR, native app or complete safeguarding infrastructure.

## Deployment

The application is designed for Vercel. Deployment will be documented and performed only in an approved later stage after local verification and repository setup.

## Post-competition roadmap

Potential work includes an authorised pilot, stronger authentication and safeguarding, multi-institution support, deeper mentorship workflows, richer archives and responsible partnership pathways.

## Licence

MIT. See `LICENSE`.
