import { z } from 'zod';

export const agentPaymentRequestInputSchema = z.object({
  agentName: z.string().min(3),
  merchantVpa: z.string().min(3),
  amount: z.number().positive().max(500000),
  purpose: z.string().min(3),
  status: z.enum(['APPROVED', 'STEP_UP', 'HELD', 'REJECTED']),
  riskScore: z.number().min(0).max(100)
});

export const consentPolicyInputSchema = z.object({
  name: z.string().min(3),
  category: z.string().min(3),
  maxAmount: z.number().positive().max(500000),
  timeWindow: z.string().min(5),
  requiresKnownMerchant: z.boolean(),
  active: z.boolean()
});

export const guardianDecisionInputSchema = z.object({
  amount: z.number().positive().max(500000),
  merchantTrust: z.number().min(0).max(1),
  agentConfidence: z.number().min(0).max(1),
  promptInjectionRisk: z.number().min(0).max(1),
  categoryAllowed: z.boolean(),
  merchantKnown: z.boolean(),
  hour: z.number().int().min(0).max(23),
  repeatedWithinMinutes: z.boolean(),
  purposeMatch: z.boolean()
});

export type GuardianDecisionInput = z.infer<typeof guardianDecisionInputSchema>;

