"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const user_routes_1 = require("./routes/user.routes");
const product_routes_1 = require("./routes/product.routes");
const components_1 = require("./components");
exports.registry = new zod_to_openapi_1.OpenAPIRegistry();
// Register components (schemas, security schemes, etc.)
(0, components_1.components)(exports.registry);
// Register routes
(0, user_routes_1.userRoutes)(exports.registry);
(0, product_routes_1.productRoutes)(exports.registry);
//# sourceMappingURL=registry.js.map