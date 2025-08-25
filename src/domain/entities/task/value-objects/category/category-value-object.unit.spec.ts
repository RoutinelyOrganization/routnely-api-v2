import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { TaskCategory } from '../../types/task-category';
import { TaskCategoryValueObject } from './category-value-object';

const KeysCategories = Object.values(TaskCategory);
describe('Category value object unit tests', () => {
  it('Should return error if category is empty', () => {
    const category = TaskCategoryValueObject.create('' as any);
    expect(category.result).toEqual({
      props: [
        new FieldIsRequiredError('Categoria'),
        new InvalidFieldsValuesError('Categoria', KeysCategories),
      ],
    });
  });

  it('Should return error if received invalid category', () => {
    const category = TaskCategoryValueObject.create('Test' as any);
    expect(category.result).toEqual({
      props: [new InvalidFieldsValuesError('Categoria', KeysCategories)],
    });
  });

  it('Should return valid category', () => {
    const category = TaskCategoryValueObject.create(TaskCategory.career);
    expect(category.result).toEqual({ props: TaskCategory.career });
  });
});
