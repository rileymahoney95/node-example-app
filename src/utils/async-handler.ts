import { Request, Response, NextFunction } from "express";
import { AppError } from "@/constants/errors/app-errors";
import { ErrorCode } from "@/constants/errors/error-codes.enum";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction): AsyncFunction => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      if (!(error instanceof AppError)) {
        // Add request context to help with debugging
        const contextData = {
          path: req.path,
          method: req.method,
          requestId: req.headers["x-request-id"] as string,
          userId: (req as any).user?.id,
          body: req.body,
          query: req.query,
        };

        error = new AppError(
          error.message || "Internal Server Error",
          ErrorCode.INTERNAL_SERVER_ERROR,
          500,
          { originalError: error, context: contextData }
        );
      }
      next(error);
    }
  };
};
