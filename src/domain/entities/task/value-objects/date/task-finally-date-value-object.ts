import type { ResultValueObject } from '@/domain/value-objects';
import { ValueObject } from '@/domain/value-objects';
import { TaskDateValueObject } from './task-date-value-object';
import TaskFinallyDateError from '../../error/invalid-final-date';
import { CustomError } from '@/shared';

export type Props = {
  initialDate: TaskDateValueObject;
  finallyDate: string;
};

export default class TaskFinallyDateValueObject extends ValueObject {
  constructor(props: Props) {
    super(props.finallyDate);
    Object.freeze(this);
  }

  static create(props: Props): ResultValueObject {
    this.validate(props.initialDate, props.finallyDate);
    const errors = this.errors();
    return errors
      ? { isvalid: false, result: new CustomError(errors) }
      : { isvalid: true, result: new TaskFinallyDateValueObject(props) };
  }

  private static validate(initialDate: TaskDateValueObject, finallyDate: string): void {
    this.clearErrors();
    if (!this.isFinallyDateValid(initialDate, finallyDate)) {
      this.addError(new TaskFinallyDateError());
    }
  }

  private static isFinallyDateValid(
    initialDate: TaskDateValueObject,
    finallyDate: string,
  ): boolean {
    if (!(initialDate instanceof TaskDateValueObject)) {
      return false;
    }
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dataRegex.test(initialDate.value) || !dataRegex.test(finallyDate)) {
      return false;
    }

    const [initialDay, initialMonth, initialYear] = initialDate.value.split('/').map(Number);
    const [finalDay, finalMonth, finalYear] = finallyDate.split('/').map(Number);
    const parsedInitialDate = new Date(initialYear, initialMonth - 1, initialDay);
    const parsedFinalDate = new Date(finalYear, finalMonth - 1, finalDay);

    if (
      parsedInitialDate.getDate() !== initialDay ||
      parsedInitialDate.getMonth() !== initialMonth - 1 ||
      parsedInitialDate.getFullYear() !== initialYear
    ) {
      return false;
    }

    if (
      parsedFinalDate.getDate() !== finalDay ||
      parsedFinalDate.getMonth() !== finalMonth - 1 ||
      parsedFinalDate.getFullYear() !== finalYear
    ) {
      return false;
    }

    return parsedFinalDate >= parsedInitialDate;
  }
}
