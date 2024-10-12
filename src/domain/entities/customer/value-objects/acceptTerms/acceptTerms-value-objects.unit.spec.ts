import { AcceptedTermsError } from '@/domain/entities/customer';
import { AcceptTermsValueObject } from './acceptTerms-value-objects';

describe('AcceptTerms Value Objects', () => {
  it('Should return error if acceptTerms is empty', () => {
    const acceptTerms = AcceptTermsValueObject.create('' as any);

    expect(acceptTerms.result).toEqual({ props: [new AcceptedTermsError()] });
  });

  it('Should return error if acceptTerms is false', () => {
    const acceptTerms = AcceptTermsValueObject.create(false);

    expect(acceptTerms.result).toEqual({ props: [new AcceptedTermsError()] });
  });

  it('Should return correct acceptTerms', () => {
    const acceptTerms = AcceptTermsValueObject.create(true);
    expect(acceptTerms.result).toEqual({ props: true });
  });
});
