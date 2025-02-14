import { Request, Response, NextFunction } from "express";
import { AppError, ExternalServiceError, NotFoundError, UnauthorizedError, ValidationError } from "@/constants/errors/app-errors";
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

  logger.error(err, {
    path: req.path,
    method: req.method,
    requestId: req.headers["x-request-id"],
    userId: (req as any).user?.id,
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
    });
  }

  // JWT errors
  if (err instanceof UnauthorizedError || err instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(422).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof ExternalServiceError) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle other errors
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
