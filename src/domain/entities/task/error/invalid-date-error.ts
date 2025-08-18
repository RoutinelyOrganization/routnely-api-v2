import { CustomErrorAbstract } from '@/shared';

export class InvalidDateFormatError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: `Data informada é inválida.` });
  }
}
