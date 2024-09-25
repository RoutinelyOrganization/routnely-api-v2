import { CustomErrorAbstract } from '@/shared/errors/custom-error';

export class AcceptedTermsError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: 'Os termos de uso devem ser aceitos' });
  }
}
