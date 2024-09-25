import type { ResultValueObject } from '@/domain/entities/value-object';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { CustomError } from '@/shared/errors/custom-error';

export class EmailValueObject extends ValueObject {
  private constructor(email: string) {
    super(email);
    Object.freeze(this);
  }

  static create(email: string): ResultValueObject {
    this.validate(email);

    const error = this.errors();

    return error
      ? { isvalid: false, result: new CustomError(error) }
      : { isvalid: true, result: new EmailValueObject(email) };
  }

  private static validate(email: string): void {
    this.clearErrors();

    if (!this.hasEmail(email)) {
      this.addError(new FieldIsRequiredError('Email'));
    }
    if (!this.isEmailValid(email)) {
      this.addError(new InvalidFieldError('Email'));
    }
  }

  private static hasEmail(email: string): boolean {
    return !!email;
  }

  private static isEmailValid(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
