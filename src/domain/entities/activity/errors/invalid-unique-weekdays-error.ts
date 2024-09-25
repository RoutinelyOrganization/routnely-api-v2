import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidUniqueWeekdaysError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'O array de dias da semana não pode  ter dias repetidos' });
  }
}
