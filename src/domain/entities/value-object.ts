import type { CustomError, CustomErrorAbstract } from '@/shared/errors/custom-error';

type Props = Record<string, any> | string | boolean;

export type ResultValueObject =
  | { isvalid: true; result: ValueObject<Props> }
  | { isvalid: false; result: CustomError };

export abstract class ValueObject<T extends Props = string> {
  protected static _errors: CustomErrorAbstract[] = [];
  protected constructor(private props: T) {}

  get value(): T {
    return this.props;
  }

  protected static errors(): CustomErrorAbstract[] | null {
    return this._errors.length ? this._errors : null;
  }

  protected static addError(error: CustomErrorAbstract): void {
    this._errors.push(error);
  }

  protected static clearErrors(): void {
    this._errors = [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static create<V extends ValueObject<Props>>(props: Props): ResultValueObject {
    throw new Error('Method not implemented.');
  }
}
