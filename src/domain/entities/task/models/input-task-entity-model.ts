import type { DaysOfWeek } from '../types/days-of-week';
import type { TaskCategory } from '../types/task-category';
import type { TaskType } from '../types/task-type';

export type InputTaskEntityModel = {
  id: string;
  name: string;
  date: string;
  description: string;
  checked?: boolean;
  finallyDate?: string;
  category: TaskCategory;
  type: TaskType;
  weekDays: DaysOfWeek;
  accountId: string;
  updatedAt?: Date;
  createdAt?: Date;
};
