import { CustomError, IError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  renderError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
    };
  }
}
