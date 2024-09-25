import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidDateError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'Este campo deve ser uma data válida' });
  }
}
