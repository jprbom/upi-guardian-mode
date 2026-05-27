import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Activity, BrainCircuit, FileCheck2, Lock, RefreshCw, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { apiRequest } from './api';
import { formatValue, toneForRisk } from './lib/viewModel';

type RecordItem = Record<string, unknown> & { id: string };
type Metrics = { kpis: Record<string, number> };
type DomainResult = Record<string, unknown> & { reasonCodes?: string[]; explanation?: string };

const roles = [
  "ADMIN",
  "GUARDIAN_OPERATOR",
  "POLICY_MANAGER",
  "FAMILY_REVIEWER",
  "VIEWER"
];
const primaryColumns = [
  "agentName",
  "merchantVpa",
  "amount",
  "status",
  "riskScore"
];
const fallbackPrimary = [
  {
    "id": "req_001",
    "agentName": "Family Grocery Agent",
    "merchantVpa": "freshbasket@upi",
    "amount": 780,
    "purpose": "monthly groceries",
    "status": "APPROVED",
    "riskScore": 18,
    "createdAt": "2026-05-27T11:10:00.000Z"
  },
  {
    "id": "req_002",
    "agentName": "Shopping Agent",
    "merchantVpa": "unknown-wellness@upi",
    "amount": 4999,
    "purpose": "premium wellness hamper",
    "status": "REJECTED",
    "riskScore": 92,
    "createdAt": "2026-05-27T11:14:00.000Z"
  },
  {
    "id": "req_003",
    "agentName": "Medicine Agent",
    "merchantVpa": "night-pharma@upi",
    "amount": 1200,
    "purpose": "medicine refill",
    "status": "STEP_UP",
    "riskScore": 67,
    "createdAt": "2026-05-27T11:18:00.000Z"
  }
];
const fallbackSecondary = [
  {
    "id": "pol_001",
    "name": "Groceries daily cap",
    "category": "GROCERIES",
    "maxAmount": 1500,
    "timeWindow": "06:00-23:00",
    "requiresKnownMerchant": true,
    "active": true,
    "createdAt": "2026-05-27T10:00:00.000Z"
  },
  {
    "id": "pol_002",
    "name": "No vague new merchant payments",
    "category": "GENERAL",
    "maxAmount": 2000,
    "timeWindow": "00:00-23:59",
    "requiresKnownMerchant": true,
    "active": true,
    "createdAt": "2026-05-27T10:05:00.000Z"
  }
];
const domainPayload = {
  "amount": 4999,
  "merchantTrust": 0.42,
  "agentConfidence": 0.71,
  "promptInjectionRisk": 0.76,
  "categoryAllowed": false,
  "merchantKnown": false,
  "hour": 23,
  "repeatedWithinMinutes": true,
  "purposeMatch": false
};
const createPayload = {
  "agentName": "Grocery Copilot",
  "merchantVpa": "unknown-wellness@upi",
  "amount": 4999,
  "purpose": "premium wellness hamper",
  "status": "STEP_UP",
  "riskScore": 82
};

