import { ActivityEntity } from '@/domain/entities/activity/activity-entity';
import type { ActivityModel } from '@/domain/entities/activity/models/activity-model';
import { WeekDaysEnumType } from '@/domain/entities/activity/models/weekly-frequency-model';
import { ActivityEnumType, CategoriesEnumType } from '@/domain/entities/activity/types';
import { CustomError } from '@/shared/errors/custom-error';

const now = new Date();
const futureDate = new Date(now);
futureDate.setDate(now.getDate() + 10);

const activityData: ActivityModel = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  customerId: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Activity',
  description: 'Activity description',
  executeDateTime: futureDate,
  type: ActivityEnumType.task,
  category: CategoriesEnumType.leisure,
  weeklyFrequency: {
    quantityPerWeek: 2,
    finallyDate: futureDate,
    weekDays: [WeekDaysEnumType.monday],
  },
};

describe('Activity Entity', () => {
  it('Should correct instance of Activity', () => {
    const activity = ActivityEntity.create(activityData);
    expect(activity).toBeInstanceOf(ActivityEntity);

    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } =
      activity;
    expect(id).toEqual(activityData.id);
    expect(customerId).toEqual(activityData.customerId);
    expect(title).toEqual(activityData.title);
    expect(description).toEqual(activityData.description);
    expect(executeDateTime).toEqual(activityData.executeDateTime);
    expect(type).toEqual(activityData.type);
    expect(category).toEqual(activityData.category);
    expect(weeklyFrequency).toEqual(activityData.weeklyFrequency);
  });

  it('Should return all errors in activity', () => {
    try {
      ActivityEntity.create({ id: 'any_id' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);

      const errorValue = error as CustomError;
      expect(errorValue.formatErrors).toStrictEqual({
        codeError: 400,
        messages: [
          'O campo id está inválido',
          'O campo Título é obrigatório',
          'O título deve ter entre 3 e 50 caracteres',
          'O campo Descrição é obrigatório',
          'A descrição deve ter entre 3 e 50 caracteres',
          'O campo Data e hora é obrigatório',
          'Este campo deve ser uma data válida',
          'O campo Tipo é obrigatório',
          'O campo Tipo deve ter um dos seguintes valores: habit, task',
          'O campo Categoria é obrigatório',
          'O campo Categoria deve ter um dos seguintes valores: Career, Finance, Studies, Health, Leisure, Productivity, Several',
        ],
      });
    }
  });
});
