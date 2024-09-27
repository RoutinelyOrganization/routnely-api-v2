import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidFieldError extends CustomErrorAbstract {
  constructor(field: string) {
    super({ codeError: 400, message: `O campo ${field} está inválido` });
  }
}
