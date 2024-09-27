import { CustomErrorAbstract } from '@/shared/errors';

export class InvalidPasswordError extends CustomErrorAbstract {
  constructor() {
    super({
      codeError: 400,
      message:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
    });
  }
}
