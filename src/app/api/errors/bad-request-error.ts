import { CustomError, IError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  renderError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
    };
  }
}
