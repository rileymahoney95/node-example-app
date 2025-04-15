import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "@/constants/errors/error-codes.enum";

export const jsonParser = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      code: ErrorCode.VALIDATION_ERROR,
      message: "Invalid JSON format in request body",
      data: {
        details: err.message,
      },
    });
  }

  next(err);
};
