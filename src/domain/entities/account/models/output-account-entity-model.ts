import type { EmailValueObject } from '@/domain/entities/account';
import type { DatetimeValueObject } from '@/domain/value-objects';

export type OutputAccountEntityModel = {
  id: string;
  email: EmailValueObject;
  password: string;
  isVerified: boolean;
  acceptedAt: DatetimeValueObject | null;
};
