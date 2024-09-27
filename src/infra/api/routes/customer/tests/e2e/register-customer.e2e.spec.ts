import { testeServer } from '@/infra/api/routes/config/supertest';
import { PrismaHelper } from '@/infra/database/prisma/helpers';

beforeEach(async () => {
  const prisma = await PrismaHelper.getPrisma();
  await prisma.customer.deleteMany();
});

describe('RegisterCustomer E2E', () => {
  it('Should return status-code 204 and body undefined on success', async () => {
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

  it('Should return status-code 400 and body undefined on error', async () => {
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

    const prisma = await PrismaHelper.getPrisma();
    await prisma.customer.create({
      data: {
        id: 'any_id',
        name: 'any_name',
        email: email,
        account: { create: { password: 'any_password' } },
      },
    });
    const response = await request.post('/user').send({
      name: 'John Doe',
      email: email,
      password: '@Teste123',
      confirmPassword: '@Teste123',
      acceptedTerms: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: ['O email informado já existe'],
    });
  });
});
