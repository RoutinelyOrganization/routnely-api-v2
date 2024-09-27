import { CategoriesEnumType } from '@/domain/entities/activity/types';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';

const KeysCategories = Object.values(CategoriesEnumType);

type CategoryError = FieldIsRequiredError | InvalidFieldsValuesError;

export class CategoryValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: CategoriesEnumType): Either<CategoryError[], CategoryValueObject> {
    const errors = this.validate(value);
    if (errors) {
      return left(errors);
    }
    return right(new CategoryValueObject(value));
  }

  private static validate(value: string): CategoryError[] | null {
    this.clearErrors();
    if (!this.hasValue(value)) {
      this.addError(new FieldIsRequiredError('Categoria'));
    }
    if (!this.isValidValue(value)) {
      this.addError(new InvalidFieldsValuesError('Categoria', KeysCategories));
    }
    return this.errors();
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is CategoriesEnumType {
    return KeysCategories.includes(value as CategoriesEnumType);
  }
}
