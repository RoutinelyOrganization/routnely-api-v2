import type { OutputCustomerDto, RegisterCustomerContractDomain } from '@/domain/contracts';
import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { ConflitError } from '@/shared/errors/conflit-error';
import { CustomError } from '@/shared/errors/custom-error';
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
  async perform(data: InputRegisterCustomerDto): OutputCustomerDto {
    const entity = CustomerEntity.create({ ...data });

    const existsEmail = await this.repository.findFieldOrNull('email', data.email);

    if (existsEmail) {
      throw new CustomError(new ConflitError('email'));
    }

    const passwordHashed = await this.cryptography.encrypter(data.password);

    const newCustomer: CustomerRepositoryDto = {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      acceptedTerms: entity.acceptedTerms,
      password: passwordHashed,
    };

    await this.repository.create(newCustomer);

    return;
  }
}
