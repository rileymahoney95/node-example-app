import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import logger from "@/utils/logger";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle TypeORM errors
  if (err.name === "QueryFailedError") {
    return res.status(400).json({
      status: "error",
      message: "Database operation failed",
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }

  // Handle other errors
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
