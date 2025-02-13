import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userRoutes } from "./routes/user.routes";
import { productRoutes } from "./routes/product.routes";
import { components } from "./components";

export const registry = new OpenAPIRegistry();

// Register components (schemas, security schemes, etc.)
components(registry);

// Register routes
userRoutes(registry);
productRoutes(registry);