export default function App() {
  const [role, setRole] = useState('GUARDIAN_OPERATOR');
  const [primary, setPrimary] = useState<RecordItem[]>(fallbackPrimary);
  const [secondary, setSecondary] = useState<RecordItem[]>(fallbackSecondary);
  const [metrics, setMetrics] = useState<Metrics>({ kpis: { primaryRecords: fallbackPrimary.length, secondaryRecords: fallbackSecondary.length, totalAmount: 0, averageRisk: 0 } });
  const [result, setResult] = useState<DomainResult | null>(null);
  const [error, setError] = useState('');
  const riskyCount = useMemo(() => primary.filter((item) => Number(item.riskScore || item.impulseScore || 0) >= 70).length, [primary]);

  async function load() {
    try {
      const [nextMetrics, nextPrimary, nextSecondary] = await Promise.all([
        apiRequest<Metrics>('/metrics', role),
        apiRequest<RecordItem[]>('/agent-payment-requests', role),
        apiRequest<RecordItem[]>('/consent-policies', role)
      ]);
      setMetrics(nextMetrics);
      setPrimary(nextPrimary);
      setSecondary(nextSecondary);
      setError('');
    } catch {
      setError('API offline: showing synthetic portfolio data.');
    }
  }

  useEffect(() => {
    void load();
  }, [role]);

  async function runDecision() {
    const response = await apiRequest<DomainResult>('/guardian-decisions', role, { method: 'POST', body: JSON.stringify(domainPayload) });
    setResult(response);
  }

  async function createRecord() {
    const created = await apiRequest<RecordItem>('/agent-payment-requests', role, { method: 'POST', body: JSON.stringify(createPayload) });
    setPrimary([created, ...primary]);
  }

  async function removeRecord(id: string) {
    await apiRequest<void>('/agent-payment-requests/' + id, role, { method: 'DELETE' });
    setPrimary(primary.filter((item) => item.id !== id));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><img src="/logo.svg" alt="" /><span>UPI Guardian Mode</span></div>
        {['Command Center', 'Agent Payment Requests', 'Consent Policies', 'Risk Review', 'Audit Trail', 'Reports'].map((item, index) => (
          <button className={index === 0 ? 'nav-item active' : 'nav-item'} key={item}><ShieldCheck size={16} />{item}</button>
        ))}
        <div className="region-card"><span>Mode</span><strong>UPI simulator</strong><small>Synthetic data only</small></div>
      </aside>
      <main>
        <header className="topbar">
          <div>
            <h1>AI consent firewall for agentic UPI payments.</h1>
            <p>A governance layer that evaluates AI-agent payment requests against user consent policies, merchant trust, prompt-injection risk, unusual timing, and bounded authority before simulated UPI money movement.</p>
          </div>
          <div className="top-actions">
            <span className="live-dot">Live</span>
            <select value={role} onChange={(event) => setRole(event.target.value)}>{roles.map((item) => <option key={item}>{item}</option>)}</select>
            <button onClick={load}><RefreshCw size={16} />Refresh</button>
          </div>
        </header>
        {error ? <div className="notice">{error}</div> : null}
        <section className="kpi-grid">
          <Metric title="Agent Payment Requests" value={String(metrics.kpis.primaryRecords ?? primary.length)} detail="operational records" icon={<Activity />} />
          <Metric title="Consent Policies" value={String(metrics.kpis.secondaryRecords ?? secondary.length)} detail="policy and trust memory" icon={<FileCheck2 />} />
          <Metric title="Risk Watch" value={String(riskyCount)} detail="high-friction cases" icon={<BrainCircuit />} />
          <Metric title="Avg Risk" value={String(metrics.kpis.averageRisk ?? 0)} detail="synthetic model signal" icon={<Lock />} />
        </section>
        <section className="workspace-grid">
          <div className="panel span-two">
            <div className="panel-title"><Sparkles size={18} /> Firewall Decision</div>
            <div className="simulator-row">
              <button onClick={runDecision}><Sparkles size={16} />Evaluate Payment Request</button>
              <button onClick={createRecord}><Activity size={16} />Create Record</button>
            </div>
            <div className="recommendation-card">
              <div><span>Decision</span><strong>{String(result?.decision || result?.status || 'Run simulator')}</strong></div>
              <div><span>Risk</span><strong>{String(result?.riskScore || result?.impulseScore || 0)}</strong></div>
              <p>{String(result?.explanation || 'The model evaluates synthetic signals and returns reason codes for a review-ready decision.')}</p>
            </div>
          </div>
          <div className="panel">
            <div className="panel-title"><ShieldCheck size={18} /> Reason Codes</div>
            {(result?.reasonCodes || ['READY_FOR_SIMULATION', 'RBAC_ENABLED', 'SYNTHETIC_ONLY']).map((code) => <div className="node-row" key={code}><strong>{code}</strong><span>Explainability signal</span></div>)}
          </div>
          <div className="panel span-three">
            <div className="panel-title"><Lock size={18} /> Agent Payment Requests CRUD</div>
            <div className="table">
              <div className="table-row header">{primaryColumns.map((column) => <span key={column}>{column}</span>)}<span>Action</span></div>
              {primary.map((item) => {
                const risk = Number(item.riskScore || item.impulseScore || 0);
                return (
                  <div className="table-row" key={item.id}>
                    {primaryColumns.map((column) => <span className={/risk|impulse/i.test(column) ? 'status ' + toneForRisk(risk) : ''} key={column}>{formatValue(column, item[column])}</span>)}
                    <span><button className="icon-button" onClick={() => void removeRecord(item.id)}><Trash2 size={15} /></button></span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel span-three">
            <div className="panel-title"><FileCheck2 size={18} /> Consent Policies</div>
            <div className="secondary-grid">{secondary.map((item) => <div className="case-card" key={item.id}>{Object.entries(item).filter(([key]) => !['id', 'createdAt'].includes(key)).slice(0, 4).map(([key, value]) => <p key={key}><strong>{key}</strong>: {formatValue(key, value)}</p>)}</div>)}</div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ title, value, detail, icon }: { title: string; value: string; detail: string; icon: ReactNode }) {
  return <div className="metric-card"><div>{icon}</div><span>{title}</span><strong>{value}</strong><small>{detail}</small></div>;
}

