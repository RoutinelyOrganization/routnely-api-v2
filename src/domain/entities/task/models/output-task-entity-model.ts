import type { DescriptionValueObject } from '../../activity';
import type { NameValueObject } from '../../customer';
import type { DaysOfWeek } from '../types/days-of-week';
import type { TaskCategory } from '../types/task-category';
import type { TaskType } from '../types/task-type';

export type OutputTaskEntityModel = {
  id: string;
  name: NameValueObject;
  date: Date;
  description: DescriptionValueObject;
  checked: boolean;
  finallyDate?: Date;
  category: TaskCategory;
  type: TaskType;
  weekDays: DaysOfWeek[];
  accountId: string;
};

//se tiver id, pegar checked e poe como valor, se nao id, checked como false
