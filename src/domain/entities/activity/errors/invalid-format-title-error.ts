import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidFormatTitleError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'O título deve ter entre 3 e 50 caracteres' });
  }
}
