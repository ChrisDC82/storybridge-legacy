# Changelog

## 2026-07-20 — production verification and independent-audit corrections

- Deployment: verified https://storybridge-legacy.vercel.app and recorded the 2026-07-20 live verification of primary routes, Legacy interactions, contribution/guidance/persistence, moderation/preview, Alumni, engagement, Impact, Story Guide GET, responsive behaviour and browser console.
- Accessibility fix: connected every visible contribution validation error to its control with stable IDs, conditional `aria-invalid` and helper-preserving `aria-describedby`; included final-draft review and consent checkboxes without changing validation rules.
- Metadata fix: changed the route title to `Contribute a Story` so the root template appends the site name once.
- Tests: added coverage for invalid/valid ARIA states, helper/error descriptions, checkbox error IDs and contribution metadata; lint and TypeScript passed, 35/35 tests passed, and the 33-page production build passed.
- Focused QA: verified required/email/year/final-draft/review/consent errors, guided submission, admin approval and preview, exact title, 375px/1280px overflow, 0 console or hydration errors, local-record cleanup, a 0-match secret scan, and the unchanged 2-moderate PostCSS audit result.
- Retained limitations: browser-local storage, deterministic guidance, no production authentication/database/email/transactions/runtime OpenAI, and the documented Next.js-pinned PostCSS advisories.

## 2026-07-18 — Stages 10–11: final audit and deployment readiness

- Final documentation: completed the README overview, inspiration, journeys, architecture, setup, deterministic-guidance explanation, Codex/GPT-5.6 evidence, human decisions, safeguards, moderation, Vercel instructions, limitations and roadmap; consolidated acceptance, audit, demo and agent guidance.
- Final audit: all 29 public/detail page routes and the Story Guide API were reviewed; the complete fictional user journey passed; 35 page/width checks covered 320px, 375px, 768px, 1024px and 1280px; console, hydration, privacy, accuracy, accessibility, fundraising, investment and storage boundaries passed.
- Final fixes: removed obsolete “Stage 7” wording from current UI/API responses and corrected the agent guide so it no longer implies a runtime GPT-5.6 Story Guide.
- Automated verification: lint and TypeScript passed; 33/33 tests passed; the Next.js 16.2.10 production build generated 33 pages; the project-wide credential-pattern scan found no matches.
- Dependency review: 2 moderate, 0 high and 0 critical findings remain at `next@16.2.10 → postcss@8.4.31`. Latest stable Next.js pins the same version and npm offers only an incompatible downgrade, so no forced fix was applied.
- Deployment at this stage: repository preparation passed; production deployment was completed and verified later on 2026-07-20.
- Known limitations: browser-local storage; deterministic rather than runtime OpenAI guidance; no production authentication, database, email, real verification, transactions or production safeguarding.

## 2026-07-18 — Stage 9: demonstration moderation and impact roadmap

- Features added: browser-local Demonstration Admin Dashboard; truthful moderation summary; accessible story review; reversible Pending review, Approved, More information requested and Rejected states; required notes for requests/rejections; timestamps and retained history; local-only approved archive preview; independent moderation and story resets; and an eight-section Impact narrative with a four-stage roadmap.
- Safeguards added: contact emails remain hidden, no email or publication is implied, story deletion does not touch engagement-interest storage, and impact copy states that the pilot, rollout, funding, sustainability and investment concepts are proposals rather than commitments.
- Issues fixed during verification: normalized Stage 7 records for the expanded moderation model; changed a runtime type import to a Node-compatible relative import; corrected two overly broad test assertions. No browser UI, console, hydration or responsive-layout defects were confirmed.
- Verification: lint, TypeScript, 33 automated tests and a 33-page production build passed. Browser QA covered empty and populated moderation states, note validation, all transitions, refresh persistence, history, preview, both resets, cross-storage isolation, mobile navigation, focusability and 375px/768px/1280px layouts.
- Dependency audit: 2 moderate, 0 high and 0 critical findings remain in Next.js’s pinned PostCSS build dependency; npm proposes only an incompatible major downgrade, so no forced fix was applied.
- Known limitations: demonstration-only local storage, no production authentication, database, email, public archive publication, verified institutional adoption, fundraising transaction, investment transaction or deployment.

## 2026-07-18 — Stage 8: alumni directory and engagement pathways

