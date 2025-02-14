import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userCreateSchema, userUpdateSchema } from "@/schemas/user.schema";
import {
  walletCreateSchema,
  walletUpdateSchema,
} from "@/schemas/wallet.schema";

export const components = (registry: OpenAPIRegistry) => {
  // Register schemas
  registry.register("UserCreate", userCreateSchema);
  registry.register("UserUpdate", userUpdateSchema);
  registry.register("WalletCreate", walletCreateSchema);
  registry.register("WalletUpdate", walletUpdateSchema);

  // Register security schemes
  registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });
};
