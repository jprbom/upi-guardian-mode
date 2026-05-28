<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=240&color=gradient&text=UPI%20Guardian%20Mode&fontAlign=50&fontAlignY=38&fontSize=46&fontColor=ffffff&desc=AI%20consent%20firewall%20for%20agentic%20UPI%20payments&descAlign=50&descAlignY=60&descSize=16&animation=fadeIn" width="100%" alt="UPI Guardian Mode animated hero banner"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=22&duration=2600&pause=900&center=true&vCenter=true&width=900&lines=Investor+Showcase+%7C+No+Proprietary+Source+Code;Agentic+Payments+Need+Bounded+Authority;Consent+Firewall+for+AI-led+Commerce" alt="animated project narrative"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Showcase-Concept%20Repository-0f172a?style=for-the-badge">
  <img src="https://img.shields.io/badge/Domain-Agentic%20Payments%20%7C%20Consent%20%7C%20UPI-2563eb?style=for-the-badge">
  <img src="https://img.shields.io/badge/Code-Not%20Exposed-991b1b?style=for-the-badge">
</p>

# UPI Guardian Mode

**AI consent firewall for agentic UPI payments.**

This repository is a public concept showcase. It explains the product thesis, safety model, payment-governance logic, AI/ML role and investor-facing roadmap. It does not expose proprietary source code, policy rules, prompts, scoring weights, credentials, payment simulation internals or production integrations.

---

## Why this matters

AI agents will increasingly act on behalf of users in commerce, bill payment, subscription, travel, shopping and merchant interactions. Instant payments create value, but agentic payments also create new risk: prompt injection, merchant substitution, amount escalation, hidden recurrence and consent ambiguity.

The problem is not just authentication. The problem is **bounded payment authority**.

## Product thesis

UPI Guardian Mode acts as a payment authority firewall between the user, AI agent, merchant and simulated UPI flow. It checks intent, consent boundary, amount, merchant trust, recurrence, context and risk before deciding whether a payment can proceed, pause, step up or block.

---

## Concept flow

```mermaid
flowchart LR
  A[User intent] --> B[AI agent payment request]
  B --> C[Consent boundary check]
  C --> D[Merchant and amount risk]
  D --> E[Step-up / allow / block]
  E --> F[Audit trail and user control]
```

## Investor-grade capability map

| Layer | Capability | Value |
|---|---|---|
| Market | Agentic payment safety | Emerging AI-commerce infrastructure need |
| Product | Consent-first payment control | Reduces unauthorised or misunderstood payments |
| AI/ML | Risk assessment and prompt-injection defence | Protects against adversarial agent behaviour |
| Platform | Policy API for payment agents | Can plug into apps, PSPs and commerce flows |
| Governance | Human-in-loop and audit readiness | Responsible AI posture for payment use cases |

---

## What visitors should understand in 60 seconds

- Agentic commerce needs a payment-control layer before money moves.
- Consent must be explicit, bounded, revocable and context-aware.
- The product is a safety layer, not a replacement for UPI apps or banks.
- Synthetic events can validate the model before any real payment integration.
- Proprietary guardrail logic and risk scoring are intentionally not public.

## Success metrics

| Metric | Why it matters |
|---|---|
| Unauthorised action prevention | Trust and safety value |
| Step-up accuracy | User experience balance |
| User override behaviour | Product tuning and adoption |
| Agent action auditability | Governance and compliance signal |

## Validation scenarios

- Agent tries to pay a different merchant than requested
- Amount increases after user approval
- Recurring mandate hidden in a one-time payment
- Merchant risk signal changes before payment
- Prompt-injection attempt manipulates payment intent
- User-defined family or spend limit gets triggered

## Positioning

UPI Guardian Mode sits at the intersection of UPI, AI agents, consent infrastructure, responsible AI and trust-by-design digital payments.

**Owner:** [Prashant Jagtap](https://github.com/jprbom)  
**Repository type:** Public showcase, proprietary concept
