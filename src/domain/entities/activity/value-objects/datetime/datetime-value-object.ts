import { DateIsInThePastError, InvalidDateError } from '@/domain/entities/activity/errors';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';

export type DatetimeErrorType = FieldIsRequiredError | InvalidDateError | DateIsInThePastError;

export class DatetimeValueObject extends ValueObject<Date> {
  private constructor(value: Date) {
    super(value);
    Object.freeze(this);
  }

  static create(value: Date): Either<DatetimeErrorType[], DatetimeValueObject> {
    const errors = this.validate(value);
    if (errors) {
      return left(errors);
    }

    return right(new DatetimeValueObject(value));
  }

  private static validate(value: Date): DatetimeErrorType[] | null {
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
    return this.errors();
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
