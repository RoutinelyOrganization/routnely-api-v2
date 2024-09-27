type EitherError = Error | Error[];
type ObjectError = { errors: string[] };

export type Either<L extends EitherError, R> = Left<L, R> | Right<L, R>;
class Left<L extends EitherError, R> {
  readonly value: { errors: string[] };

  constructor(error: L) {
    // Formata o erro diretamente no construtor
    this.value = {
      errors: Array.isArray(error) ? error.flatMap(err => [err.message]) : [error.message],
    };
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

class Right<L extends EitherError, R> {
  constructor(readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export const left = <L extends EitherError, R>(error: L | ObjectError): Left<L, R> => {
  if (error instanceof Error || error instanceof Array) {
    return new Left<L, R>(error);
  }
  const { errors } = error;
  const newErrorArray = errors.map(err => new Error(err));

  return new Left<Error[], R>(newErrorArray);
};

export function right<L extends EitherError, R extends void>(result?: R): Right<L, R>;
export function right<L extends EitherError, R>(result: R): Right<L, R>;
export function right<L extends EitherError, R>(result: R): Right<L, R> {
  return new Right<L, R>(result);
}
