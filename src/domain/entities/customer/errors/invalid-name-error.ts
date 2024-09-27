import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidNameError extends CustomErrorAbstract {
  constructor() {
    super({
      codeError: 400,
      message: 'O nome deve ter pelo menos 3 caracteres e apenas letras',
    });
  }
}
