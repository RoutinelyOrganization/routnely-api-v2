import { AcceptedTermsError } from '@/domain/entities/customer/errors';
import { AcceptTermsValueObject } from './acceptTerms-value-objects';

describe('AcceptTerms Value Objects', () => {
  it('Should return error if acceptTerms is empty', () => {
    const acceptTerms = AcceptTermsValueObject.create('' as any);
    expect(acceptTerms.isLeft()).toBeTruthy();
    expect(acceptTerms.isRight()).toBeFalsy();
    expect(acceptTerms.value).toEqual({ errors: [new AcceptedTermsError().message] });
  });

  it('Should return error if acceptTerms is false', () => {
    const acceptTerms = AcceptTermsValueObject.create(false);
    expect(acceptTerms.isLeft()).toBeTruthy();
    expect(acceptTerms.isRight()).toBeFalsy();
    expect(acceptTerms.value).toEqual({ errors: [new AcceptedTermsError().message] });
  });

  it('Should return correct acceptTerms', () => {
    const acceptTerms = AcceptTermsValueObject.create(true);
    expect(acceptTerms.isLeft()).toBeFalsy();
    expect(acceptTerms.isRight()).toBeTruthy();
    expect(acceptTerms.value).toEqual({ props: true });
  });
});
