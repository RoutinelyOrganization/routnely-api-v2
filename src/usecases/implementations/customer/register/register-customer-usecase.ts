import type {
  RegisterCustomerContractDomain,
  RegisterCustomerResponseType,
} from '@/domain/contracts';
import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { left, right } from '@/shared/either';
import type { CriptographyContractUsecase } from '@/usecases/contracts/cryptography/cryptography-contract-usecase.ts';
import type {
  CustomerRepositoryContractsUsecase,
  CustomerRepositoryDto,
} from '@/usecases/contracts/database';
import type { InputRegisterCustomerDto } from './register-customer-dto';

export class RegisterCustomerUsecase implements RegisterCustomerContractDomain {
  constructor(
    private repository: CustomerRepositoryContractsUsecase,
    private cryptography: CriptographyContractUsecase,
  ) {}
  async perform(data: InputRegisterCustomerDto): RegisterCustomerResponseType {
    const entity = CustomerEntity.create({ ...data });

    if (entity.isLeft()) {
      return left(entity.value);
    }

    const existsEmail = await this.repository.findByField('email', data.email);

    if (existsEmail.isRight() && existsEmail.value) {
      return left({ errors: ['O email informado já existe'] });
    }

    const passwordHashed = await this.cryptography.encrypter(data.password);

    const newCustomer: CustomerRepositoryDto = {
      id: entity.value.id,
      name: entity.value.name,
      email: entity.value.email,
      acceptedTerms: entity.value.acceptedTerms,
      password: passwordHashed,
    };

    await this.repository.create(newCustomer);

    return right();
  }
}
