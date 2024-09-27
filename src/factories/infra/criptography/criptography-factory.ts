import { env } from '@/configs/env';
import { Cryptography } from '@/infra/cryptography/criptography-infra';
import type { CriptographyContractUsecase } from '@/usecases/contracts/cryptography/cryptography-contract-usecase.ts';

export const makeCryptography = (): CriptographyContractUsecase => {
  return new Cryptography(env.criptography_salt);
};
