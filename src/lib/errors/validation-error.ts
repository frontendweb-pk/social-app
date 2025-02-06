import type { ZodIssue } from "zod";
import { CustomError } from "./custom-error";

export class ValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ZodIssue[], public field?: string) {
    super("Validation error");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((error: ZodIssue) => ({
      message: error.message,
      field: error.path.join("."),
      statusCode: this.statusCode,
    }));
  }
}
