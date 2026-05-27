<p align="center">
  <img src="frontend/public/logo.svg" width="96" alt="UPI Guardian Mode logo">
</p>

# UPI Guardian Mode

AI consent firewall for agentic UPI payments.

Author: Prashant Jagtap <jprbom@gmail.com>

## Portfolio Positioning

A governance layer that evaluates AI-agent payment requests against user consent policies, merchant trust, prompt-injection risk, unusual timing, and bounded authority before simulated UPI money movement.

All payment, receipt, merchant, policy, and behavioral records are synthetic. The app does not connect to NPCI, banks, PSPs, UPI rails, account aggregators, or real user accounts.

## Highlights

- TypeScript Express backend with RBAC, Helmet, CORS controls, rate limiting, Zod validation, and JSON persistence.
- React and Vite frontend with role-aware operations dashboard, animated KPI panels, CRUD controls, and explanation surface.
- Domain endpoint at /api/guardian-decisions.
- CRUD for Agent Payment Requests and Consent Policies.
- Mermaid diagrams for architecture, DFD, deployment, integration, API flow, and RBAC.

## Run Locally

~~~bash
npm install
npm run dev:backend
npm run dev:frontend
~~~

Backend: http://127.0.0.1:4104

Frontend: http://127.0.0.1:5174

## Verify

~~~bash
npm run build
npm run test
npm run audit:high
~~~

## Repo Name

upi-guardian-mode

