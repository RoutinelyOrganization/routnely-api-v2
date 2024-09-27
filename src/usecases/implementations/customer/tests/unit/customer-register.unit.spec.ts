import { CustomerAggregate } from '@/domain/aggregates/customer';
import { CustomError } from '@/shared/errors/custom-error';
import {
  data,
  makeSutUsecase,
} from '@/usecases/implementations/customer/tests/mocks/stubs-register-custumer';

describe('Register Customer Usecase unit', () => {
  it('Should return domain errors ', async () => {
    const { sut } = makeSutUsecase();
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

  it('Should call usecase with correct values', async () => {
    const { sut } = makeSutUsecase();
    const spy = jest.spyOn(sut, 'perform');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should return error if email exists', async () => {
    const { sut, repository } = makeSutUsecase();
    jest.spyOn(repository, 'findFieldOrNull').mockResolvedValueOnce({
      id: '1',
      name: 'any_name',
      acceptedTerms: true,
      account: {
        id: '1',
        email: 'any_email',
        password: 'any_password',
        isVerified: false,
        acceptedAt: null,
      },
    } as CustomerAggregate);

    try {
      await sut.perform(data);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      const customError = error as CustomError;
      expect(customError.formatErrors).toStrictEqual({
        codeError: 409,
        messages: ['Este(a) email já esta cadastrado(a)'],
      });
    }
  });

  it('Should call repository findByField with correct values', async () => {
    const { sut, repository } = makeSutUsecase();
    const spy = jest.spyOn(repository, 'findFieldOrNull');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith('account', { email: data.email });
  });

  it('Should call repository create with correct values', async () => {
    const { sut, repository } = makeSutUsecase();
    const spy = jest.spyOn(repository, 'create');
    await sut.perform(data);
    expect(spy).toHaveBeenCalledWith(expect.any(CustomerAggregate));
  });

  it('should return customer on success', async () => {
    const { sut } = makeSutUsecase();
    const output = await sut.perform(data);
    expect(output).toBeUndefined();
  });
});
