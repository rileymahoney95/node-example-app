"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("@/utils/AppError");
const logger_1 = __importDefault(require("@/utils/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(err.stack);
    if (err instanceof AppError_1.AppError) {
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map