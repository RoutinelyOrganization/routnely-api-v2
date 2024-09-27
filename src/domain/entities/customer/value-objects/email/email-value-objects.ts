import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';

type ErrorsEmailType = InvalidFieldError | FieldIsRequiredError;

export class EmailValueObject extends ValueObject {
  private constructor(email: string) {
    super(email);
    Object.freeze(this);
  }

  static create(email: string): Either<ErrorsEmailType[], EmailValueObject> {
    const errors = EmailValueObject.validate(email);

    if (errors) {
      return left(errors);
    }

    return right(new EmailValueObject(email));
  }

  private static validate(email: string): Error[] | null {
    this.clearErrors();

    if (!this.hasEmail(email)) {
      this.addError(new FieldIsRequiredError('Email'));
    }
    if (!this.isEmailValid(email)) {
      this.addError(new InvalidFieldError('Email'));
    }
    return this.errors();
  }

  private static hasEmail(email: string): boolean {
    return !!email;
  }

  private static isEmailValid(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
