import { Entity } from '@/domain/entities/entity';
import { CustomError } from '@/shared/errors/custom-error';
import type { CustomerEntityModel, CustomerModel } from './models';
import { AcceptTermsValueObject, EmailValueObject, NameValueObject } from './value-objects';

export class CustomerEntity extends Entity<CustomerEntityModel> {
  private constructor(protected props: CustomerEntityModel) {
    super(props);
    Object.freeze(this);
  }

  get name(): string {
    return this.props.name.value;
  }

  get email(): string {
    return this.props.email.value;
  }

  get acceptedTerms(): boolean {
    return this.props.acceptedTerms.value;
  }

  static create(data: CustomerModel): CustomerEntity {
    const result = this.validate(data);

    return new CustomerEntity(result);
  }

  static validate({ id, name, email, acceptedTerms }: CustomerModel): CustomerEntityModel {
    this.clearErrors();

    const idOrError = this.validateId(id);
    const nameOrError = NameValueObject.create(name);
    const emailOrError = EmailValueObject.create(email);
    const acceptedTermsOrError = AcceptTermsValueObject.create(acceptedTerms);

    const responses = [idOrError, nameOrError, emailOrError, acceptedTermsOrError];

    for (const response of responses) {
      if (!response.isvalid) {
        this.addError(response.result.errors);
      }
    }

    const errors = this.errors();
    if (errors) {
      throw new CustomError(errors);
    }

    return {
      id: idOrError.result as string,
      name: nameOrError.result as NameValueObject,
      email: emailOrError.result as EmailValueObject,
      acceptedTerms: acceptedTermsOrError.result as AcceptTermsValueObject,
    };
  }
}
