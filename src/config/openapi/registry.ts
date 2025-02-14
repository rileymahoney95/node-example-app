import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userRoutes, walletRoutes } from "./routes";
import { components } from "./components";

export const registry = new OpenAPIRegistry();

// Register components (schemas, security schemes, etc.)
components(registry);

// Register routes
userRoutes(registry);
walletRoutes(registry);
