import { makeCryptography } from '@/factories/infra/criptography';
import { testeServer } from '@/infra/api/routes/config/supertest';
import { PrismaHelper } from '@/infra/database/prisma/helpers';

beforeEach(async () => {
  const prisma = await PrismaHelper.getPrisma();
  await prisma.account.deleteMany();
});

describe('RegisterCustomer E2E', () => {
  it('Should return status-code 204 and no body on success', async () => {
    const request = await testeServer();
    const response = await request.post('/user').send({
      name: 'John Doe',
      email: '2oJbM@example.com',
      password: '@Teste123',
      confirmPassword: '@Teste123',
      acceptedTerms: true,
    });

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('Should return status-code 400 and body with errors description', async () => {
    const request = await testeServer();
    const response = await request.post('/user').send({
      name: 'John Doe',
      email: '2oJbM@example.com',
      password: '@Teste123',
      confirmPassword: '@Teste123',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: ['acceptedTerms: O aceite dos termos e condições é obrigatório'],
    });
  });

  it('Should return status-code 400 if email already exists', async () => {
    const request = await testeServer();

    const email = '2oJbM@example.com';
    const cripty = makeCryptography();

    const prisma = await PrismaHelper.getPrisma();
    await prisma.customer.create({
      data: {
        name: 'any name',
        acceptedTerms: true,
        account: { create: { email: email, password: cripty.encrypter('@Teste123') } },
      },
    });
    const response = await request.post('/user').send({
      name: 'John Doe',
      email: email,
      password: '@Teste123',
      confirmPassword: '@Teste123',
      acceptedTerms: true,
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      errors: ['Este(a) email já esta cadastrado(a)'],
    });
  });
});
