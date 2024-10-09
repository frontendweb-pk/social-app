import { CustomError, IError } from "./custom-error";

export class AuthError extends CustomError {
  statusCode: number = 401;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
  renderError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
    };
  }
}
