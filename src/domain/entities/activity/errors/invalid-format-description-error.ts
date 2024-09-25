import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidFormatDescriptionError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'A descrição deve ter entre 3 e 50 caracteres' });
  }
}
