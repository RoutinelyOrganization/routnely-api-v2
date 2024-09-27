export interface CriptographyContractUsecase {
  encrypter: (value: string) => string;
  decrypter: (value: string) => string;
}
