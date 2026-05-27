import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { createTestDatabase } from '../src/db.js';

describe('UPI Guardian Mode API', () => {
  it('returns an explainable domain decision', async () => {
    const app = createApp(createTestDatabase());
    const response = await request(app)
      .post('/api/guardian-decisions')
      .set('x-user-role', 'GUARDIAN_OPERATOR')
      .send({
  "amount": 4999,
  "merchantTrust": 0.42,
  "agentConfidence": 0.71,
  "promptInjectionRisk": 0.76,
  "categoryAllowed": false,
  "merchantKnown": false,
  "hour": 23,
  "repeatedWithinMinutes": true,
  "purposeMatch": false
});

    expect(response.status).toBe(200);
    expect(response.body.reasonCodes.length).toBeGreaterThan(0);
    expect(typeof response.body.explanation).toBe('string');
  });

  it('supports CRUD and protects delete through admin RBAC', async () => {
    const app = createApp(createTestDatabase());
    const created = await request(app)
      .post('/api/agent-payment-requests')
      .set('x-user-role', 'GUARDIAN_OPERATOR')
      .send({
  "agentName": "Grocery Copilot",
  "merchantVpa": "unknown-wellness@upi",
  "amount": 4999,
  "purpose": "premium wellness hamper",
  "status": "STEP_UP",
  "riskScore": 82
});

    expect(created.status).toBe(201);
    expect(created.body.id).toBeTruthy();

    const denied = await request(app)
      .delete('/api/agent-payment-requests/' + created.body.id)
      .set('x-user-role', 'GUARDIAN_OPERATOR');
    expect(denied.status).toBe(403);

    const deleted = await request(app)
      .delete('/api/agent-payment-requests/' + created.body.id)
      .set('x-user-role', 'ADMIN');
    expect(deleted.status).toBe(204);
  });
});

