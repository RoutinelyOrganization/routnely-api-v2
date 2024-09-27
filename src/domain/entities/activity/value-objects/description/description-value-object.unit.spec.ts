import { InvalidFormatDescriptionError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/errors';
import { DescriptionValueObject } from './description-value-object';

describe('Description Value Objects', () => {
  it('Should return error if description is empty', () => {
    const description = DescriptionValueObject.create('');

    expect(description.result).toEqual({
      props: [new FieldIsRequiredError('Descrição'), new InvalidFormatDescriptionError()],
    });
  });

  it('Should return error if description has less than 10 characters or more than 500', () => {
    let description = DescriptionValueObject.create('ab');

    expect(description.result).toEqual({ props: [new InvalidFormatDescriptionError()] });

    description = DescriptionValueObject.create('a'.repeat(501));

    expect(description.result).toEqual({ props: [new InvalidFormatDescriptionError()] });
  });

  it('Should return success', () => {
    const description = DescriptionValueObject.create('a'.repeat(50));
    expect(description.result).toEqual({ props: 'a'.repeat(50) });
  });
});
