import type { AcceptTermsValueObject, NameValueObject } from '@/domain/entities/customer';

export type OutputCustomerEntityModel = {
  id: string;
  name: NameValueObject;
  acceptedTerms: AcceptTermsValueObject;
};
