import type {
  AcceptTermsValueObject,
  EmailValueObject,
  NameValueObject,
} from '@/domain/entities/customer/value-objects';
export type CustomerEntityModel = {
  id: string;
  name: NameValueObject;
  email: EmailValueObject;
  acceptedTerms: AcceptTermsValueObject;
};
