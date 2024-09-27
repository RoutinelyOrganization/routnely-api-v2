import { InvalidFormatTitleError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/errors';
import { TitleValueObject } from './title-value-object';

describe('Title Value Objects', () => {
  it('Should return error if title is empty', () => {
    const title = TitleValueObject.create('');

    expect(title.result).toEqual({
      props: [new FieldIsRequiredError('Título'), new InvalidFormatTitleError()],
    });
  });

  it('Should return error if title has less than 3 characters or more than 50', () => {
    let title = TitleValueObject.create('ab');

    expect(title.result).toEqual({ props: [new InvalidFormatTitleError()] });

    title = TitleValueObject.create('a'.repeat(51));

    expect(title.result).toEqual({ props: [new InvalidFormatTitleError()] });
  });
});
