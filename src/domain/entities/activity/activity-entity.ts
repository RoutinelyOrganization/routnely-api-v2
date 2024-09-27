import type {
  ActivityEntityModel,
  ActivityModel,
  ResponseEntityActivityType,
  WeeklyFrequencyModel,
} from '@/domain/entities/activity/types';
import {
  ActivityTypeValueObject,
  CategoryValueObject,
  DatetimeValueObject,
  DescriptionValueObject,
  TitleValueObject,
  WeeklyFrequencyValueObject,
} from '@/domain/entities/activity/value-objects';
import { left, right } from '@/shared/either';
import { Entity } from '../entity';

export class ActivityEntity extends Entity<ActivityEntityModel> {
  private constructor(protected props: ActivityEntityModel) {
    super(props);
    Object.freeze(this);
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get title(): string {
    return this.props.title.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get executeDateTime(): Date {
    return this.props.executeDateTime.value;
  }

  get type(): string {
    return this.props.type.value;
  }

  get category(): string {
    return this.props.category.value;
  }

  get weeklyFrequency(): WeeklyFrequencyModel | undefined {
    return this.props.weeklyFrequency?.value;
  }

  static create(props: ActivityModel): ResponseEntityActivityType {
    const result = this.validate(props) as ActivityEntityModel;

    if (!result) {
      return left(this.errors()!);
    }

    return right(
      new ActivityEntity({
        id: result.id as string,
        customerId: result.customerId as string,
        title: result.title as TitleValueObject,
        description: result.description as DescriptionValueObject,
        executeDateTime: result.executeDateTime as DatetimeValueObject,
        type: result.type as ActivityTypeValueObject,
        category: result.category as CategoryValueObject,
        weeklyFrequency: result.weeklyFrequency as WeeklyFrequencyValueObject,
      }),
    );
  }

  private static validate(props: ActivityModel): ActivityEntityModel | void {
    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } =
      props;

    const idOrError = this.validateId(id);
    const customerIdOrError = this.validateId(customerId);
    const titleOrError = TitleValueObject.create(title);
    const descriptionOrError = DescriptionValueObject.create(description);
    const executeDateTimeOrError = DatetimeValueObject.create(executeDateTime);
    const categoryOrError = CategoryValueObject.create(category);
    const typeOrError = ActivityTypeValueObject.create(type);

    const results = [
      idOrError,
      customerIdOrError,
      titleOrError,
      descriptionOrError,
      executeDateTimeOrError,
      typeOrError,
      categoryOrError,
    ];

    const weeklyFrequencyOrError =
      weeklyFrequency && WeeklyFrequencyValueObject.create(weeklyFrequency);
    weeklyFrequencyOrError && results.push(weeklyFrequencyOrError as any); // typed with any to avoid putting all types in the array

    for (const result of results) {
      if (result.isLeft()) {
        this.addObjectError(result.value);
      }
    }

    if (this.errors()) return;

    return {
      id: idOrError.value as string,
      customerId: customerIdOrError.value as string,
      title: titleOrError.value as TitleValueObject,
      description: descriptionOrError.value as DescriptionValueObject,
      executeDateTime: executeDateTimeOrError.value as DatetimeValueObject,
      type: typeOrError.value as ActivityTypeValueObject,
      category: categoryOrError.value as CategoryValueObject,
      weeklyFrequency: weeklyFrequencyOrError?.value as WeeklyFrequencyValueObject,
    };
  }
}
