import type { CustomerEntityModel, CustomerModel } from '@/domain/entities/customer/models';
import { AcceptTermsValueObject, NameValueObject } from '@/domain/entities/customer/value-objects';
import { Entity } from '@/domain/entities/entity';
import { CustomError } from '@/shared/errors/custom-error';

export class CustomerEntity extends Entity<CustomerEntityModel> {
  protected constructor(protected props: CustomerEntityModel) {
    super(props);
    Object.freeze(this);
  }

  get name(): string {
    return this.props.name.value;
  }

  get acceptedTerms(): boolean {
    return this.props.acceptedTerms.value;
  }

  static create(data: CustomerModel): CustomerEntity {
    const result = this.validate(data);

    return new CustomerEntity(result);
  }

  static validate({ id, name, acceptedTerms }: CustomerModel): CustomerEntityModel {
    this.clearErrors();

    const idOrError = this.validateId(id);
    const nameOrError = NameValueObject.create(name);
    const acceptedTermsOrError = AcceptTermsValueObject.create(acceptedTerms);

    const responses = [idOrError, nameOrError, acceptedTermsOrError];

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
      acceptedTerms: acceptedTermsOrError.result as AcceptTermsValueObject,
    };
  }
}