- Features added: 12 fictional alumni profiles; seven directory search/filter dimensions; active-filter and results feedback; reset and no-results states; 12 statically generated accessible profile pages; four engagement pathway groups; validated expression-of-interest form; separate local persistence, private contact storage, public-safe confirmation and reset.
- Safeguards added: fictional-profile labels, equal local/diaspora positioning, no-guarantee language, no contact buttons for fictional people, private email treatment, consent, and explicit fundraising, philanthropy, investment and minor-safeguarding boundaries.
- Issues fixed: ordered graduation-period choices from newest to oldest and expanded the shared footer notice to cover fictional alumni profiles.
- Verification: lint, TypeScript, 23 automated tests and a 33-page production build passed; browser QA covered all filters, combined/reset/empty states, profile navigation, complete form validation/submission, persistence/reset, mobile menu, three responsive widths, overflow, console and hydration behavior.
- Dependency audit: 2 moderate, 0 high and 0 critical findings remain in Next.js’s pinned PostCSS build dependency; npm proposes only an incompatible major downgrade, so no forced fix was applied.
- Known limitations: all profiles and offers are fictional; interest records are browser-local; there is no matching, messaging, email, server persistence, authentication, payment, donation, investment transaction or real verification.

## 2026-07-18 — Stage 7: story contribution and guided drafting

- Features added: accessible four-step contribution wizard; field, draft and consent validation; deterministic context-sensitive questions; skippable and refreshable Guided Story Mode; contributor-editable suggested draft; local submission ID, timestamp and “Pending review” status; browser-local persistence and reset; safe GET/POST fallback API behavior without an OpenAI key.
- Safeguards added: fictional-data and proposed-pilot notices, no-endorsement wording, no-sensitive-data warning, private contact-email treatment, explicit consent, human-moderation status and guidance that never claims verification or adds unsupported history.
- Issues fixed: replaced the contribution placeholder, corrected a synchronous state update flagged by React linting, and removed a nested `<main>` landmark found during browser QA.
- Verification: lint, TypeScript, 14 automated tests and production build passed; interactive browser QA covered validation, edits, back/forward movement, refresh, skip and guided paths, consent, local persistence/reset, responsive overflow, console and hydration behavior.
- Dependency audit: two moderate advisories remain in Next.js’s pinned PostCSS build-tool dependency; npm proposes only an incompatible major downgrade, so no forced fix was applied.
- Known limitations: storage and moderation status are local demonstration behavior; the guide is deterministic and no OpenAI request, server persistence, upload, email or full moderation feature is implemented.

## 2026-07-18 — Stage 6: landing page and Legacy Timeline

- Features added: polished public landing page; refined navigation and footer; approved local logo; ten fictional timeline records covering all seven required categories; deterministic search, category and decade filters; active-filter and result feedback; reset and no-results states; statically generated record-detail pages.
- Safeguards added: explicit fictional-data labels on every record, proposed-pilot and no-endorsement notices, human-review and privacy messaging, and no remote imagery or real historical claims.
- Bugs fixed: corrected dynamic-route typing, explicit spacing in inline trust notices and the Next.js smooth-scroll route-transition warning.
- Tests completed: lint, type checking, 8 automated tests and production build passed; desktop/mobile browser QA covered navigation, logo rendering, filtering, search, combined filters, empty/reset states, record details, overflow, console and hydration behavior.
- Known limitations: contribution, AI Story Guide, alumni, engagement and moderation functionality remain out of scope for this stage; all timeline content is fictional demonstration data.
- Deployment changes: none.

## 2026-07-18 — Repository initialization

- Repository changes: Replaced the invalid empty Git metadata with a valid repository on `main`, connected `origin` to the public `storybridge-legacy` repository and pushed the verified scaffold.
- Safeguards: Expanded `.gitignore` coverage for populated environment files, build output, operating-system clutter and editor temporary files; confirmed `.env.example` remains tracked.
- Verification: Reviewed all 35 first-commit files and completed a clean pre-stage secret scan.
- Application changes: None.

## 2026-07-18 — Stage 3: initial scaffold

- Features added: Next.js App Router scaffold; shared responsive navigation, pilot notice and footer; requested page and API route placeholders; initial documentation and route tests.
- Bugs fixed: ensured `.env.example` is not excluded by the environment-file ignore rule; synchronized the package and lockfile project name; replaced starter metadata and remote font loading.
- Tests completed: ESLint passed; TypeScript passed; 3/3 scaffold tests passed; production build passed; all requested routes responded; responsive navigation, desktop/mobile overflow, browser console and hydration behavior were inspected.
- Known limitations: product features, persistence, OpenAI integration, fallback guidance, moderation actions and production authentication are not implemented. The initial npm install reported two moderate dependency advisories; no forced dependency changes were applied during the scaffold stage.
- Deployment changes: none; project remains local and Git is not initialized.
