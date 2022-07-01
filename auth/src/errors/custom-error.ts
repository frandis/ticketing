export abstract class CustomError extends Error {
  // the 'abstract' tag indicates that statusCode must be specified
  abstract statusCode: number;

  // we need constructor any time we are exteending a built-in class
  // receiving message and passing it through super() allows us to
  // receive messages passed through new Error('msg'), which gets logged internally
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
