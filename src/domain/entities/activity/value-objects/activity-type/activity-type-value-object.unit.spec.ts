import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/shared/errors';
import { ActivityEnumType } from '../../types';
import { ActivityTypeValueObject } from './activity-type-value-object';

const KeysTypeActivity = Object.values(ActivityEnumType);

describe('Activity Value Object', () => {
  it('Should return error if received empty value', () => {
    const activity = ActivityTypeValueObject.create('' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual({
      errors: [
        new FieldIsRequiredError('Tipo').message,
        new InvalidFieldsValuesError('Tipo', KeysTypeActivity).message,
      ],
    });
  });

  it('Should return error if received invalid value', () => {
    const activity = ActivityTypeValueObject.create('test' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual({
      errors: [new InvalidFieldsValuesError('Tipo', KeysTypeActivity).message],
    });
  });

  it('Should correct activity type', () => {
    const activity = ActivityTypeValueObject.create(ActivityEnumType.task);
    expect(activity.isLeft()).toBeFalsy();
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toEqual({ props: ActivityEnumType.task });
  });
});
