import type { RegisterCustomerContractDomain } from '@/domain/contracts';
import type { ControllerContractPresentation, ValidationContract } from '@/presentation/contracts';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers';
import type { ControllerRequestType, ControllerResponseType } from '@/presentation/types';

export class RegisterCustomerController implements ControllerContractPresentation {
  constructor(
    private validator: ValidationContract,
    private usecase: RegisterCustomerContractDomain,
  ) {}
  async handle(request: ControllerRequestType): Promise<ControllerResponseType> {
    try {
      const errors = this.validator.validate(request.body);

      if (errors.isLeft()) {
        return badRequest(errors.value);
      }

      const result = await this.usecase.perform(request.body);

      if (result.isLeft()) {
        return badRequest(result.value);
      }

      return noContent();
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
