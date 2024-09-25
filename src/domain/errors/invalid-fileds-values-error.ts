import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class InvalidFieldsValuesError extends CustomErrorAbstract {
  constructor(field: string, values: string[]) {
    super({
      codeError: 400,
      message: `O campo ${field} deve ter um dos seguintes valores: ${values.join(', ')}`,
    });
  }
}
