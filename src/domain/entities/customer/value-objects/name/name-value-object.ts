import { InvalidNameError } from '@/domain/entities/customer/errors';
import type { ResultValueObject } from '@/domain/entities/value-object';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError } from '@/domain/errors';
import { CustomError } from '@/shared/errors/custom-error';

export class NameValueObject extends ValueObject {
  private constructor(name: string) {
    super(name);
    Object.freeze(this);
  }

  static create(name: string): ResultValueObject {
    this.validate(name);

    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new NameValueObject(name) };
  }

  private static validate(name: string): void {
    this.clearErrors();

    if (!this.hasName(name)) {
      this.addError(new FieldIsRequiredError('nome'));
    }
    if (!this.isNameValid(name) || !this.isNameLengthValid(name)) {
      this.addError(new InvalidNameError());
    }
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
