# Changelog

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
