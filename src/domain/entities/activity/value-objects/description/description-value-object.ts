import { InvalidFormatDescriptionError } from '@/domain/entities/activity/errors';
import { ValueObject } from '@/domain/entities/value-object';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';

type DescriptionError = FieldIsRequiredError | InvalidFormatDescriptionError;

export class DescriptionValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): Either<DescriptionError[], DescriptionValueObject> {
    const errors = this.validate(value);
    if (errors) {
      return left(errors);
    }

    return right(new DescriptionValueObject(value.trim()));
  }

  private static validate(value: string): DescriptionError[] | null {
    this.clearErrors();
    if (!this.hasDescription(value)) {
      this.addError(new FieldIsRequiredError('Descrição'));
    }
    if (!this.hasCorrectDescriptionFormat(value)) {
      this.addError(new InvalidFormatDescriptionError());
    }
    return this.errors();
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
