export type AccountModel = {
  id?: string;
  email: string;
  password: string;
  isVerified?: boolean;
  acceptedAt?: Date;
};
