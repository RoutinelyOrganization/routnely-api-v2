import { FieldIsRequiredError } from '@/domain/errors';
import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { CustomError } from '@/shared';
import { InvalidFormatNameError } from '../../error/invalid-name-error';

export class TaskNameValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): ResultValueObject {
    this.validate(value);

    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TaskNameValueObject(value) };
  }

  private static validate(value: string) {
    this.clearErrors();
    if (!this.hasName(value)) {
      this.addError(new FieldIsRequiredError('Nome'));
    }
    if (!this.isNameValid(value) || !this.isNameLengthValid(value)) {
      this.addError(new InvalidFormatNameError());
    }
  }

  private static hasName(name: string): boolean {
    return !!name;
  }

  private static isNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s~]+$/.test(name);
  }

  private static isNameLengthValid(name: string): boolean {
    return !!name && name.length > 3 && name.length <= 100;
  }
}
