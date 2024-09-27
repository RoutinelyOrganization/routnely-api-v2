import { InvalidNameError } from '@/domain/entities/customer/errors';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';

type ErrorsNameType = InvalidNameError | FieldIsRequiredError;

export class NameValueObject extends ValueObject {
  private constructor(name: string) {
    super(name);
    Object.freeze(this);
  }

  static create(name: string): Either<ErrorsNameType[], NameValueObject> {
    const errors = this.validate(name);

    if (errors) {
      return left(errors);
    }

    return right(new NameValueObject(name.trim()));
  }

  private static validate(name: string): ErrorsNameType[] | null {
    this.clearErrors();

    if (!this.hasName(name)) {
      this.addError(new FieldIsRequiredError('nome'));
    }
    if (!this.isNameValid(name) || !this.isNameLengthValid(name)) {
      this.addError(new InvalidNameError());
    }

    return this.errors();
  }

  private static hasName(name: string): boolean {
    return !!name;
  }

  private static isNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s~]+$/.test(name);
  }

  private static isNameLengthValid(name: string): boolean {
    return !!name && name.length > 3 && name.length < 60;
  }
}
