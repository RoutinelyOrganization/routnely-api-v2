import { InvalidFormatTitleError } from '@/domain/entities/activity/errors';
import type { ResultValueObject } from '@/domain/value-objects/value-object';
import { ValueObject } from '@/domain/value-objects/value-object';
import { CustomError } from '@/shared/errors/custom-error';
import { FieldIsRequiredError } from '../../../../errors/field-is-required-error';

export class TitleValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): ResultValueObject {
    this.validate(value);
    const errors = this.errors();

    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TitleValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.hasTitle(value)) {
      this.addError(new FieldIsRequiredError('Título'));
    }
    if (!this.hasCorrectTitleFormat(value)) {
      this.addError(new InvalidFormatTitleError());
    }
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
