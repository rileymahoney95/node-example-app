import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  PaymentInstrumentStatus,
  PaymentInstrumentType,
} from "@/models/payment-instrument.entity";

extendZodWithOpenApi(z);

export const paymentInstrumentCreateSchema = z.object({
  walletId: z.string().uuid(),
  type: z.nativeEnum(PaymentInstrumentType),
  status: z.nativeEnum(PaymentInstrumentStatus),
  externalToken: z.string().optional(),
  displayLabel: z.string().optional(),
});

export const paymentInstrumentUpdateSchema = paymentInstrumentCreateSchema
  .omit({ walletId: true })
  .partial();

export type PaymentInstrumentCreate = z.infer<
  typeof paymentInstrumentCreateSchema
>;
export type PaymentInstrumentUpdate = z.infer<
  typeof paymentInstrumentUpdateSchema
>;
