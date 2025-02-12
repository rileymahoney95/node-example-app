import dotenv from "dotenv";
import app, { cleanup, initializeDatabase } from "./app";
import logger from "./utils/logger";

dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
  await initializeDatabase();
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

startServer();

process.on("unhandledRejection", (error: Error) => {
  console.error("Unhandled Rejection:", error);
  cleanup().finally(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  cleanup().finally(() => {
    process.exit(1);
  });
});
