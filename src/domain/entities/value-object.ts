type Props = Record<string, any> | string | boolean;

export abstract class ValueObject<T extends Props = string> {
  private static _errors: Error[] = [];
  protected constructor(private props: T) {}

  get value(): T {
    return this.props;
  }

  protected static errors(): Error[] | null {
    return this._errors.length ? this._errors : null;
  }

  protected static addError(error: Error): void {
    this._errors.push(error);
  }

  protected static clearErrors(): void {
    this._errors = [];
  }
  protected static addObjectError({ errors }: { errors: string[] }): void {
    errors.forEach(error => this.addError(new Error(error)));
  }
}
