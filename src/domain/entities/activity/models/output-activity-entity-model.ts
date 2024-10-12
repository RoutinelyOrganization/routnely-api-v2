import type {
  ActivityTypeValueObject,
  CategoryValueObject,
  DescriptionValueObject,
  TitleValueObject,
  WeeklyFrequencyValueObject,
} from '@/domain/entities/activity';
import type { DatetimeValueObject } from '@/domain/value-objects';

export type OutputActivityEntityModel = {
  id: string;
  customerId: string;
  title: TitleValueObject;
  description: DescriptionValueObject;
  executeDateTime: DatetimeValueObject;
  type: ActivityTypeValueObject;
  category: CategoryValueObject;
  weeklyFrequency?: WeeklyFrequencyValueObject;
};
