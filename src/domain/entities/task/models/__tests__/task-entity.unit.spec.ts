import { TaskEntity } from '../../task-entity';
import type { InputTaskEntityModel } from '../input-task-entity-model';
import { TaskType } from '../../types/task-type';
import { TaskCategory } from '../../types/task-category';
import { CustomError } from '@/shared';

describe('TaskEntity Unit Tests', () => {
  const accountId = '7d689758-81a1-48c3-aa33-9e84f4a45c67';

  it('should create a valid TaskEntity', () => {
    const taskData: InputTaskEntityModel = {
      id: '7d689758-81a1-48c3-aa33-9e84f4a45c67',
      name: 'Ir para a academia',
      description: 'Treinar perna :s ',
      category: TaskCategory.health,
      type: TaskType.task,
      weekDays: 'Segunda' as any,
      date: '25/10/2025',
      accountId: accountId,
      finallyDate: '25/10/2025',
    };

    const taskEntity = TaskEntity.create(taskData);
    expect(taskEntity).toBeInstanceOf(TaskEntity);
    expect(taskEntity.id).toBe('7d689758-81a1-48c3-aa33-9e84f4a45c67');
  });

  it('should return all error in activity', () => {
    try {
      TaskEntity.create({ id: 'any_id' } as any);
    } catch (error) {
      const errorValue = error as CustomError;
      expect(error).toBeInstanceOf(CustomError);
      expect(errorValue.formatErrors).toStrictEqual({
        codeError: 400,
        messages: [
          'O campo id está inválido',
          'O campo nome é obrigatório',
          'O nome deve ter pelo menos 3 caracteres e apenas letras',
          'O campo Descrição é obrigatório',
          'A descrição deve ter entre 3 e 50 caracteres',
          'O campo Categoria é obrigatório',
          'O campo Categoria deve ter um dos seguintes valores: Career, Finance, Studies, Health, Leisure, Productivity, Several',
          'O campo Tipo é obrigatório',
          'O campo Tipo deve ter um dos seguintes valores: habit, task',
          'Data informada é inválida.',
          'O campo dias da semana é obrigatório',
          'O campo dias da semana deve ter um dos seguintes valores: Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado',
          'Data final informada é inválida.',
        ],
      });
    }
  });
});
