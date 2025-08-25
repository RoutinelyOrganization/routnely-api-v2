import { CustomErrorAbstract } from '@/shared';

export class InvalidFormatNameError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'O nome deve ter entre 3 e 100 caracteres e apenas letras.' });
  }
}
