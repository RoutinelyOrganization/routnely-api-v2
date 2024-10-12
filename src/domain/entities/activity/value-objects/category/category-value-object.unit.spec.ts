import { CategoriesEnumType } from '@/domain/entities/activity';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/errors';
import { CategoryValueObject } from './category-value-object';

const KeysCategories = Object.values(CategoriesEnumType);

describe('Category Value Object', () => {
  it('Should return error if received empty value', () => {
    const activity = CategoryValueObject.create('' as any);
    expect(activity.result).toEqual({
      props: [
        new FieldIsRequiredError('Categoria'),
        new InvalidFieldsValuesError('Categoria', KeysCategories),
      ],
    });
  });

  it('Should return error if received invalid value', () => {
    const activity = CategoryValueObject.create('test' as any);

    expect(activity.result).toEqual({
      props: [new InvalidFieldsValuesError('Categoria', KeysCategories)],
    });
  });

  it('Should correct category ', () => {
    const activity = CategoryValueObject.create(CategoriesEnumType.career);

    expect(activity.result).toEqual({ props: CategoriesEnumType.career });
  });
});
