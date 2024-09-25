import { InvalidNameError } from '@/domain/entities/customer/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { NameValueObject } from './name-value-object';

describe('Name Value Object', () => {
  it('Should throw error if name is empty', () => {
    const name = NameValueObject.create('');
    expect(name.result).toEqual({
      props: [new FieldIsRequiredError('nome'), new InvalidNameError()],
    });
  });

  it('Should throw error if name is invalid', () => {
    let name = NameValueObject.create('teste 1');
    expect(name.result).toEqual({
      props: [new InvalidNameError()],
    });

    name = NameValueObject.create('teste *');
    expect(name.result).toEqual({ props: [new InvalidNameError()] });
  });

  it('Should return error if name is less than 3', () => {
    const name = NameValueObject.create('te');
    expect(name.result).toEqual({ props: [new InvalidNameError()] });
  });

  it('Should return error if name is greater than 60', () => {
    const name = NameValueObject.create('teste'.repeat(13));
    expect(name.result).toEqual({ props: [new InvalidNameError()] });
  });

  it('Should correct name', () => {
    const name = NameValueObject.create('teste');
    expect(name.result).toEqual({ props: 'teste' });
  });
});
