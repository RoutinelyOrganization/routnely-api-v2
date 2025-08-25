import { InvalidDateFormatError } from '../../error/invalid-date-error';
import TaskFinallyDateError from '../../error/invalid-final-date';
import { TaskDateValueObject } from './task-date-value-object';
import TaskFinallyDateValueObject from './task-finally-date-value-object';

describe('TaskDateValueObject Unit test', () => {
  it('Should return error if date is incorrect', () => {
    const date = TaskDateValueObject.create('123123123');
    expect(date.result).toEqual({
      props: [new InvalidDateFormatError()],
    });
  });

  it('Should return success if date is correct', () => {
    const date = TaskDateValueObject.create('10/11/2028');
    expect(date.isvalid).toBeTruthy();
    expect(date.result).toBeInstanceOf(TaskDateValueObject);
    expect(date.result).toEqual({ props: '10/11/2028' });
  });

  it('Should return error if date is in the past', () => {
    const date = TaskDateValueObject.create('01/01/2020');
    expect(date.result).toEqual({
      props: [new InvalidDateFormatError()],
    });
  });

  describe('TaskFinallyDateValueObject Unit Test', () => {
    it('Should return error if final date is before initial date', () => {
      const finallyDate = TaskFinallyDateValueObject.create({
        initialDate: TaskDateValueObject.create('10/08/2025').result as TaskDateValueObject,
        finallyDate: '09/08/2025',
      });
      expect(finallyDate.result).toEqual({
        props: [new TaskFinallyDateError()],
      });
    });

    it('should return error if initialDate is empty', () => {
      const finallyDate = TaskFinallyDateValueObject.create({
        initialDate: TaskDateValueObject.create('').result as TaskDateValueObject,
        finallyDate: '10/08/2025',
      });
      console.log(finallyDate);
      expect(finallyDate.result).toEqual({
        props: [new TaskFinallyDateError()],
      });
    });

    it('should return error if finalDate is empty', () => {
      const finallyDate = TaskFinallyDateValueObject.create({
        initialDate: TaskDateValueObject.create('').result as TaskDateValueObject,
        finallyDate: '10/08/2025',
      });
      expect(finallyDate.result).toEqual({
        props: [new TaskFinallyDateError()],
      });
    });

    it('Should create TaskFinallyDateValueObject if final date is equal to initial date', () => {
      const finallyDate = TaskFinallyDateValueObject.create({
        initialDate: TaskDateValueObject.create('11/08/2028').result as TaskDateValueObject,
        finallyDate: '11/08/2028',
      });
      expect(finallyDate.isvalid).toBeTruthy();
      expect(finallyDate.result).toBeInstanceOf(TaskFinallyDateValueObject);
      expect(finallyDate.result).toEqual({
        props: '11/08/2028',
      });
    });
  });
});
