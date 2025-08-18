import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { DaysOfWeek } from '../../types/days-of-week';
import { WeekDaysValueObject } from './week-days-value-object';

const KeysDaysOfWeekEnum = Object.values(DaysOfWeek);

describe('DaysOfWeekValueObject unit test', () => {
  it('Should return error if received value is empty', () => {
    const weekDays = WeekDaysValueObject.create('' as any);
    expect(weekDays.result).toEqual({
      props: [
        new FieldIsRequiredError('dias da semana'),
        new InvalidFieldsValuesError('dias da semana', KeysDaysOfWeekEnum),
      ],
    });
  });

  it('Should return error if received value is invalid', () => {
    const weekDays = WeekDaysValueObject.create('test' as any);
    expect(weekDays.result).toEqual({
      props: [new InvalidFieldsValuesError('dias da semana', KeysDaysOfWeekEnum)],
    });
  });

  it('Should return correct week days', () => {
    const weekDays = WeekDaysValueObject.create(DaysOfWeek.Monday);
    expect(weekDays.result).toEqual({ props: DaysOfWeek.Monday });
  });
});
