import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { BalanceRuleType } from "@/models/balance-rule.entity";

extendZodWithOpenApi(z);

export const balanceRuleCreateSchema = z.object({
  balanceId: z.string().uuid(),
  ruleType: z.nativeEnum(BalanceRuleType),
  description: z.string(),
  isActive: z.boolean().default(true),
});

export const balanceRuleUpdateSchema = balanceRuleCreateSchema
  .omit({ balanceId: true })
  .partial();

export type BalanceRuleCreate = z.infer<typeof balanceRuleCreateSchema>;
export type BalanceRuleUpdate = z.infer<typeof balanceRuleUpdateSchema>;
