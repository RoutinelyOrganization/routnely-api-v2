import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { EmailValueObject } from './email-value-objects';

describe('Email Value Object', () => {
  it('Should return error if email is empty', () => {
    const email = EmailValueObject.create('');
    expect(email.result).toEqual({
      props: [new FieldIsRequiredError('Email'), new InvalidFieldError('Email')],
    });
  });

  it('Should return error if email is invalid', () => {
    const email = EmailValueObject.create('teste');
    expect(email.result).toEqual({ props: [new InvalidFieldError('Email')] });
  });

  it('Should correct email', () => {
    const email = EmailValueObject.create('teste@teste.com');
    expect(email.result).toEqual({ props: 'teste@teste.com' });
  });
});
