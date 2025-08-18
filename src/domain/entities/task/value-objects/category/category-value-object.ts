import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { TaskCategory } from '../../types/task-category';
import { CustomError } from '@/shared';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';

const KeysCategories = Object.values(TaskCategory);

export class TaskCategoryValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: TaskCategory): ResultValueObject {
    this.validate(value);
    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TaskCategoryValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasValue(value)) {
      this.addError(new FieldIsRequiredError('Categoria'));
    }
    if (!this.isValidValue(value)) {
      this.addError(new InvalidFieldsValuesError('Categoria', KeysCategories));
    }
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is TaskCategory {
    return KeysCategories.includes(value as TaskCategory);
  }
}
