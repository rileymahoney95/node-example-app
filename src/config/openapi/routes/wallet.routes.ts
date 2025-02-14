import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  walletCreateSchema,
  walletUpdateSchema,
} from "@/schemas/wallet.schema";
import { userCreateSchema } from "@/schemas/user.schema";

export const walletRoutes = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/wallets",
    tags: ["Wallets"],
    description: "Create a new wallet",
    request: {
      body: {
        content: {
          "application/json": {
            schema: walletCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "User created successfully",
        content: {
          "application/json": {
            schema: userCreateSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/wallets",
    tags: ["Wallets"],
    description: "Get all wallets",
    responses: {
      200: {
        description: "Wallets fetched successfully",
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/wallets/{id}",
    tags: ["Wallets"],
    description: "Get a wallet by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      200: {
        description: "Wallet fetched successfully",
      },
    },
  });

  registry.registerPath({
    method: "patch",
    path: "/wallets/{id}",
    tags: ["Wallets"],
    description: "Update a wallet by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    request: {
      body: {
        content: {
          "application/json": {
            schema: walletUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Wallet updated successfully",
      },
    },
  });

  registry.registerPath({
    method: "delete",
    path: "/wallets/{id}",
    tags: ["Wallets"],
    description: "Delete a wallet by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      204: {
        description: "Wallet deleted successfully",
      },
    },
  });
};
