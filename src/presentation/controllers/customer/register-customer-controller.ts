import type { RegisterCustomerContractDomain } from '@/domain/contracts';
import type { ControllerContractPresentation, ValidationContract } from '@/presentation/contracts';
import { ControllerError } from '@/presentation/controllers/controller-class-error';
import { noContent } from '@/presentation/helpers/http-helpers';
import type { ControllerRequestType, ControllerResponseType } from '@/presentation/types';

export class RegisterCustomerController
  extends ControllerError
  implements ControllerContractPresentation
{
  constructor(
    private validator: ValidationContract,
    private usecase: RegisterCustomerContractDomain,
  ) {
    super();
  }
  async handle(request: ControllerRequestType): Promise<ControllerResponseType> {
    try {
      this.validator.validate(request.body);

      await this.usecase.perform(request.body);

      return noContent();
    } catch (error) {
      return this.returnError(error as any);
    }
  }
}
