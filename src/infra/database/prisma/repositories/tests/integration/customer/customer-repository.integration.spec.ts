import { CustomerAggregate } from '@/domain/aggregates/customer';
import { makeCryptography } from '@/factories';
import { PrismaHelper } from '@/infra/database/prisma';
import { CustomerRepository } from '@/infra/database/prisma/repositories/customer/customer-repository-infra';
import { makeCustomerRepository } from '@/infra/database/prisma/repositories/tests/mock/customer/customer-repository-stub';

const customerRepository = new CustomerRepository(makeCryptography());
const { data } = makeCustomerRepository();
const customerAggregate = CustomerAggregate.create(data);

beforeAll(async () => {
  const prisma = await PrismaHelper.getPrisma();
  await prisma.account.deleteMany();
});

describe('customer-repository unit test', () => {
  it('Should return void in create method', async () => {
    const result = await customerRepository.create(customerAggregate);

    expect(result).toBeUndefined();

    const custumerCreated = await customerRepository.findFieldOrNull('id', customerAggregate.id);

    expect(custumerCreated).toEqual(customerAggregate);
  });

  it('Should return correct data  if customer exists in findByField method', async () => {
    const result = await customerRepository.findFieldOrNull('id', customerAggregate.id);

    expect(result).toEqual(customerAggregate);
  });

  it('Should return null if customer not exists in findByField method', async () => {
    const result = await customerRepository.findFieldOrNull('id', '2');

    expect(result).toBeNull();
  });
});
