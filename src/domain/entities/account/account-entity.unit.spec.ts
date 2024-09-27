import { CustomError } from '@/shared/errors/custom-error';
import { AccountEntity } from './account-entity';

//   acceptedAt DateTime  @default(now()) @map("accepted_at")
describe('Account Entity', () => {
  it('Should throe errors on create account', () => {
    try {
      AccountEntity.create({ id: 'any_id', isVerified: 'true' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      const _error = error as CustomError;
      expect(_error.formatErrors).toStrictEqual({
        codeError: 400,
        messages: [
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
          'O campo isVerified está inválido',
          'O campo id está inválido',
          'O campo Email é obrigatório',
          'O campo Email está inválido',
        ],
      });
    }
  });

  it('Should correct instance of Account', () => {
    const account = AccountEntity.create({
      email: 'email@teste.com',
      password: '@Teste123',
    });

    expect(account).toBeInstanceOf(AccountEntity);
    expect(account.email).toBe('email@teste.com');
    expect(account.password).toBe('@Teste123');
  });
});
