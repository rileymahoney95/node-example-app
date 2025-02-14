import { ErrorCode } from "./error-codes.enum";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(400, message);
    this.code = ErrorCode.BAD_REQUEST;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotFoundError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(404, message);
    this.code = ErrorCode.NOT_FOUND;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(422, message);
    this.code = ErrorCode.VALIDATION_ERROR;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(401, message);
    this.code = ErrorCode.AUTHORIZATION_ERROR;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ExternalServiceError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(500, message);
    this.code = ErrorCode.EXTERNAL_SERVICE_ERROR;
    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}
