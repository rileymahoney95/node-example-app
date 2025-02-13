"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
const user_schema_1 = require("@/schemas/user.schema");
const product_schema_1 = require("@/schemas/product.schema");
const components = (registry) => {
    // Register schemas
    registry.register("UserCreate", user_schema_1.userCreateSchema);
    registry.register("UserLogin", user_schema_1.userLoginSchema);
    registry.register("ProductCreate", product_schema_1.productCreateSchema);
    registry.register("ProductUpdate", product_schema_1.productUpdateSchema);
    // Register security schemes
    registry.registerComponent("securitySchemes", "bearerAuth", {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
    });
};
exports.components = components;
//# sourceMappingURL=components.js.map