import { Aggregate } from '@/domain/aggregates/aggregate';
import type { CustomerAggregateModel, CustomerModel } from '@/domain/aggregates/customer/models';
import { AccountEntity } from '@/domain/entities/account/account-entity';
import { CustomerEntity } from '@/domain/entities/customer';
import { CustomError } from '@/shared/errors';

export class CustomerAggregate extends Aggregate<CustomerAggregateModel> {
  private constructor(props: CustomerAggregateModel) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get acceptedTerms(): boolean {
    return this.props.acceptedTerms;
  }

  get account(): AccountEntity {
    return this.props.account;
  }

  static create(data: CustomerModel): CustomerAggregate {
    const result = this.validate(data);
    return new CustomerAggregate(result);
  }

  private static validate(data: CustomerModel): CustomerAggregateModel {
    this.clearErrors();

    const customer = {
      id: data.id,
      name: data.name,
      acceptedTerms: data.acceptedTerms,
    };

    const account = {
      id: data.idAccount,
      email: data.email,
      password: data.password,
      isVerified: data.isVerified,
      acceptedAt: data.acceptedAt,
    };

    const entities = this.validateEntities([
      { entity: CustomerEntity, props: customer },
      { entity: AccountEntity, props: account },
    ]);

    const errors = this.errors();
    if (errors) {
      throw new CustomError(errors);
    }
    const custumerEntity = entities[0] as CustomerEntity;
    const accountEntity = entities[1] as AccountEntity;

    return {
      id: custumerEntity.id,
      name: custumerEntity.name,
      acceptedTerms: custumerEntity.acceptedTerms,
      account: accountEntity as AccountEntity,
    };
  }
}
