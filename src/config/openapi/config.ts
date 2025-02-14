import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry";

export const generateOpenApiDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Wallet Service API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/v1`,
        description: "API V1",
      },
    ],
  });
};
