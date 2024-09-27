export class InvalidDateError extends Error {
  constructor() {
    super('Este campo deve ser uma data válida');
  }
}
