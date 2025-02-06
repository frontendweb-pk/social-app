import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message: string = "Route not found", public field?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [
      { message: this.message, field: this.field, statusCode: this.statusCode },
    ];
  }
}
