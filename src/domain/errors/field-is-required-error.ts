import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class FieldIsRequiredError extends CustomErrorAbstract {
  constructor(field: string) {
    super({ codeError: 400, message: `O campo ${field} é obrigatório` });
  }
}
