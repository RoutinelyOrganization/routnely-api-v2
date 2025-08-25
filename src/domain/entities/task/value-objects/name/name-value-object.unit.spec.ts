import { FieldIsRequiredError } from '@/domain/errors';
import { TaskNameValueObject } from './name-value-object';
import { InvalidFormatNameError } from '../../error/invalid-name-error';

describe('Name value object', () => {
  it('Should return error if name is empty', () => {
    const name = TaskNameValueObject.create('');
    expect(name.result).toEqual({
      props: [new FieldIsRequiredError('Nome'), new InvalidFormatNameError()],
    });
  });

  it('Should return error if name is less than 3 or more than 100', () => {
    let name = TaskNameValueObject.create('te');
    expect(name.result).toEqual({
      props: [new InvalidFormatNameError()],
    });

    name = TaskNameValueObject.create('T'.repeat(101));
    expect(name.result).toEqual({
      props: [new InvalidFormatNameError()],
    });
  });

  it('Should throw error if name is invalid', () => {
    let name = TaskNameValueObject.create('Teste 1');
    expect(name.result).toEqual({
      props: [new InvalidFormatNameError()],
    });

    name = TaskNameValueObject.create('Test @#');
    expect(name.result).toEqual({
      props: [new InvalidFormatNameError()],
    });
  });

  it('Should return correct name', () => {
    const name = TaskNameValueObject.create('Estudar Programação');
    expect(name.result).toEqual({ props: 'Estudar Programação' });
  });
});
