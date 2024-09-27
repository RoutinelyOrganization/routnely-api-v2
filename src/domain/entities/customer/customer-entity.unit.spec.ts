import { CustomerEntity } from './customer-entity';

const dataCustomer = {
  name: 'Customer',
  email: 'email@teste.com',
  acceptedTerms: true,
};

describe('Customer Entity', () => {
  it('Should correct instance of Customer', () => {
    const customer = CustomerEntity.create(dataCustomer);
    expect(customer.isRight()).toBeTruthy();
    expect(customer.value).toBeInstanceOf(CustomerEntity);

    const { id, name, email, acceptedTerms } = customer.value as CustomerEntity;

    expect(id).toBeTruthy();
    expect(name).toEqual(dataCustomer.name);
    expect(email).toEqual(dataCustomer.email);

    expect(acceptedTerms).toEqual(dataCustomer.acceptedTerms);
  });

  it('Should return all errors', () => {
    const customer = CustomerEntity.create({ id: 'dffmdpbmpmf' } as any);

    expect(customer.isLeft()).toBeTruthy();
    expect(customer.value).toEqual({
      errors: [
        'O campo id está inválido',
        'O campo nome é obrigatório',
        'O nome deve ter pelo menos 3 caracteres e apenas letras',
        'O campo Email é obrigatório',
        'O campo Email está inválido',
        'Os termos de uso devem ser aceitos',
      ],
    });
  });
});
