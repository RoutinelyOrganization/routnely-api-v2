import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class ConflitError extends CustomErrorAbstract {
  constructor(field: string) {
    super({ codeError: 409, message: `Este(a) ${field} já esta cadastrado(a)` });
  }
}
