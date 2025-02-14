import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const userCreateSchema = z.object({
  externalIds: z.record(z.string(), z.array(z.string())),
});

export const userUpdateSchema = userCreateSchema
  .omit({ externalIds: true })
  .partial();

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
