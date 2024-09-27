import { AccountEntity } from '@/domain/entities/account';
import { CustomError } from '@/shared/errors';
import { CustomerAggregate } from './customer-aggregate';

describe('Customer Aggregate Unit Test', () => {
  it('Should throw error on create', () => {
    try {
      CustomerAggregate.create({ id: 'any_id', isVerified: 'true' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      const _error = error as CustomError;
      expect(_error.formatErrors).toStrictEqual({
        codeError: 400,
        messages: [
          'O campo id está inválido',
          'O campo nome é obrigatório',
          'O nome deve ter pelo menos 3 caracteres e apenas letras',
          'Os termos de uso devem ser aceitos',
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
          'O campo isVerified está inválido',
          'O campo Email é obrigatório',
          'O campo Email está inválido',
        ],
      });
    }
  });

  it('Should correct instance of Customer', () => {
    const customer = CustomerAggregate.create({
      name: 'Customer',
      email: 'email@teste.com',
      password: '@Teste123',
      acceptedTerms: true,
    });

    expect(customer).toBeInstanceOf(CustomerAggregate);
    const { id, name, acceptedTerms, account } = customer;
    expect(id).toEqual(expect.any(String));
    expect(name).toEqual('Customer');
    expect(acceptedTerms).toEqual(true);
    expect(account).toBeInstanceOf(AccountEntity);
    expect(account.email).toEqual('email@teste.com');
    expect(account.password).toEqual('@Teste123');
    expect(account.isVerified).toEqual(false);
    expect(account.acceptedAt).toEqual(null);
  });
});
