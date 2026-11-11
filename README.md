# LN Practice Lab

Independent, static, LN-inspired ERP support analyst training. No real Infor software, database, MES, credentials, or backend. All data and validation results are hardcoded fixtures.

## Two-day path

Day 1: session/table mapping, manufacturing handoff investigation, authorization triage, bounded SQL diagnostics, and blocked inventory.

Day 2: MES message tracing, BI freshness reconciliation, supported customization choices, UAT/change control, and L3 escalation. Finish with five interview questions and structured self-review guidance.

Select a case, read its brief and evidence, select a record, enter your diagnosis, and run each action. Wrong choices receive feedback. Guided mode shows the checklist; Challenge mode hides it. Progress and interview answers stay in localStorage in the current browser/origin. Reset affects one case. Export downloads a JSON record for personal notes. Clearing browser data loses saved progress. Free-text handoff validation checks length only; interview feedback is a self-review rubric, not AI evaluation.

## Run

Open index.html directly, or run `python -m http.server 4173` in this directory and browse to http://localhost:4173. No dependencies or build required. Fonts optionally load from Google Fonts with system fallbacks.

## Verify

Run `node test.cjs`. The test exercises all ten case completion flows, invalid answers, record selection, SQL guards, and major view rendering with a DOM stub; it does not replace visual browser QA.

## GitHub Pages

Publish `main` from the repository root using GitHub Pages branch deployment. Relative assets support project subpaths. `.nojekyll` disables Jekyll processing. No secrets or server configuration required.

## Accuracy limits

This is practice reasoning, not a replica of an installed LN client or an official certification. Real sessions, tables, enum values, authorizations, interface contracts, hooks and deployment methods depend on LN version and company configuration. The SQL activity accepts one SQL Server fixture query; it is not a SQL interpreter. MES XML is a fictional plant contract, not an Infor BOD schema. Actions affect independent per-case snapshots; they do not post shared operational ledgers.

Primary Infor documentation links are in the in-app Field guide & sources. In particular, the extension `tx` package does not use VRC derivation inheritance. Do not treat classic VRC concepts as equivalent to Git branches. Describe this work honestly as simulation practice when interviewing.
