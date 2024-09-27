import { right } from '@/shared/either';
import type { CustomerRepositoryDto } from '@/usecases/contracts/database';
import {
  data,
  makeSutUsecase,
} from '@/usecases/implementations/customer/tests/mocks/stubs-register-custumer';

describe('Register Customer Usecase unit', () => {
  it('Should return domain errors ', async () => {
    const { sut } = makeSutUsecase();
    const output = await sut.perform({
      ...data,
      acceptedTerms: false,
      name: 'customer *',
    });

    expect(output.value).toEqual({
      errors: [
        'O nome deve ter pelo menos 3 caracteres e apenas letras',
        'Os termos de uso devem ser aceitos',
      ],
    });
  });

  it('Should call usecase with correct values', async () => {
    const { sut } = makeSutUsecase();
    const spy = jest.spyOn(sut, 'perform');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should return error if email exists', async () => {
    const { sut, repository } = makeSutUsecase();
    jest.spyOn(repository, 'findByField').mockResolvedValueOnce(
      right({
        id: '1',
        name: 'any_name',
        email: 'any_email',
        acceptedTerms: true,
        password: 'any_password',
      } as CustomerRepositoryDto),
    );

    const output = await sut.perform(data);

    expect(output.value).toEqual({
      errors: ['O email informado já existe'],
    });
  });

  it('Should call cryptography with correct values', async () => {
    const { cryptography, sut } = makeSutUsecase();

    const spy = jest.spyOn(cryptography, 'encrypter');

    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith(data.password);
  });

  it('Should call repository findByField with correct values', async () => {
    const { sut, repository } = makeSutUsecase();
    const spy = jest.spyOn(repository, 'findByField');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith('email', data.email);
  });

  it('Should call repository create with correct values', async () => {
    const { sut, repository, cryptography } = makeSutUsecase();
    jest.spyOn(cryptography, 'encrypter').mockResolvedValueOnce('password');
    const spy = jest.spyOn(repository, 'create');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith({ ...data, password: 'password', id: expect.any(String) });
  });

  it('should return customer on success', async () => {
    const { sut } = makeSutUsecase();
    const output = await sut.perform(data);
    expect(output.value).toBeUndefined();
  });
});
