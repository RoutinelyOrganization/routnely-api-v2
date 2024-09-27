import { InvalidDateError } from '@/domain/entities/activity/errors';
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

  it('Should correct datetime', () => {
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 10);
    const datetime = DatetimeValueObject.create(futureDate);
    expect(datetime.result).toEqual({ props: futureDate });
  });
});
