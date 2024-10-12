import { InvalidFormatDescriptionError } from '@/domain/entities/activity';
import { FieldIsRequiredError } from '@/domain/errors';
import type { ResultValueObject } from '@/domain/value-objects/value-object';
import { ValueObject } from '@/domain/value-objects/value-object';
import { CustomError } from '@/shared/errors/custom-error';

export class DescriptionValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): ResultValueObject {
    this.validate(value);

    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new DescriptionValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasDescription(value)) {
      this.addError(new FieldIsRequiredError('Descrição'));
    }
    if (!this.hasCorrectDescriptionFormat(value)) {
      this.addError(new InvalidFormatDescriptionError());
    }
  }

  private static hasDescription(description: string): boolean {
    return !!description;
  }

  private static hasCorrectDescriptionFormat(description: string): boolean {
    if (!description || description.length < 10 || description.length > 500) {
      return false;
    }
    return true;
  }
}
