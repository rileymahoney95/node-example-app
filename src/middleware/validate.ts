import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { container } from "@/config/container/container";
import { TYPES } from "@/config/container/types";
import { ILogger } from "@/services/logger.service";

interface ValidateSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

export const validate = (schema: ValidateSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const logger = container.get<ILogger>(TYPES.Logger);

    try {
      if (schema.body) {
        await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        await schema.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        logger.error("Validation error", {
          errors: error.errors,
          path: req.path,
          method: req.method,
        });

        const validationErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: validationErrors,
        });
      }
      next(error);
    }
  };
};
