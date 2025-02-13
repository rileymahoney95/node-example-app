import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  userCreateSchema,
  userLoginSchema,
} from "../../../schemas/user.schema";
import { z } from "zod";

export const userRoutes = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/users/register",
    description: "Register a new user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: userCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "User created successfully",
        content: {
          "application/json": {
            schema: userCreateSchema.omit({ password: true }),
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
            schema: userLoginSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: z.object({
              user: userCreateSchema.omit({ password: true }),
              token: z.string(),
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
            schema: userCreateSchema.omit({ password: true }),
          },
        },
      },
    },
  });
};
