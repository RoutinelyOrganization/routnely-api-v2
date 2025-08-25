import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { DaysOfWeek } from '../../types/days-of-week';
import { CustomError } from '@/shared';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';

const KeysDaysOfWeekEnum = Object.values(DaysOfWeek);

export class WeekDaysValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
  }

  static create(value: DaysOfWeek): ResultValueObject {
    this.validate(value);
    const errors = this.errors();
    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new WeekDaysValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasValue(value)) {
      this.addError(new FieldIsRequiredError('dias da semana'));
    }
    if (!this.isValidValue(value)) {
      this.addError(new InvalidFieldsValuesError('dias da semana', KeysDaysOfWeekEnum));
    }
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is DaysOfWeek {
    return KeysDaysOfWeekEnum.includes(value as DaysOfWeek);
  }
}
