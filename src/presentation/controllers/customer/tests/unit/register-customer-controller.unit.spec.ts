import { serverError } from '@/presentation/helpers/http-helpers';
import { left, right } from '@/shared/either';
import { makeSutController } from '../mock/stubs-register-controller';

describe('RegisterCustomerController unit test', () => {
  it('Should return error in validator', async () => {
    const { sut, validator } = makeSutController();
    jest.spyOn(validator, 'validate').mockReturnValueOnce(left(new Error('any_message')));

    const output = await sut.handle({});

    expect(output.body).toEqual({ errors: ['any_message'] });
  });

  it('Should call validator with correct values', async () => {
    const { sut, validator } = makeSutController();
    const spy = jest.spyOn(validator, 'validate');
    await sut.handle({ body: {} });
    expect(spy).toHaveBeenCalledWith({});
  });

  it('Should return error in usecase', async () => {
    const { sut, usecase } = makeSutController();
    jest.spyOn(usecase, 'perform').mockResolvedValueOnce(left(new Error('any_error')));

    const output = await sut.handle({});

    expect(output.body).toEqual({ errors: ['any_error'] });
  });

  it('Should call usecase with correct values', async () => {
    const { sut, usecase } = makeSutController();
    const spy = jest.spyOn(usecase, 'perform');
    await sut.handle({ body: {} });
    expect(spy).toHaveBeenCalledWith({});
  });

  it('Should return ok in usecase', async () => {
    const { sut, usecase } = makeSutController();

    jest.spyOn(usecase, 'perform').mockResolvedValueOnce(right());
    const output = await sut.handle({});

    expect(output.statusCode).toBe(204);
    expect(output.body).toBeNull();
  });

  it('Should return server error', async () => {
    const { sut, usecase } = makeSutController();
    jest.spyOn(usecase, 'perform').mockRejectedValueOnce(new Error());
    const output = await sut.handle({});

    expect(output).toEqual(serverError(new Error()));
    expect(output.statusCode).toBe(500);
  });
});
