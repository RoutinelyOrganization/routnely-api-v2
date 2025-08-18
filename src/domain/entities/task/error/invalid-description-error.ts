import { CustomErrorAbstract } from '@/shared';

export class InvalidFormatDescriptionError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'A descrição deve ter entre 0 e 1000 caracteres.' });
  }
}
