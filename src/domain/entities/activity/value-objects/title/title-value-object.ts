import { InvalidFormatTitleError } from '@/domain/entities/activity/errors';
import { ValueObject } from '@/domain/entities/value-object';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';
import { FieldIsRequiredError } from './../../../../shared/errors/field-is-required-error';

type TitleError = FieldIsRequiredError | InvalidFormatTitleError;

export class TitleValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): Either<TitleError[], TitleValueObject> {
    const errors = this.validate(value);
    if (errors) {
      return left(errors);
    }

    return right(new TitleValueObject(value.trim()));
  }

  private static validate(value: string): TitleError[] | null {
    this.clearErrors();
    if (!this.hasTitle(value)) {
      this.addError(new FieldIsRequiredError('Título'));
    }
    if (!this.hasCorrectTitleFormat(value)) {
      this.addError(new InvalidFormatTitleError());
    }
    return this.errors();
  }

  private static hasTitle(title: string): boolean {
    return !!title;
  }

  private static hasCorrectTitleFormat(title: string): boolean {
    if (!title || title.length < 3 || title.length > 50) {
      return false;
    }

    return true;
  }
}
