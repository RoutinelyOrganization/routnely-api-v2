import { CustomerAggregate } from '@/domain/aggregates/customer';
import { makeCustomerRepository } from '../../mock/customer/customer-repository-stub';

describe('customer-repository unit test', () => {
  it('Should return void in create method', async () => {
    const { stub, data } = makeCustomerRepository();
    const result = await stub.create(CustomerAggregate.create(data));

    expect(result).toBeUndefined();
  });

  it('Should return correct data  if customer exists in findByField method', async () => {
    const { stub, data } = makeCustomerRepository();
    const customer = CustomerAggregate.create(data);
    jest.spyOn(stub, 'findFieldOrNull').mockResolvedValueOnce(customer);
    const result = await stub.findFieldOrNull('id', customer.id);

    expect(result?.id).toEqual(customer.id);
    expect(result?.name).toEqual(customer.name);
    expect(result?.account.email).toEqual(customer.account.email);
    expect(result?.account.password).toEqual(customer.account.password);
    expect(result?.acceptedTerms).toEqual(true);
    expect(result?.account.isVerified).toEqual(false);
    expect(result?.account.acceptedAt).toEqual(null);
  });

  it('Should return null if customer not exists in findByField method', async () => {
    const { stub } = makeCustomerRepository();
    const result = await stub.findFieldOrNull('id', '2');

    expect(result).toBeNull();
  });
});
