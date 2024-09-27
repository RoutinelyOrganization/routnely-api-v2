import { DateIsInThePastError, InvalidDateError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/errors';
import { DatetimeValueObject } from './datetime-value-object';

const now = new Date();

describe('Datetime Value Object', () => {
  it('Should return error if received empty value', () => {
    const datetime = DatetimeValueObject.create('' as any);
    expect(datetime.result).toEqual({
      props: [new FieldIsRequiredError('Data e hora'), new InvalidDateError()],
    });
  });

  it('Should error if invalid date', () => {
    const datetime = DatetimeValueObject.create(now.toString() as any);
    expect(datetime.result).toEqual({
      props: [new InvalidDateError(), new DateIsInThePastError()],
    });
  });

  it('Should return error if the date is in the past', () => {
    const datetime = DatetimeValueObject.create(now);
    expect(datetime.result).toEqual({ props: [new DateIsInThePastError()] });
  });

  it('Should correct datetime', () => {
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 10);
    const datetime = DatetimeValueObject.create(futureDate);
    expect(datetime.result).toEqual({ props: futureDate });
  });
});
