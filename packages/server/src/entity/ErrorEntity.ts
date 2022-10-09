export class ErrorEntity {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ErrorEntity {
  constructor(message: string) {
    super(message, 400);
  }
}
