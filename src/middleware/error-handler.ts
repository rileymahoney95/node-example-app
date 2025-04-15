import { Request, Response, NextFunction } from "express";
import {
  AppError,
  ExternalServiceError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/constants/errors/app-errors";
import { container } from "@/config/container/container";
import { TYPES } from "@/config/container/types";
import { ILogger } from "@/services/logger.service";
import { JsonWebTokenError } from "jsonwebtoken";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = container.get<ILogger>(TYPES.Logger);

  // Get request metadata for logging context
  const requestMetadata = {
    path: req.path,
    method: req.method,
    requestId: req.headers["x-request-id"],
    userId: (req as any).user?.id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  // If it's an AppError, we'll have more context
  const errorData = err instanceof AppError ? err.data : undefined;

  // Log the error with context
  logger.error(err.message, {
    ...requestMetadata,
    stack: err.stack,
    errorData,
    errorName: err.name,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // TypeORM errors
  if (err.name === "QueryFailedError") {
    return res.status(400).json({
      status: "error",
      message: "Database operation failed",
      code: "DATABASE_ERROR",
    });
  }

  // JWT errors
  if (err instanceof UnauthorizedError || err instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: "error",
      message: err.message,
      code: "AUTHENTICATION_ERROR",
    });
  }

  // Handle all error types with consistent response format
  const statusCode = (() => {
    if (err instanceof NotFoundError) return 404;
    if (err instanceof ValidationError) return 422;
    if (err instanceof ExternalServiceError) return 503;
    return 500;
  })();

  // Default error response
  return res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Internal server error" : err.message,
    code:
      statusCode === 500
        ? "INTERNAL_SERVER_ERROR"
        : (err as any).code || "UNKNOWN_ERROR",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
