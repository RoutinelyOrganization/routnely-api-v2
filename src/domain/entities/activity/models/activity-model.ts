import type {
  ActivityEnumType,
  CategoriesEnumType,
  WeeklyFrequencyModel,
} from '@/domain/entities/activity/types';

export type ActivityModel = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  executeDateTime: Date;
  type: ActivityEnumType;
  category: CategoriesEnumType;
  weeklyFrequency?: WeeklyFrequencyModel;
};
