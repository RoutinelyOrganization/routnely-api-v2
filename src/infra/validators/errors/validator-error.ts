import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class ValidatorError extends CustomErrorAbstract {
  constructor(message: string) {
    super({
      codeError: 400,
      message,
    });
  }
}
