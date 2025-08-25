import { FieldIsRequiredError } from '@/domain/errors';
import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { CustomError } from '@/shared';
import { InvalidFormatDescriptionError } from '../../error/invalid-description-error';

export class TaskDescriptionValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): ResultValueObject {
    this.validate(value);
    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TaskDescriptionValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasDescription(value)) {
      this.addError(new FieldIsRequiredError('Descrição'));
    }
    if (!this.hasCorrectDescriptionFormat(value)) {
      this.addError(new InvalidFormatDescriptionError());
    }
  }

  private static hasDescription(description: string): boolean {
    return !!description;
  }

  private static hasCorrectDescriptionFormat(description: string): boolean {
    if (!description || description.length < 10 || description.length > 1000) {
      return false;
    }
    return true;
  }
}
