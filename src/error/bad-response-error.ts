import { CustomError } from "./custom-error";

export class BadResponseError extends CustomError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, details);
    Object.setPrototypeOf(this, BadResponseError.prototype);
  }

  serializeError() {
    return [{ message: this.message, details: this.details }];
  }
}
