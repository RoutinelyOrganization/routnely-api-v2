import {
  DateIsInThePastError,
  InvalidDateError,
  InvalidUniqueWeekdaysError,
} from '@/domain/entities/activity/errors';
import type { WeeklyFrequencyModel } from '@/domain/entities/activity/models/weekly-frequency-model';
import { WeekDaysEnumType } from '@/domain/entities/activity/models/weekly-frequency-model';
import {
  InvalidArrayInstanceError,
  InvalidFieldPositiveNumberError,
  InvalidFieldsValuesError,
} from '@/domain/errors';
import { WeeklyFrequencyValueObject } from './weekly-frequency-value-object';

const now = new Date();
const futureDate = new Date(now);
futureDate.setDate(now.getDate() + 10);

const weeklyFrequencyData: WeeklyFrequencyModel = {
  quantityPerWeek: 2,
  weekDays: [],
  finallyDate: futureDate,
};

const keysWeekDays = Object.values(WeekDaysEnumType);

describe('Weekly Frequency Value Object', () => {
  it('Should return error if quantity per week received a value different from number', () => {
    const weeklyFrequency = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      quantityPerWeek: '2' as any,
    });

    expect(weeklyFrequency.result).toEqual({
      props: [new InvalidFieldPositiveNumberError('Quantidade semanal')],
    });
  });

  it('Should return error if quantity per week is less than 1', () => {
    const weeklyFrequency = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      quantityPerWeek: 0,
    });

    expect(weeklyFrequency.result).toEqual({
      props: [new InvalidFieldPositiveNumberError('Quantidade semanal')],
    });
  });

  it('Should correct weekly frequency without quantity per week', () => {
    const { weekDays, finallyDate } = weeklyFrequencyData;

    const weeklyFrequency = WeeklyFrequencyValueObject.create({ weekDays, finallyDate });

    expect(weeklyFrequency.result).toEqual({ props: { weekDays, finallyDate } });
  });

  it("Should return error if week days isn't an array", () => {
    const weeklyFrequency = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      weekDays: 'test' as any,
    });

    expect(weeklyFrequency.result).toEqual({
      props: [
        new InvalidArrayInstanceError(),
        new InvalidFieldsValuesError('Dias da semana', keysWeekDays),
        new InvalidUniqueWeekdaysError(),
      ],
    });
  });

  it('Should return error if week days is not a valid week day', () => {
    const weeklyFrequency = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      weekDays: ['test'] as any,
    });

    expect(weeklyFrequency.result).toEqual({
      props: [new InvalidFieldsValuesError('Dias da semana', keysWeekDays)],
    });
  });

  it("should return error if values in weekdays isn't unique", () => {
    const weeklyFrequency = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      weekDays: [WeekDaysEnumType.monday, WeekDaysEnumType.monday],
    });

    expect(weeklyFrequency.result).toEqual({ props: [new InvalidUniqueWeekdaysError()] });
  });

  it('Should correct weekly frequency without week days', () => {
    const { quantityPerWeek, finallyDate } = weeklyFrequencyData;
    const weeklyFrequency = WeeklyFrequencyValueObject.create({ quantityPerWeek, finallyDate });

    expect(weeklyFrequency.result).toEqual({ props: { quantityPerWeek, finallyDate } });
  });

  it('Should error if finally date is not a valid date', () => {
    const datetime = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      finallyDate: 2 as any,
    });

    expect(datetime.result).toEqual({
      props: [new InvalidDateError(), new DateIsInThePastError()],
    });
  });

  it('Should return error if the finally date is in the past', () => {
    const datetime = WeeklyFrequencyValueObject.create({
      ...weeklyFrequencyData,
      finallyDate: now,
    });

    expect(datetime.result).toEqual({ props: [new DateIsInThePastError()] });
  });

  it('Should correct weekly frequency without finally date', () => {
    const { quantityPerWeek, weekDays } = weeklyFrequencyData;
    const weeklyFrequency = WeeklyFrequencyValueObject.create({ quantityPerWeek, weekDays });

    expect(weeklyFrequency.result).toEqual({ props: { quantityPerWeek, weekDays } });
  });

  it('Should return correct weekly frequency', () => {
    const weeklyFrequency = WeeklyFrequencyValueObject.create(weeklyFrequencyData);

    expect(weeklyFrequency.result).toEqual({ props: weeklyFrequencyData });
  });
});
