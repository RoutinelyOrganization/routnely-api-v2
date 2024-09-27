import { InvalidFormatDescriptionError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { DescriptionValueObject } from './description-value-object';

describe('Description Value Objects', () => {
  it('Should return error if description is empty', () => {
    const description = DescriptionValueObject.create('');
    expect(description.isLeft()).toBeTruthy();
    expect(description.isRight()).toBeFalsy();
    expect(description.value).toEqual({
      errors: [
        new FieldIsRequiredError('Descrição').message,
        new InvalidFormatDescriptionError().message,
      ],
    });
  });

  it('Should return error if description has less than 10 characters or more than 500', () => {
    let description = DescriptionValueObject.create('ab');
    expect(description.isLeft()).toBeTruthy();
    expect(description.isRight()).toBeFalsy();
    expect(description.value).toEqual({ errors: [new InvalidFormatDescriptionError().message] });

    description = DescriptionValueObject.create('a'.repeat(501));
    expect(description.isLeft()).toBeTruthy();
    expect(description.isRight()).toBeFalsy();
    expect(description.value).toEqual({ errors: [new InvalidFormatDescriptionError().message] });
  });
});
