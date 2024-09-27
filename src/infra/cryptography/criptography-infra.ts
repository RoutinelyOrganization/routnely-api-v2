import type { CriptographyContractUsecase } from '@/usecases/contracts';
import crypto from 'crypto';

export class Cryptography implements CriptographyContractUsecase {
  constructor(private readonly saltHash: number) {}
  encrypter(value: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      process.env.SECRET_KEY_CRYPTO!,
      process.env.IV!,
    );
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  decrypter(value: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      process.env.SECRET_KEY_CRYPTO!,
      process.env.IV!,
    );

    let decrypted = decipher.update(value, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
