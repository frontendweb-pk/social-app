import { CustomError, IError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  renderError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
    };
  }
}
