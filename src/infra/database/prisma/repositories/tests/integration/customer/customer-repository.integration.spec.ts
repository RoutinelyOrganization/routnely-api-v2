import { PrismaHelper } from '@/infra/database/prisma/helpers';
import { CustomerRepository } from '@/infra/database/prisma/repositories/customer/customer-repository-infra';
import { makeCustomerRepository } from '@/infra/database/prisma/repositories/tests/mock/customer/customer-repository-stub';

const customerRepository = new CustomerRepository();
const { data } = makeCustomerRepository();

beforeAll(async () => {
  const prisma = await PrismaHelper.getPrisma();
  await prisma.customer.delete({
    where: {
      id: data.id,
    },
  });
});

describe('customer-repository unit test', () => {
  it('Should return void in create method', async () => {
    const result = await customerRepository.create(data);

    expect(result.value).toBeUndefined();

    const custumerCreated = await customerRepository.findByField('id', data.id);
    expect(custumerCreated.value).toEqual(data);
  });

  it('Should return correct data  if customer exists in findByField method', async () => {
    const result = await customerRepository.findByField('id', data.id);

    expect(result.value).toEqual(data);
  });

  it('Should return null if customer not exists in findByField method', async () => {
    const result = await customerRepository.findByField('id', '2');

    expect(result.value).toBeNull();
  });
});
