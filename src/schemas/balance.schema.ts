import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { BalanceType } from "@/models/balance.entity";

extendZodWithOpenApi(z);

export const balanceCreateSchema = z.object({
  type: z.nativeEnum(BalanceType).optional().default(BalanceType.MAIN),
  amount: z.number().optional().default(0),
});

export const balanceUpdateSchema = balanceCreateSchema
  .omit({ amount: true })
  .partial();

export type BalanceCreate = z.infer<typeof balanceCreateSchema>;
export type BalanceUpdate = z.infer<typeof balanceUpdateSchema>;
