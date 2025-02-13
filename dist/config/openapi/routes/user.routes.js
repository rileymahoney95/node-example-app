"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_schema_1 = require("../../../schemas/user.schema");
const zod_1 = require("zod");
const userRoutes = (registry) => {
    registry.registerPath({
        method: "post",
        path: "/api/users/register",
        description: "Register a new user",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: user_schema_1.userCreateSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "User created successfully",
                content: {
                    "application/json": {
                        schema: user_schema_1.userCreateSchema.omit({ password: true }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "post",
        path: "/api/users/login",
        description: "Login user",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: user_schema_1.userLoginSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Login successful",
                content: {
                    "application/json": {
                        schema: zod_1.z.object({
                            user: user_schema_1.userCreateSchema.omit({ password: true }),
                            token: zod_1.z.string(),
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "get",
        path: "/api/users/profile",
        description: "Get user profile",
        security: [{ bearerAuth: [] }],
        responses: {
            200: {
                description: "User profile retrieved successfully",
                content: {
                    "application/json": {
                        schema: user_schema_1.userCreateSchema.omit({ password: true }),
                    },
                },
            },
        },
    });
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.routes.js.map