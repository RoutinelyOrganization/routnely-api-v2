import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter';
import type { CustomErrorAbstract } from '@/shared/errors/custom-error';
import { CustomError } from '@/shared/errors/custom-error';
import { InvalidFieldError } from '../errors';

export type ResultValueId =
  | { isvalid: true; result: string }
  | { isvalid: false; result: CustomError };

type Obj = Record<string, any>;

type Props = { id: string } & Obj;

export abstract class Entity<T extends Props = Props> {
  private static _errors: CustomErrorAbstract[] = [];
  protected readonly _id: string;

  protected constructor(protected readonly props: T) {
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  protected static validateId(id?: string): ResultValueId {
    const uuid = new UuidAdapter();

    if (id && !uuid.validate(id)) {
      return {
        isvalid: false,
        result: new CustomError(new InvalidFieldError('id')),
      };
    }

    const returnId = id ?? uuid.build();
    return { isvalid: true, result: returnId };
  }

  protected static errors(): CustomErrorAbstract[] | null {
    return this._errors.length ? this._errors : null;
  }

  protected static addError(error: CustomErrorAbstract | CustomErrorAbstract[]): void {
    if (Array.isArray(error)) {
      this._errors = this._errors.concat(error);
      return;
    }
    this._errors.push(error);
  }

  protected static clearErrors(): void {
    this._errors = [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static create(props: Obj): Entity<Props> {
    throw new Error('Method not implemented.');
  }
}
