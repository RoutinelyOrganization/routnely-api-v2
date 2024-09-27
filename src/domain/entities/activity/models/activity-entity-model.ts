import type {
  ActivityTypeValueObject,
  CategoryValueObject,
  DatetimeValueObject,
  DescriptionValueObject,
  TitleValueObject,
  WeeklyFrequencyValueObject,
} from '../value-objects';

export type ActivityEntityModel = {
  id: string;
  customerId: string;
  title: TitleValueObject;
  description: DescriptionValueObject;
  executeDateTime: DatetimeValueObject;
  type: ActivityTypeValueObject;
  category: CategoryValueObject;
  weeklyFrequency?: WeeklyFrequencyValueObject;
};
