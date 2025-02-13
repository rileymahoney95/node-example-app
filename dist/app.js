"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = exports.initializeDatabase = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const error_1 = require("./middleware/error");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const datasource_1 = require("./config/db/datasource");
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = require("./config/openapi/config");
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            // TODO: Add allowed origins
            "script-src": ["'self'", "example.com"],
        },
    },
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Documentation
const openApiDocument = (0, config_1.generateOpenApiDocument)();
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiDocument));
// Routes
app.use("/api/users", user_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: `Cannot ${req.method} ${req.url}`,
    });
});
// Error handling
app.use(error_1.errorHandler);
// Database connection
const initializeDatabase = async () => {
    datasource_1.AppDataSource.initialize()
        .then(() => {
        logger_1.default.info("Database connected successfully");
    })
        .catch((error) => {
        logger_1.default.error("Error connecting to database:", error);
    });
};
exports.initializeDatabase = initializeDatabase;
const cleanup = async () => {
    try {
        await datasource_1.AppDataSource.destroy();
        console.log("Database connection closed successfully");
        // Other cleanup logic
    }
    catch (error) {
        console.error("Error closing database connection:", error);
    }
};
exports.cleanup = cleanup;
exports.default = app;
//# sourceMappingURL=app.js.map