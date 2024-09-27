export class FieldIsRequiredError extends Error {
  constructor(field: string) {
    super(`O campo ${field} é obrigatório`);
  }
}
