import { AcceptedTermsError } from '@/domain/entities/customer/errors';
import { ValueObject } from '@/domain/entities/value-object';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';

export class AcceptTermsValueObject extends ValueObject<boolean> {
  private constructor(acceptTerms: boolean) {
    super(acceptTerms);
  }

  static create(acceptTerms: boolean): Either<AcceptedTermsError[], AcceptTermsValueObject> {
    this.clearErrors();
    if (!acceptTerms) {
      this.addError(new AcceptedTermsError());
    }

    const errors = this.errors();
    if (errors) {
      return left(errors);
    }
    return right(new AcceptTermsValueObject(acceptTerms));
  }
}
