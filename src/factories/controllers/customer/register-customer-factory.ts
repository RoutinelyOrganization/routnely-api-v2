import { makeRegisterCustomerUsecase } from '@/factories/usecases';
import { RegisterCustomerValidator } from '@/infra/validators';
import type { ControllerContractPresentation } from '@/presentation/contracts';
import { RegisterCustomerController } from '@/presentation/controllers';

export const makeRegisterCustomerController = (): ControllerContractPresentation => {
  const validator = new RegisterCustomerValidator();
  const usecase = makeRegisterCustomerUsecase();
  return new RegisterCustomerController(validator, usecase);
};
