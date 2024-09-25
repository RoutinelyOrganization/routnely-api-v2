import { CategoriesEnumType } from '@/domain/entities/activity/types';
import type { ResultValueObject } from '@/domain/entities/value-object';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { CustomError } from '@/shared/errors/custom-error';

const KeysCategories = Object.values(CategoriesEnumType);

export class CategoryValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: CategoriesEnumType): ResultValueObject {
    this.validate(value);

    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new CategoryValueObject(value) };
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

  private static isValidValue(value: string): value is CategoriesEnumType {
    return KeysCategories.includes(value as CategoriesEnumType);
  }
}
