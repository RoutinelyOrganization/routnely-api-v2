import { CustomErrorAbstract } from '@/shared';

export default class TaskFinallyDateError extends CustomErrorAbstract {
  constructor() {
    super({ codeError: 400, message: `Data final informada é inválida.` });
  }
}
