import { CustomError } from '@/shared/errors/custom-error';
import { CustomerEntity } from './customer-entity';

const dataCustomer = {
  name: 'Customer',
  acceptedTerms: true,
};

describe('Customer Entity', () => {
  it('Should correct instance of Customer', () => {
    const customer = CustomerEntity.create(dataCustomer);

    expect(customer).toBeInstanceOf(CustomerEntity);

    const { id, name, acceptedTerms } = customer;

    expect(id).toBeTruthy();
    expect(name).toEqual(dataCustomer.name);

    expect(acceptedTerms).toEqual(dataCustomer.acceptedTerms);
  });

  it('Should return all errors', () => {
    try {
      CustomerEntity.create({ id: 'any_id' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);

      const _errors = error as CustomError;
      expect(_errors.formatErrors).toStrictEqual({
        codeError: 400,
        messages: [
          'O campo id está inválido',
          'O campo nome é obrigatório',
          'O nome deve ter pelo menos 3 caracteres e apenas letras',
          'Os termos de uso devem ser aceitos',
        ],
      });
    }
  });
});
