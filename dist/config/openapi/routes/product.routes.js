"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_schema_1 = require("@/schemas/product.schema");
const zod_1 = require("zod");
const productRoutes = (registry) => {
    registry.registerPath({
        method: "get",
        path: "/api/products",
        description: "Get all products",
        responses: {
            200: {
                description: "List of products",
                content: {
                    "application/json": {
                        schema: zod_1.z.array(product_schema_1.productCreateSchema),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "get",
        path: "/api/products/{id}",
        description: "Get a product by ID",
        request: {
            params: zod_1.z.object({
                id: zod_1.z.string().uuid(),
            }),
        },
        responses: {
            200: {
                description: "Product found",
                content: {
                    "application/json": {
                        schema: product_schema_1.productCreateSchema,
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "post",
        path: "/api/products",
        description: "Create a new product",
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: product_schema_1.productCreateSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Product created successfully",
                content: {
                    "application/json": {
                        schema: product_schema_1.productCreateSchema,
                    },
                },
            },
        },
    });
    // Add update and delete endpoints similarly
};
exports.productRoutes = productRoutes;
//# sourceMappingURL=product.routes.js.map