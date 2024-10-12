import type { DateIsInThePastError } from '@/domain/entities/activity';
import { InvalidDateError } from '@/domain/entities/activity';
import { FieldIsRequiredError } from '@/domain/errors';
import type { ResultValueObject } from '@/domain/value-objects/value-object';
import { ValueObject } from '@/domain/value-objects/value-object';
import { CustomError } from '@/shared/errors/custom-error';

export type DatetimeErrorType = FieldIsRequiredError | InvalidDateError | DateIsInThePastError;

export class DatetimeValueObject extends ValueObject<Date> {
  private constructor(value: Date) {
    super(value);
    Object.freeze(this);
  }

  static create(value: Date): ResultValueObject {
    this.validate(value);
    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new DatetimeValueObject(value) };
  }

  private static validate(value: Date): void {
    this.clearErrors();
    if (!this.hasDatetime(value)) {
      this.addError(new FieldIsRequiredError('Data e hora'));
    }
    if (!this.isDatetimeValid(value)) {
      this.addError(new InvalidDateError());
    }
  }

  private static hasDatetime(value: Date): boolean {
    return !!value;
  }

  private static isDatetimeValid(value: Date): boolean {
    return value instanceof Date;
  }
}
