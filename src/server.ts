import "reflect-metadata";
import dotenv from "dotenv";
import app, { initializeApp, cleanup } from "./app";
import { container } from "./config/container/container";
import { TYPES } from "./config/container/types";
import { ILogger } from "./services/logger.service";

dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Initialize application (database and container verification)
    await initializeApp();

    // Get logger from container
    const logger = container.get<ILogger>(TYPES.Logger);

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", async (error: Error) => {
  const logger = container.get<ILogger>(TYPES.Logger);
  logger.error("Uncaught Exception:", error);

  await cleanup().finally(() => {
    process.exit(1);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", async (error: Error) => {
  const logger = container.get<ILogger>(TYPES.Logger);
  logger.error("Unhandled Rejection:", error);

  await cleanup().finally(() => {
    process.exit(1);
  });
});

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  const logger = container.get<ILogger>(TYPES.Logger);
  logger.info("SIGTERM received. Starting graceful shutdown...");

  await cleanup().finally(() => {
    process.exit(0);
  });
});

startServer();
