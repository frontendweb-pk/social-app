import { CustomError } from "./custom-error";

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor(message: string = "Not authorized", public field?: string) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message, field: this.field, statusCode: this.statusCode },
    ];
  }
}
