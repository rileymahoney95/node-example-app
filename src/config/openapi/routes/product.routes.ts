import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { productCreateSchema } from "@/schemas/product.schema";
import { z } from "zod";

export const productRoutes = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/products",
    description: "Get all products",
    responses: {
      200: {
        description: "List of products",
        content: {
          "application/json": {
            schema: z.array(productCreateSchema),
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
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      200: {
        description: "Product found",
        content: {
          "application/json": {
            schema: productCreateSchema,
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
            schema: productCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Product created successfully",
        content: {
          "application/json": {
            schema: productCreateSchema,
          },
        },
      },
    },
  });

  // Add update and delete endpoints similarly
};
