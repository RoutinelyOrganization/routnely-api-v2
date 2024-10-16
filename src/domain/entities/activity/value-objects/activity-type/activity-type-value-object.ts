import { ActivityEnumType } from '@/domain/entities/activity';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import type { ResultValueObject } from '@/domain/value-objects/value-object';
import { ValueObject } from '@/domain/value-objects/value-object';
import { CustomError } from '@/shared/errors/custom-error';

const KeysActivityEnumType = Object.values(ActivityEnumType);

export class ActivityTypeValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: ActivityEnumType): ResultValueObject {
    this.validate(value);
    const errors = this.errors();
    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new ActivityTypeValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasValue(value)) {
      this.addError(new FieldIsRequiredError('Tipo'));
    }
    if (!this.isValidValue(value)) {
      this.addError(new InvalidFieldsValuesError('Tipo', KeysActivityEnumType));
    }
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is ActivityEnumType {
    return KeysActivityEnumType.includes(value as ActivityEnumType);
  }
}
