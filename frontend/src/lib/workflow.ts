export type MockScenario = 'HAPPY_PATH' | 'DEGRADED_BANK' | 'BANK_TIMEOUT' | 'RISK_HOLD' | 'STEP_UP';

export type WorkflowTab = {
  id: string;
  label: string;
  description: string;
  cta: string;
  drillDown: string;
  apiFlow: string;
  mockScenario: MockScenario;
};

export const workflowTabs: WorkflowTab[] = [
  {
    "id": "overview",
    "label": "Guardian Console",
    "description": "Agentic payment governance with bounded authority.",
    "cta": "Open Consent Firewall",
    "drillDown": "View active risk, policy, and request queue.",
    "apiFlow": "GET /metrics -> consent safety KPIs",
    "mockScenario": "STEP_UP"
  },
  {
    "id": "requests",
    "label": "Agent Requests",
    "description": "AI-agent payment attempts and decision outcomes.",
    "cta": "Create Agent Request",
    "drillDown": "Open request drill-down and review action.",
    "apiFlow": "CRUD /agent-payment-requests",
    "mockScenario": "STEP_UP"
  },
  {
    "id": "policies",
    "label": "Consent Policies",
    "description": "User-defined amount, time, merchant, and category rules.",
    "cta": "Review Consent Policy",
    "drillDown": "Inspect policy and bounded authority.",
    "apiFlow": "CRUD /consent-policies",
    "mockScenario": "HAPPY_PATH"
  },
  {
    "id": "intent",
    "label": "Intent Verifier",
    "description": "Purpose matching and prompt-injection defense.",
    "cta": "Run Intent Verification",
    "drillDown": "Explain intent mismatch and step-up triggers.",
    "apiFlow": "POST /guardian-decisions",
    "mockScenario": "RISK_HOLD"
  },
  {
    "id": "family",
    "label": "Family Guardian",
    "description": "Delegated safety controls for families and vulnerable users.",
    "cta": "Mock Family Approval",
    "drillDown": "View human-in-loop escalation.",
    "apiFlow": "POST /mock-upi",
    "mockScenario": "STEP_UP"
  },
  {
    "id": "audit",
    "label": "Liability Audit",
    "description": "Decision trail for agent, merchant, consent, and UPI response.",
    "cta": "Generate Audit Trail",
    "drillDown": "Inspect RRN, response code, and policy reason.",
    "apiFlow": "Audit log + reason codes",
    "mockScenario": "STEP_UP"
  }
];

export function getWorkflowTab(id: string) {
  return workflowTabs.find((tab) => tab.id === id) ?? workflowTabs[0];
}

export function buildMockUpiRequest(tab: WorkflowTab, amount: number) {
  return {
    txnId: 'TXN-' + tab.id.toUpperCase() + '-' + Date.now().toString(36).toUpperCase(),
    payerVpa: 'demo.payer@oksbi',
    payeeVpa: 'upiguardianmode@upi',
    amount,
    flow: tab.id.includes('qr') ? 'UPI_QR' : tab.id.includes('lite') ? 'UPI_LITE' : 'UPI_INTENT',
    purpose: 'UPI Guardian Mode ' + tab.label + ' sandbox payment',
    riskScore: tab.mockScenario === 'RISK_HOLD' ? 88 : tab.mockScenario === 'STEP_UP' ? 66 : 24,
    scenario: tab.mockScenario
  };
}
