"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenApiDocument = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const registry_1 = require("./registry");
const generateOpenApiDocument = () => {
    const generator = new zod_to_openapi_1.OpenApiGeneratorV3(registry_1.registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Your API Name",
            version: "1.0.0",
            description: "API documentation using zod-to-openapi",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            },
        ],
    });
};
exports.generateOpenApiDocument = generateOpenApiDocument;
//# sourceMappingURL=config.js.map