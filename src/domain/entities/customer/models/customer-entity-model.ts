import type {
  AcceptTermsValueObject,
  NameValueObject,
} from '@/domain/entities/customer/value-objects';
export type CustomerEntityModel = {
  id: string;
  name: NameValueObject;
  acceptedTerms: AcceptTermsValueObject;
};
