import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidFieldPositiveNumberError extends CustomErrorAbstract {
  constructor(field: string) {
    super({ codeError: 400, message: `O campo ${field} deve ser um número positivo` });
  }
}
