import { CustomerAggregate } from '@/domain/aggregates/customer';
import type {
  InputRegisterCustomerDto,
  OutputRegisterCustomerDto,
  RegisterCustomerContractDomain,
} from '@/domain/contracts';
import { ConflitError } from '@/shared/errors/conflit-error';
import { CustomError } from '@/shared/errors/custom-error';
import type { CustomerRepositoryContractsUsecase } from '@/usecases/contracts';

export class RegisterCustomerUsecase implements RegisterCustomerContractDomain {
  constructor(private repository: CustomerRepositoryContractsUsecase) {}
  async perform(data: InputRegisterCustomerDto): OutputRegisterCustomerDto {
    const aggregate = CustomerAggregate.create({ ...data });
    console.log(aggregate);

    const existsEmail = await this.repository.findFieldOrNull('account', { email: data.email });
    console.log(existsEmail);

    if (existsEmail) {
      throw new CustomError(new ConflitError('email'));
    }

    await this.repository.create(aggregate);

    return;
  }
}
