import { AcceptedTermsError } from '@/domain/entities/customer/errors';
import type { ResultValueObject } from '@/domain/value-objects/value-object';
import { ValueObject } from '@/domain/value-objects/value-object';
import { CustomError } from '@/shared/errors/custom-error';

export class AcceptTermsValueObject extends ValueObject<boolean> {
  private constructor(acceptTerms: boolean) {
    super(acceptTerms);
  }

  static create(acceptTerms: boolean): ResultValueObject {
    this.clearErrors();

    if (!acceptTerms) {
      this.addError(new AcceptedTermsError());
    }

    const errors = this.errors();
    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new AcceptTermsValueObject(acceptTerms) };
  }
}
