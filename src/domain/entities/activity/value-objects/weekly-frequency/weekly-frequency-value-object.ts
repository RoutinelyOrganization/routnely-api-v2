import { InvalidUniqueWeekdaysError } from '@/domain/entities/activity/errors';
import type { WeeklyFrequencyModel } from '@/domain/entities/activity/models';
import { WeekDaysEnumType } from '@/domain/entities/activity/models';
import {
  InvalidArrayInstanceError,
  InvalidFieldPositiveNumberError,
  InvalidFieldsValuesError,
} from '@/domain/errors';
import { DatetimeValueObject } from '@/domain/value-objects/datetime/datetime-value-object';
import type { ResultValueObject } from '@/domain/value-objects/value-object';
import { ValueObject } from '@/domain/value-objects/value-object';
import { CustomError } from '@/shared/errors/custom-error';

const keysWeekDays = Object.values(WeekDaysEnumType);

export class WeeklyFrequencyValueObject extends ValueObject<WeeklyFrequencyModel> {
  private constructor(props: WeeklyFrequencyModel) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WeeklyFrequencyModel): ResultValueObject {
    this.validate(props);
    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new WeeklyFrequencyValueObject(props) };
  }

  private static validate(props: WeeklyFrequencyModel): void {
    this.clearErrors();

    const { weekDays, quantityPerWeek, finallyDate } = props;

    if (!this.quantityPerWeekIsValidNumber(quantityPerWeek)) {
      this.addError(new InvalidFieldPositiveNumberError('Quantidade semanal'));
    }

    if (weekDays) {
      this.validWeekDays(weekDays);
    }

    const finallyDateOrUndefined = finallyDate && DatetimeValueObject.create(finallyDate);
    if (!finallyDateOrUndefined?.isvalid) {
      finallyDateOrUndefined?.result.errors?.forEach(error => {
        this.addError(error);
      });
    }
  }

  private static quantityPerWeekIsValidNumber(quantityPerWeek?: number): boolean {
    if (quantityPerWeek && typeof quantityPerWeek !== 'number') return false;
    if (quantityPerWeek! < 1) return false;

    return true;
  }

  private static validWeekDays(weekDays?: WeekDaysEnumType[]): void {
    if (weekDays) {
      if (!this.isInstanceOfArray(weekDays)) {
        this.addError(new InvalidArrayInstanceError());
      }

      if (!this.valueIsCorrectWeekDays(weekDays)) {
        this.addError(new InvalidFieldsValuesError('Dias da semana', keysWeekDays));
      }

      if (!this.valuesIsUnique(weekDays)) {
        this.addError(new InvalidUniqueWeekdaysError());
      }
    }
  }

  private static isInstanceOfArray(value: any[]): boolean {
    return Array.isArray(value);
  }

  private static valueIsCorrectWeekDays(array: WeekDaysEnumType[]): boolean {
    for (const element of array) {
      if (!keysWeekDays.includes(element)) return false;
    }

    return true;
  }

  private static valuesIsUnique(array: WeekDaysEnumType[]): boolean {
    return new Set(array).size === array.length;
  }
}
