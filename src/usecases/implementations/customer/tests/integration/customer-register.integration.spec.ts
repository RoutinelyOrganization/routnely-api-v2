import { CustomerAggregate } from '@/domain/aggregates/customer';
import { makeCryptography, makeCustomerRepository } from '@/factories';
import { PrismaHelper } from '@/infra/database/prisma';
import { CustomError } from '@/shared/errors/custom-error';
import { data } from '@/usecases/implementations/customer/tests/mocks/stubs-register-custumer';
import { RegisterCustomerUsecase } from '../../register/register-customer-usecase';

const prismaClient = async () => await PrismaHelper.getPrisma();
beforeEach(async () => {
  const prisma = await prismaClient();
  await prisma.account.deleteMany();
});

// factory que instancia a classe criptography

// factory que instancia a classe CustomerRepository
const repository = makeCustomerRepository();
const sut = new RegisterCustomerUsecase(repository);
const cripty = makeCryptography();

describe('Register Customer Usecase Integration', () => {
  it('Should return domain errors ', async () => {
    try {
      await sut.perform({
        ...data,
        acceptedTerms: false,
        name: 'customer *',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      const customError = error as CustomError;
      expect(customError.formatErrors).toStrictEqual({
        codeError: 400,
        messages: [
          'O nome deve ter pelo menos 3 caracteres e apenas letras',
          'Os termos de uso devem ser aceitos',
        ],
      });
    }
  });

  it('should return error if email exists', async () => {
    const prisma = await prismaClient();
    await prisma.customer.create({
      data: {
        name: data.name,
        acceptedTerms: data.acceptedTerms,
        account: {
          create: {
            email: data.email,
            password: cripty.encrypter(data.password),
            acceptedAt: null,
            isVerified: false,
          },
        },
      },
    });

    try {
      await sut.perform(data);
    } catch (error) {
      const customError = error as CustomError;
      expect(customError.formatErrors).toStrictEqual({
        codeError: 409,
        messages: ['Este(a) email já esta cadastrado(a)'],
      });
    }
  });

  it('Should call repository create with correct values', async () => {
    const spy = jest.spyOn(repository, 'create');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith(expect.any(CustomerAggregate));
  });

  it('should return customer on success', async () => {
    const output = await sut.perform(data);
    expect(output).toBeUndefined();
  });
});
