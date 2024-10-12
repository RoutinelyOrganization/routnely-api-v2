import type {
  InputCustomerEntityModel,
  OutputCustomerEntityModel,
} from '@/domain/entities/customer';
import { AcceptTermsValueObject, NameValueObject } from '@/domain/entities/customer';
import { Entity } from '@/domain/entities/entity';
import { CustomError } from '@/shared/errors/custom-error';

export class CustomerEntity extends Entity<OutputCustomerEntityModel> {
  protected constructor(protected props: OutputCustomerEntityModel) {
    super(props);
    Object.freeze(this);
  }

  get name(): string {
    return this.props.name.value;
  }

  get acceptedTerms(): boolean {
    return this.props.acceptedTerms.value;
  }

  static create(data: InputCustomerEntityModel): CustomerEntity {
    const result = this.validate(data);

    return new CustomerEntity(result);
  }

  static validate({
    id,
    name,
    acceptedTerms,
  }: InputCustomerEntityModel): OutputCustomerEntityModel {
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
