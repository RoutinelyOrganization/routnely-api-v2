import { makeCustomerRepository } from '../../mock/customer/customer-repository-stub';

describe('customer-repository unit test', () => {
  it('Should return void in create method', async () => {
    const { stub, data } = makeCustomerRepository();
    const result = await stub.create(data);

    expect(result.value).toBeUndefined();
  });

  it('Should return correct data  if customer exists in findByField method', async () => {
    const { stub, data } = makeCustomerRepository();
    const result = await stub.findByField('id', data.id);

    expect(result.value).toEqual(data);
  });

  it('Should return null if customer not exists in findByField method', async () => {
    const { stub } = makeCustomerRepository();
    const result = await stub.findByField('id', '2');

    expect(result.value).toBeNull();
  });
});
