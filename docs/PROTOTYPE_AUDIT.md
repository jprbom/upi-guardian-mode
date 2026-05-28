# Prototype Audit Response

## Latest Audit Closure

The latest implementation adds signed demo-token RBAC, a five-adapter payment ecosystem simulator, HMAC webhook signing, duplicate and out-of-order webhook handling, refund/dispute/reconciliation APIs, a frontend Payment Ecosystem Timeline, 10,000-row synthetic AIML/DL artifacts, and expanded enterprise documentation.

## Honest Status

UPI Guardian Mode is a runnable portfolio-grade prototype, not a production agentic-payment firewall. It demonstrates consent-policy decisioning, synthetic CRUD workflows, RBAC simulation, a mocked UPI/NPCI response, tests, CI, Docker packaging, and SDLC documentation.

It should be presented as: **an AI-agent payment consent governance prototype using synthetic UPI payment intents.**

It should not be presented as: **a real signed consent-control layer or bank/PSP authorization gateway.**

## What Is Real Today

- React dashboard with working tabs, CTAs, drill-downs, CRUD, and RBAC role selection.
- Express API with Zod validation, Helmet, rate limiting, CORS, and permission middleware.
- Domain endpoint for agentic-payment risk decisions with reason codes and plain-language explanation.
- Mock NPCI/UPI rail returning RRN, UPI request id, bank reference, response code, settlement state, risk decision, reason codes, and callback metadata.
- Local JSON persistence for demo review.
- Backend tests, frontend helper tests, local browser E2E smoke script, Docker files, and CI verify workflow.
- Python ML/DL training demonstration that creates a model-card artifact from synthetic data.

## Prototype Boundaries

- RBAC remains a simulator, but it now uses signed local demo bearer tokens and ignores forged `x-user-role`; production would still require OIDC/JWT, signed sessions, tenant isolation, KMS-backed secrets, and immutable audit logs.
- Current guardian logic accepts precomputed risk fields; it does not yet parse free-form agent prompts or enforce signed consent authority.
- The ML script now generates 10,000 synthetic rows with train/test metrics, confusion matrix, model card, and feature importance. It remains synthetic and not statistically valid production prompt-risk or consent-abuse model training.
- Persistence is JSON file storage, not an immutable consent ledger or delegated-authority store.
- The payment ecosystem simulator is fully mocked and does not connect to PSP apps, banks, Reserve Pay, mandates, UPI intent signing, or real step-up authentication.

## Serious Upgrade Path

- Add consent objects with max amount, merchant category, merchant whitelist, expiry, frequency cap, and purpose binding.
- Add prompt scanner for merchant substitution, hidden recipient changes, urgency coercion, vague product descriptions, and prompt injection.
- Add signed approval-token simulation, replay protection, duplicate-payment protection, and human review queue.
- Add scenario tests for trusted groceries, unknown wellness merchant, hidden subscription, repeated payment, and late-night step-up.
- Add privacy-preserving family/delegated-payment workflows with full audit explanations.
