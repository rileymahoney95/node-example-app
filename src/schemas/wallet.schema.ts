import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { WalletStatus } from "@/models/wallet.entity";
import { balanceCreateSchema } from "./balance.schema";
import { accountCreateSchema } from "./account.schema";

extendZodWithOpenApi(z);

export const walletCreateSchema = z.object({
  userId: z.string().uuid(),
  status: z.nativeEnum(WalletStatus),
  initialAccountBalance: accountCreateSchema.merge(balanceCreateSchema),
});

export const walletUpdateSchema = walletCreateSchema
  .omit({ userId: true })
  .partial();

export type WalletCreate = z.infer<typeof walletCreateSchema>;
export type WalletUpdate = z.infer<typeof walletUpdateSchema>;
