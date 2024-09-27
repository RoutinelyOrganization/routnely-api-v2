export class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`O campo ${field} está inválido`);
  }
}
