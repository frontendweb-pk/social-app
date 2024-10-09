export interface IError {
  message: string;
  statusCode: number;
  name?: string;
}
export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract renderError(): IError;
}
