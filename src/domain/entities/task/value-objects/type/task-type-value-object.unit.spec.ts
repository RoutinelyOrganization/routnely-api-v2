import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { TaskType } from '../../types/task-type';
import { TaskTypeValueObject } from './task-type-value-object';

const KeysTaskTypeEnum = Object.values(TaskType);

describe('Task Type Value Object Unit Tests', () => {
  it('Should return error if received value is empty', () => {
    const taskType = TaskTypeValueObject.create('' as any);
    expect(taskType.result).toEqual({
      props: [
        new FieldIsRequiredError('Tipo'),
        new InvalidFieldsValuesError('Tipo', KeysTaskTypeEnum),
      ],
    });
  });

  it('Should return error if received value is invalid', () => {
    const taskType = TaskTypeValueObject.create('test' as any);
    expect(taskType.result).toEqual({
      props: [new InvalidFieldsValuesError('Tipo', KeysTaskTypeEnum)],
    });
  });

  it('Should return correct task type', () => {
    const taskType = TaskTypeValueObject.create(TaskType.task);
    expect(taskType.result).toEqual({ props: TaskType.task });
  });
});
