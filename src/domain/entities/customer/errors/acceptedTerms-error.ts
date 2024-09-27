export class AcceptedTermsError extends Error {
  constructor() {
    super('Os termos de uso devem ser aceitos');
  }
}
