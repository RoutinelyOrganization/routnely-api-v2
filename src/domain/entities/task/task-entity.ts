import { CustomError } from '@/shared';
import { DescriptionValueObject } from '../activity';
import { NameValueObject } from '../customer';
import { Entity } from '../entity';
import type { InputTaskEntityModel } from './models/input-task-entity-model';
import type { OutputTaskEntityModel } from './models/output-task-entity-model';
import type { TaskCategory } from './types/task-category';
import type { TaskType } from './types/task-type';
import { TaskCategoryValueObject } from './value-objects/category/category-value-object';
import { TaskTypeValueObject } from './value-objects/type/task-type-value-object';
import { WeekDaysValueObject } from './value-objects/weekDays/week-days-value-object';
import { TaskDateValueObject } from './value-objects/date/task-date-value-object';
import TaskFinallyDateValueObject from './value-objects/date/task-finally-date-value-object';

export class TaskEntity extends Entity<OutputTaskEntityModel> {
  constructor(protected props: OutputTaskEntityModel) {
    super(props);
    Object.freeze(this);
  }

  static create(data: InputTaskEntityModel): TaskEntity {
    const result = this.validate(data);
    return new TaskEntity(result);
  }

  private static validate(props: InputTaskEntityModel): OutputTaskEntityModel {
    const { id, name, description, category, type, weekDays, date, accountId, finallyDate } = props;
    const idOrError = this.validateId(id);
    const accountIdOrError = this.validateId(accountId);
    const nameOrError = NameValueObject.create(name as any);
    const descriptionOrError = DescriptionValueObject.create(description as any);
    const categoryOrError = TaskCategoryValueObject.create(category as TaskCategory);
    const typeOrError = TaskTypeValueObject.create(type as TaskType);
    const weekDaysOrError = WeekDaysValueObject.create(weekDays as any);
    const dateOrError = TaskDateValueObject.create(date as any);
    const finallyDateOrError = TaskFinallyDateValueObject.create({
      initialDate: dateOrError.result as TaskDateValueObject,
      finallyDate: finallyDate as string,
    });

    const responses = [
      idOrError,
      accountIdOrError,
      nameOrError,
      descriptionOrError,
      categoryOrError,
      typeOrError,
      dateOrError,
      weekDaysOrError,
      finallyDateOrError,
    ];

    for (const response of responses) {
      if (!response.isvalid) {
        this.addError(response.result.errors);
      }
    }

    const errors = this.errors();
    if (errors) {
      throw new CustomError(errors);
    }

    return {
      id: idOrError.result as string,
      name: nameOrError.result as NameValueObject,
      date: dateOrError.result as any,
      description: descriptionOrError.result as DescriptionValueObject,
      checked: accountId ? true : false,
      finallyDate: finallyDateOrError.result as any,
      category: categoryOrError.result as any,
      type: typeOrError.result as any,
      weekDays: weekDaysOrError.result as any,
      accountId: accountIdOrError.result as string,
    };
  }

  toJson() {
    return {
      id: this.props.id,
      name: this.props.name,
      date: this.props.date,
      description: this.props.description,
      checked: this.props.checked,
      finallyDate: this.props.finallyDate,
      category: this.props.category,
      type: this.props.type,
      weekDays: this.props.weekDays,
      accountId: this.props.accountId,
    };
  }
}
