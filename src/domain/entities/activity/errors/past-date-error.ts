import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class DateIsInThePastError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'A data não pode ser no passado' });
  }
}
