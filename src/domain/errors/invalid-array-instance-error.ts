import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidArrayInstanceError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'Este campo deve ser um array.' });
  }
}
