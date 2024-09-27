import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';
import { InvalidFieldError } from '../shared/errors';

type Props = { id: string } & Record<string, any>;
export abstract class Entity<T extends Props> {
  private static _errors: Error[] = [];
  protected readonly _id: string;

  protected constructor(protected readonly props: T) {
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  protected static validateId(id?: string): Either<InvalidFieldError, string> {
    const uuid = new UuidAdapter();

    if (id && !uuid.validate(id)) {
      return left(new InvalidFieldError('id'));
    }

    const returnId = id ?? uuid.build();
    return right(returnId);
  }

  protected static errors(): Error[] | null {
    return this._errors.length ? this._errors : null;
  }

  protected static addError(error: Error | Error[]): void {
    if (Array.isArray(error)) {
      this._errors = this._errors.concat(error);
      return;
    }
    this._errors.push(error);
  }

  protected static addObjectError({ errors }: { errors: string[] }): void {
    errors.forEach(error => this.addError(new Error(error)));
  }

  protected static clearErrors(): void {
    this._errors = [];
  }

  protected static formatErrors(): string[] {
    return this._errors.map(error => error.message);
  }
}
