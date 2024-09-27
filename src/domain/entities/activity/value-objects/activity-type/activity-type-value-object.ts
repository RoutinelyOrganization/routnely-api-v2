import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';
import { ActivityEnumType } from '../../types';

const KeysActivityEnumType = Object.values(ActivityEnumType);

type ActivityTypeError = FieldIsRequiredError | InvalidFieldsValuesError;

export class ActivityTypeValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: ActivityEnumType): Either<ActivityTypeError[], ActivityTypeValueObject> {
    const errors = this.validate(value);
    if (errors) {
      return left(errors);
    }
    return right(new ActivityTypeValueObject(value));
  }

  private static validate(value: string): ActivityTypeError[] | null {
    this.clearErrors();
    if (!this.hasValue(value)) {
      this.addError(new FieldIsRequiredError('Tipo'));
    }
    if (!this.isValidValue(value)) {
      this.addError(new InvalidFieldsValuesError('Tipo', KeysActivityEnumType));
    }
    return this.errors();
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is ActivityEnumType {
    return KeysActivityEnumType.includes(value as ActivityEnumType);
  }
}
