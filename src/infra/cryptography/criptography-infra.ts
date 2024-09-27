import type { CriptographyContractUsecase } from '@/usecases/contracts/cryptography/cryptography-contract-usecase.ts';
import bcriptjs from 'bcryptjs';

export class Cryptography implements CriptographyContractUsecase {
  constructor(private readonly saltHash: number) {}

  async encrypter(value: string): Promise<string> {
    return await bcriptjs.hash(value, this.saltHash);
  }
  async compare(value: string, hashValue: string): Promise<boolean> {
    return await bcriptjs.compare(value, hashValue);
  }
}
