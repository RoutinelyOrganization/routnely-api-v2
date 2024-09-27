import type { ControllerRequestType, ControllerResponseType } from '@/presentation/types';

export interface ControllerContractPresentation {
  handle: (request: ControllerRequestType) => Promise<ControllerResponseType>;
}
