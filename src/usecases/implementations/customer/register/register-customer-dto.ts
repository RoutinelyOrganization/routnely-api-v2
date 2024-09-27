import type { InputCustomerDto } from '@/domain/contracts';

export type InputRegisterCustomerDto = InputCustomerDto & {
  password: string;
};
