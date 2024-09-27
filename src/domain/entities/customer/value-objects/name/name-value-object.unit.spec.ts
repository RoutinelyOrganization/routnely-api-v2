import { InvalidNameError } from '@/domain/entities/customer/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { NameValueObject } from './name-value-object';

describe('Name Value Object', () => {
  it('Should throw error if name is empty', () => {
    const name = NameValueObject.create('');

    expect(name.isLeft()).toBe(true);
    expect(name.isRight()).toBe(false);
    expect(name.value).toEqual({
      errors: [new FieldIsRequiredError('nome').message, new InvalidNameError().message],
    });
  });

  it('Should throw error if name is invalid', () => {
    let name = NameValueObject.create('teste 1');
    expect(name.value).toEqual({
      errors: [new InvalidNameError().message],
    });

    name = NameValueObject.create('teste *');
    expect(name.value).toEqual({ errors: [new InvalidNameError().message] });
  });

  it('Should return error if name is less than 3', () => {
    const name = NameValueObject.create('te');
    expect(name.isLeft()).toBe(true);
    expect(name.isRight()).toBe(false);
    expect(name.value).toEqual({ errors: [new InvalidNameError().message] });
  });

  it('Should return error if name is greater than 60', () => {
    const name = NameValueObject.create('teste'.repeat(13));
    expect(name.isLeft()).toBe(true);
    expect(name.isRight()).toBe(false);
    expect(name.value).toEqual({ errors: [new InvalidNameError().message] });
  });

  it('Should correct name', () => {
    const name = NameValueObject.create('teste');
    expect(name.value).toEqual({ props: 'teste' });
  });
});
