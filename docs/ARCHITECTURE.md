# Architecture

UPI Guardian Mode uses a split React and Express architecture with a public-safe payment ecosystem simulator for agentic payment consent workflows.

## Components

- React dashboard: RBAC role switcher, KPI cards, command panels, tables, CRUD actions, consent review, and Payment Ecosystem Timeline.
- Express API: health, metrics, CRUD, guardian decisioning, signed demo auth, payment lifecycle, webhooks, refund, dispute, and reconciliation endpoints.
- RBAC middleware: signed local demo bearer tokens and role-to-permission mapping.
- JSON persistence: deterministic synthetic DB file for local demos.
- Domain engine: merchant trust, prompt-injection risk, agent authority, purpose match, and step-up reason-code simulator.
- Payment ecosystem simulator: PG, PA, TPAP, PSP/bank, and NPCI-style rail adapters with agent consent and step-up hooks.
- AIML/DL artifacts: 10,000-row synthetic training harness with model card, metrics, and feature importance.

## Runtime Ports

- Backend: 4104
- Frontend dev server: 5174
- Frontend preview server: 5104

