export class InvalidUniqueWeekdaysError extends Error {
  constructor() {
    super('O array de dias da semana não pode  ter dias repetidos');
  }
}
