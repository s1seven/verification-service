export class UnknownEndpointError extends Error {
  public constructor(method: string, path: string) {
    super(`Cannot ${method.toUpperCase()} ${path}`);
    Object.setPrototypeOf(this, UnknownEndpointError.prototype);
  }
}

export class NotFoundError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BigChainDbError extends Error {
  public constructor(message: string, public rawTransaction?: unknown) {
    super(message);
    Object.setPrototypeOf(this, BigChainDbError.prototype);
  }
}

export class AuthenticationError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class NonUniqueDataError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NonUniqueDataError.prototype);
  }
}
