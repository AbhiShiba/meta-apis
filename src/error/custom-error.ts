export abstract class CustomError extends Error {
  readonly message: string;
  readonly details?: Record<string, any>;
  constructor(message: string, details?: Record<string, any>) {
    super(message);
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeError(): {
    message: string;
    details?: Record<string, any>;
  }[];
}
