import { ActivityEnumType } from '@/domain/entities/activity';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { ActivityTypeValueObject } from './activity-type-value-object';

const KeysTypeActivity = Object.values(ActivityEnumType);

describe('Activity Value Object', () => {
  it('Should return error if received empty value', () => {
    const activity = ActivityTypeValueObject.create('' as any);
    expect(activity.result).toEqual({
      props: [
        new FieldIsRequiredError('Tipo'),
        new InvalidFieldsValuesError('Tipo', KeysTypeActivity),
      ],
    });
  });

  it('Should return error if received invalid value', () => {
    const activity = ActivityTypeValueObject.create('test' as any);
    expect(activity.result).toEqual({
      props: [new InvalidFieldsValuesError('Tipo', KeysTypeActivity)],
    });
  });

  it('Should correct activity type', () => {
    const activity = ActivityTypeValueObject.create(ActivityEnumType.task);
    expect(activity.result).toEqual({ props: ActivityEnumType.task });
  });
});
