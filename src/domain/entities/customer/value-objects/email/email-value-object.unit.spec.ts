import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { EmailValueObject } from './email-value-objects';

describe('Email Value Object', () => {
  it('Should return error if email is empty', () => {
    const email = EmailValueObject.create('');
    expect(email.isLeft()).toBe(true);
    expect(email.isRight()).toBe(false);
    expect(email.value).toEqual({
      errors: [new FieldIsRequiredError('Email').message, new InvalidFieldError('Email').message],
    });
  });

  it('Should return error if email is invalid', () => {
    const email = EmailValueObject.create('teste');
    expect(email.isLeft()).toBe(true);
    expect(email.isRight()).toBe(false);
    expect(email.value).toEqual({ errors: [new InvalidFieldError('Email').message] });
  });

  it('Should correct email', () => {
    const email = EmailValueObject.create('teste@teste.com');
    expect(email.value).toEqual({ props: 'teste@teste.com' });
  });
});
