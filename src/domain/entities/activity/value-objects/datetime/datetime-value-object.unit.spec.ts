import { DateIsInThePastError, InvalidDateError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { DatetimeValueObject } from './datetime-value-object';

const now = new Date();

describe('Datetime Value Object', () => {
  it('Should return error if received empty value', () => {
    const datetime = DatetimeValueObject.create('' as any);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual({
      errors: [new FieldIsRequiredError('Data e hora').message, new InvalidDateError().message],
    });
  });

  it('Should error if invalid date', () => {
    const datetime = DatetimeValueObject.create(now.toString() as any);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual({
      errors: [new InvalidDateError().message, new DateIsInThePastError().message],
    });
  });

  it('Should return error if the date is in the past', () => {
    const datetime = DatetimeValueObject.create(now);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual({ errors: [new DateIsInThePastError().message] });
  });

  it('Should correct datetime', () => {
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 10);
    const datetime = DatetimeValueObject.create(futureDate);
    expect(datetime.value).toEqual({ props: futureDate });
  });
});
