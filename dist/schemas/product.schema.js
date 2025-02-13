"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateSchema = exports.productCreateSchema = void 0;
const zod_1 = require("zod");
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.productCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Product name must be at least 2 characters"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    price: zod_1.z.number().positive("Price must be positive"),
    stock: zod_1.z.number().int().nonnegative("Stock cannot be negative").default(0),
});
exports.productUpdateSchema = exports.productCreateSchema.partial();
//# sourceMappingURL=product.schema.js.map