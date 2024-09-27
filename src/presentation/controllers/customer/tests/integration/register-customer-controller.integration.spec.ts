import { makeRegisterCustomerUsecase } from '@/factories';
import { PrismaHelper } from '@/infra/database/prisma/helpers';
import { RegisterCustomerValidator } from '@/infra/validators';
import { RegisterCustomerController } from '@/presentation/controllers';
import { serverError } from '@/presentation/helpers/http-helpers';
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

const body = { ...data, confirmPassword: data.password };
const validator = new RegisterCustomerValidator();
const usecase = makeRegisterCustomerUsecase();
const sut = new RegisterCustomerController(validator, usecase);

describe('RegisterCustomerController Integration test', () => {
  it('Should call validator with expected values', async () => {
    const spy = jest.spyOn(validator, 'validate');
    await sut.handle({ body: data });
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('Should return error if not name', async () => {
    const output = await sut.handle({ body: { ...body, name: '' } });

    expect(output.body).toEqual({
      errors: [
        'name: O nome deve conter pelo menos 3 letras',
        'name: O nome deve conter apenas letras',
      ],
    });
  });

  it('Should return error if not email', async () => {
    const output1 = await sut.handle({ body: { ...body, email: undefined } });
    expect(output1.body).toEqual({ errors: ['email: O email é obrigatório'] });

    const output2 = await sut.handle({ body: { ...body, email: '' } });
    expect(output2.body).toEqual({ errors: ['email: O email deve ser válido'] });
  });

  it('Should return error if password invalids', async () => {
    let output = await sut.handle({ body: { ...body, password: undefined } });

    expect(output.body).toEqual({ errors: ['password: A senha é obrigatória'] });

    output = await sut.handle({ body: { ...body, password: '' } });
    expect(output.body).toEqual({
      errors: [
        'password: A senha deve ter pelo menos 6 caracteres',
        'password: A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
        'confirmPassword: As senhas precisam ser iguais',
      ],
    });
  });

  it('Should return error if confirmPassword invalids', async () => {
    let output = await sut.handle({ body: { ...body, confirmPassword: undefined } });
    expect(output.body).toEqual({
      errors: ['confirmPassword: A confirmação da senha é obrigatória'],
    });

    output = await sut.handle({ body: { ...body, confirmPassword: '' } });
    expect(output.body).toEqual({
      errors: [
        'confirmPassword: A confirmação da senha deve ter pelo menos 6 caracteres',
        'confirmPassword: A confirmação da senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
        'confirmPassword: As senhas precisam ser iguais',
      ],
    });
  });

  it('Should return error if acceptedTerms is false or undefined', async () => {
    const output = await sut.handle({ body: { ...body, acceptedTerms: false } });
    expect(output.body).toEqual({
      errors: ['acceptedTerms: O aceite dos termos e condições é obrigatório'],
    });
  });

  it('Should call usecase with correct values', async () => {
    const spy = jest.spyOn(usecase, 'perform');
    await sut.handle({ body: body });
    expect(spy).toHaveBeenCalledWith(body);
  });

  it('Should return ok in usecase', async () => {
    const output = await sut.handle({ body });

    expect(output.statusCode).toBe(204);
    expect(output.body).toBeNull();
  });

  it('Should return error in usecase', async () => {
    const prisma = await prismaClient();

    await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        account: { create: { password: data.password } },
      },
    });
    const output = await sut.handle({ body });

    expect(output.body).toEqual({ errors: ['O email informado já existe'] });
  });

  it('Should return server error', async () => {
    jest.spyOn(usecase, 'perform').mockRejectedValueOnce(new Error());
    const output = await sut.handle({ body });

    expect(output).toEqual(serverError(new Error()));
    expect(output.statusCode).toBe(500);
  });
});
