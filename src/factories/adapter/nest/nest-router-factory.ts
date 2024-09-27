import { NestRouterAdapter } from '@/adapters/nest/nest-router-adapter';
import type { ControllerContractPresentation } from '@/presentation/contracts';

export const makeNestRouter = (constroller: ControllerContractPresentation): NestRouterAdapter => {
  return new NestRouterAdapter(constroller);
};
