import type {
  ActivityEnumType,
  CategoriesEnumType,
  WeeklyFrequencyModel,
} from '@/domain/entities/activity';

export type InputActivityEntityModel = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  executeDateTime: Date;
  type: ActivityEnumType;
  category: CategoriesEnumType;
  weeklyFrequency?: WeeklyFrequencyModel;
};
