import { FieldIsRequiredError } from '@/domain/errors';
import { TaskDescriptionValueObject } from './description-value-object';
import { InvalidFormatDescriptionError } from '../../error/invalid-description-error';

describe('Description Value Object Unit Tests', () => {
  it('Should return error if description is empty', () => {
    const description = TaskDescriptionValueObject.create('');
    expect(description.result).toEqual({
      props: [new FieldIsRequiredError('Descrição'), new InvalidFormatDescriptionError()],
    });
  });

  it('Should return error if description has less than 10 character or more than 1000', () => {
    let description = TaskDescriptionValueObject.create('ab');
    expect(description.result).toEqual({
      props: [new InvalidFormatDescriptionError()],
    });

    description = TaskDescriptionValueObject.create('a'.repeat(1001));
    expect(description.result).toEqual({
      props: [new InvalidFormatDescriptionError()],
    });
  });

  it('Should return success', () => {
    const description = TaskDescriptionValueObject.create('Mensagem de teste.');
    expect(description.result).toEqual({ props: 'Mensagem de teste.' });
  });
});
