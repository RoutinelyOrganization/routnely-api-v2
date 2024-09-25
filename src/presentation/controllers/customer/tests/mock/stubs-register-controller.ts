import type { ValidationContract } from '@/presentation/contracts';
import { makeSutUsecase } from '@/usecases/implementations/customer/tests/mocks/stubs-register-custumer';
import { RegisterCustomerController } from '../../register-customer-controller';

const MakeCustumerValidator = () => {
  class ValidatorStub implements ValidationContract {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(input: any): void {
      return;
    }
  }
  return new ValidatorStub();
};

export const makeSutController = () => {
  const validator = MakeCustumerValidator();
  const usecase = makeSutUsecase().sut;
  const sut = new RegisterCustomerController(validator, usecase);
  return { sut, validator, usecase };
};
