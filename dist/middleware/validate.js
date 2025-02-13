"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("@/utils/logger"));
const validate = (schema) => {
    return async (req, res, next) => {
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
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                logger_1.default.error("Validation error:", error.errors);
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
exports.validate = validate;
//# sourceMappingURL=validate.js.map