import { Aggregate } from '@/domain/aggregates/aggregate';
import type {
  InputCustomerAggregateModel,
  OutputCustomerAggregateModel,
} from '@/domain/aggregates/customer';
import { AccountEntity } from '@/domain/entities/account/account-entity';
import { CustomerEntity } from '@/domain/entities/customer';
import { CustomError } from '@/shared/errors';

export class CustomerAggregate extends Aggregate<OutputCustomerAggregateModel> {
  private constructor(props: OutputCustomerAggregateModel) {
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

  static create(data: InputCustomerAggregateModel): CustomerAggregate {
    const result = this.validate(data);
    return new CustomerAggregate(result);
  }

  private static validate(data: InputCustomerAggregateModel): OutputCustomerAggregateModel {
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
