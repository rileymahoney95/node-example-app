import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/error";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import { AppDataSource } from "./config/db/datasource";
import logger from "./utils/logger";
import { generateOpenApiDocument } from "./config/openapi/config";

const app = express();

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

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// Error handling
app.use(errorHandler);

// Database connection
export const initializeDatabase = async () => {
  AppDataSource.initialize()
    .then(() => {
      logger.info("Database connected successfully");
    })
    .catch((error) => {
      logger.error("Error connecting to database:", error);
    });
};

export const cleanup = async () => {
  try {
    await AppDataSource.destroy();
    console.log("Database connection closed successfully");

    // Other cleanup logic
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
};

export default app;
