import { DateIsInThePastError, InvalidDateError } from '@/domain/entities/activity/errors';
import type { ResultValueObject } from '@/domain/entities/value-object';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError } from '@/domain/errors';
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
    if (value && !this.isDateInTheFuture(value)) {
      this.addError(new DateIsInThePastError());
    }
  }

  private static hasDatetime(value: Date): boolean {
    return !!value;
  }

  private static isDatetimeValid(value: Date): boolean {
    return value instanceof Date;
  }

  private static isDateInTheFuture(value: Date): boolean {
    return value > new Date();
  }
}
