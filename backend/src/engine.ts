import type { GuardianDecisionInput } from './schemas.js';

export function evaluateGuardianDecision(input: GuardianDecisionInput) {
  let riskScore = 0;
  const reasonCodes: string[] = [];
  riskScore += (1 - input.merchantTrust) * 24;
  riskScore += input.promptInjectionRisk * 26;
  riskScore += (1 - input.agentConfidence) * 10;
  if (!input.categoryAllowed) { riskScore += 14; reasonCodes.push('CATEGORY_OUTSIDE_CONSENT'); }
  if (!input.merchantKnown) { riskScore += 12; reasonCodes.push('UNKNOWN_MERCHANT'); }
  if (input.hour >= 23 || input.hour < 5) { riskScore += 8; reasonCodes.push('UNUSUAL_PAYMENT_TIME'); }
  if (input.repeatedWithinMinutes) { riskScore += 8; reasonCodes.push('REPEATED_PAYMENT_PATTERN'); }
  if (!input.purposeMatch) { riskScore += 16; reasonCodes.push('PURPOSE_MISMATCH'); }
  if (input.promptInjectionRisk > 0.55) reasonCodes.push('PROMPT_INJECTION_RISK');
  const finalRiskScore = Math.round(Math.min(100, riskScore));
  const decision = finalRiskScore >= 85 ? 'REJECT' : finalRiskScore >= 70 ? 'ESCALATE_TO_HUMAN' : finalRiskScore >= 55 ? 'STEP_UP_AUTHENTICATION' : finalRiskScore >= 35 ? 'HOLD' : 'APPROVE';
  return {
    decision,
    riskScore: finalRiskScore,
    reasonCodes,
    explanation: 'Guardian decision ' + decision + ' because consent, merchant trust, timing, purpose match, and prompt-injection signals were evaluated before simulated UPI payment approval.'
  };
}
