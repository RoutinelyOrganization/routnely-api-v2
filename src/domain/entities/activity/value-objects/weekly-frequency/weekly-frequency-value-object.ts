import type { WeeklyFrequencyModel } from '@/domain/entities/activity/types';
import { WeekDaysEnumType } from '@/domain/entities/activity/types';
import type { DatetimeErrorType } from '@/domain/entities/activity/value-objects/datetime/datetime-value-object';
import { DatetimeValueObject } from '@/domain/entities/activity/value-objects/datetime/datetime-value-object';
import { ValueObject } from '@/domain/entities/value-object';
import {
  InvalidArrayInstanceError,
  InvalidFieldPositiveNumberError,
  InvalidFieldsValuesError,
} from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';
import { InvalidUniqueWeekdaysError } from '../../errors';

type WeekDaysErrorsType =
  | InvalidArrayInstanceError
  | InvalidFieldsValuesError
  | InvalidUniqueWeekdaysError;

type WeeklyFrequencyErrorsType =
  | InvalidFieldPositiveNumberError
  | WeekDaysErrorsType
  | DatetimeErrorType;
type ResponseWeeklyFrequencyType = Either<WeeklyFrequencyErrorsType[], WeeklyFrequencyValueObject>;

const keysWeekDays = Object.values(WeekDaysEnumType);

export class WeeklyFrequencyValueObject extends ValueObject<WeeklyFrequencyModel> {
  private constructor(props: WeeklyFrequencyModel) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WeeklyFrequencyModel): ResponseWeeklyFrequencyType {
    const errors = this.validate(props);
    if (errors) {
      return left(errors);
    }

    return right(new WeeklyFrequencyValueObject(props));
  }

  private static validate(props: WeeklyFrequencyModel): WeeklyFrequencyErrorsType[] | null {
    this.clearErrors();

    const { weekDays, quantityPerWeek, finallyDate } = props;

    if (!this.quantityPerWeekIsValidNumber(quantityPerWeek)) {
      this.addError(new InvalidFieldPositiveNumberError('Quantidade semanal'));
    }

    if (weekDays) {
      this.validWeekDays(weekDays);
    }

    const finallyDateOrUndefined = finallyDate && DatetimeValueObject.create(finallyDate);
    if (finallyDateOrUndefined?.isLeft()) {
      this.addObjectError(finallyDateOrUndefined.value);
    }

    return this.errors();
  }

  private static quantityPerWeekIsValidNumber(quantityPerWeek?: number): boolean {
    if (quantityPerWeek && typeof quantityPerWeek !== 'number') return false;
    if (quantityPerWeek! < 1) return false;

    return true;
  }

  private static validWeekDays(weekDays?: WeekDaysEnumType[]): WeekDaysErrorsType[] | null {
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

    return this.errors();
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
