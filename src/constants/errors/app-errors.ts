import { ErrorCode } from "./error-codes.enum";

export class AppError extends Error {
  public code: ErrorCode;
  public statusCode: number;
  public data?: any;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number,
    data?: any
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class BadRequestError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(message, ErrorCode.BAD_REQUEST, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotFoundError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(message, ErrorCode.NOT_FOUND, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(message, ErrorCode.VALIDATION_ERROR, 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(message, ErrorCode.AUTHORIZATION_ERROR, 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class InvalidOperationError extends AppError {
  constructor(message: string, data?: any) {
    super(message, ErrorCode.INVALID_OPERATION, 422, data);
    Object.setPrototypeOf(this, InvalidOperationError.prototype);
  }
}

export class ExternalServiceError extends AppError {
  code: ErrorCode;
  constructor(message: string) {
    super(message, ErrorCode.EXTERNAL_SERVICE_ERROR, 500);
    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}
