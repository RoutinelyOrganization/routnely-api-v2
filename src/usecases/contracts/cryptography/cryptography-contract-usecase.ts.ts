export interface CriptographyContractUsecase {
  encrypter: (value: string) => Promise<string>;
  compare: (value: string, hash: string) => Promise<boolean>;
}
