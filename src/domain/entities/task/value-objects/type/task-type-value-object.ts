import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { TaskType } from '../../types/task-type';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { CustomError } from '@/shared';

const KeysTaskEnumType = Object.values(TaskType);

export class TaskTypeValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: TaskType): ResultValueObject {
    this.validate(value);
    const errors = this.errors();
    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TaskTypeValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasValue(value)) {
      this.addError(new FieldIsRequiredError('Tipo'));
    }

    if (!this.isValidValue(value)) {
      this.addError(new InvalidFieldsValuesError('Tipo', KeysTaskEnumType));
    }
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is TaskType {
    return KeysTaskEnumType.includes(value as TaskType);
  }
}
