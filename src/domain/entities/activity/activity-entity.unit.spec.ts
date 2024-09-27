import type { ActivityModel } from '@/domain/entities/activity/types';
import {
  ActivityEnumType,
  CategoriesEnumType,
  WeekDaysEnumType,
} from '@/domain/entities/activity/types';
import { ActivityEntity } from './activity-entity';

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
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toBeInstanceOf(ActivityEntity);

    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } =
      activity.value as ActivityEntity;
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
    const activity = ActivityEntity.create({
      weeklyFrequency: { quantityPerWeek: 0, weekDays: ['any_value'], finallyDate: 'any_value' },
    } as any);

    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual({
      errors: [
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
        'O campo Quantidade semanal deve ser um número positivo',
        'O campo Dias da semana deve ter um dos seguintes valores: monday, tuesday, wednesday, thursday, friday, saturday, sunday',
        'Este campo deve ser uma data válida',
        'A data não pode ser no passado',
      ],
    });
  });
});
