import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Currency } from "@/models/account.entity";

extendZodWithOpenApi(z);

export const accountCreateSchema = z.object({
  currency: z.nativeEnum(Currency).optional().default(Currency.USD),
});

export const accountUpdateSchema = accountCreateSchema.partial();

export type AccountCreate = z.infer<typeof accountCreateSchema>;
export type AccountUpdate = z.infer<typeof accountUpdateSchema>;
