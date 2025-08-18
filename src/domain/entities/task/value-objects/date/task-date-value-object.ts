import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { InvalidDateFormatError } from '../../error/invalid-date-error';
import { CustomError } from '@/shared';

//se tiver id, pegar checked e poe como valor, se nao id, checked como false
export class TaskDateValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): ResultValueObject {
    this.validate(value);
    const errors = this.errors();
    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TaskDateValueObject(value) };
  }

  private static validate(value: string): void {
    this.clearErrors();
    if (!this.isValidDate(value)) {
      this.addError(new InvalidDateFormatError());
    }
  }

  private static isValidDate(date: string): boolean {
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dataRegex.test(date)) {
      return false;
    }

    const [day, month, year] = date.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (
      parsedDate.getDate() !== day ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getFullYear() !== year
    ) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return parsedDate >= currentDate;
    // validar data no presente e no passado para buscar tarefas antigas
  }
}
