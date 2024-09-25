import { makeCryptography, makeCustomerRepository } from '@/factories';
import { PrismaHelper } from '@/infra/database/prisma/helpers';
import { CustomError } from '@/shared/errors/custom-error';
import { RegisterCustomerUsecase } from '@/usecases/implementations/customer/register/register-customer-usecase';
import { data } from '@/usecases/implementations/customer/tests/mocks/stubs-register-custumer';

const prismaClient = async () => await PrismaHelper.getPrisma();
beforeEach(async () => {
  const prisma = await prismaClient();
  await prisma.customer.deleteMany({
    where: {
      email: data.email,
    },
  });
});

// factory que instancia a classe criptography
const criptography = makeCryptography();

// factory que instancia a classe CustomerRepository
const repository = makeCustomerRepository();
const sut = new RegisterCustomerUsecase(repository, criptography);

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
        id: '1',
        name: data.name,
        email: data.email,
        account: { create: { password: data.password } },
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
    jest.spyOn(criptography, 'encrypter').mockResolvedValueOnce('passwordHashed');
    const spy = jest.spyOn(repository, 'create');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith({
      ...data,
      password: 'passwordHashed',
      id: expect.any(String),
    });
  });

  it('should return customer on success', async () => {
    const output = await sut.perform(data);
    expect(output).toBeUndefined();
  });
});
