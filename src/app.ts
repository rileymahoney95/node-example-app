import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/error-handler";
import userRoutes from "./routes/user.routes";
import walletRoutes from "./routes/wallet.routes";
import { AppDataSource } from "./config/db/datasource";
import logger from "./utils/logger";
import { generateOpenApiDocument } from "./config/openapi/config";
import "reflect-metadata";
import { container } from "./config/container/container";
import { TYPES } from "./config/container/types";
import { ILogger } from "./services/logger.service";

const app = express();

const initializeContainer = () => {
  const logger = container.get<ILogger>(TYPES.Logger);
};

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // TODO: Add allowed origins
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);
app.use(cors());
app.use(express.json());

// API Documentation
const openApiDocument = generateOpenApiDocument();
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Initialize container and routes
initializeContainer();

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/wallets", walletRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// Global error handler
app.use(errorHandler);

export const initializeApp = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("Database connected successfully");

    logger.info("Dependency injection container initialized successfully");
  } catch (error) {
    logger.error("Error during application initialization:", error);
    throw error;
  }
};

export const cleanup = async () => {
  try {
    await AppDataSource.destroy();
    logger.info("Database connection closed successfully");
  } catch (error) {
    logger.error("Error closing database connection:", error);
    throw error;
  }
};

export default app;
