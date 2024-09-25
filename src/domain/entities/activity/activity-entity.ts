import type {
  ActivityEntityModel,
  ActivityModel,
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
import { CustomError } from '@/shared/errors/custom-error';
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

  static create(props: ActivityModel): ActivityEntity {
    const result = this.validate(props);

    return new ActivityEntity(result);
  }

  private static validate(props: ActivityModel): ActivityEntityModel {
    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } =
      props;

    const idOrError = this.validateId(id);
    const customerIdOrError = this.validateId(customerId);
    const titleOrError = TitleValueObject.create(title);
    const descriptionOrError = DescriptionValueObject.create(description);
    const executeDateTimeOrError = DatetimeValueObject.create(executeDateTime);
    const categoryOrError = CategoryValueObject.create(category);
    const typeOrError = ActivityTypeValueObject.create(type);

    const responses = [
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
    weeklyFrequencyOrError && responses.push(weeklyFrequencyOrError);

    for (const response of responses) {
      if (!response.isvalid) {
        this.addError(response.result.errors);
      }
    }

    const errors = this.errors();
    if (errors) {
      throw new CustomError(errors);
    }

    return {
      id: idOrError.result as string,
      customerId: customerIdOrError.result as string,
      title: titleOrError.result as TitleValueObject,
      description: descriptionOrError.result as DescriptionValueObject,
      executeDateTime: executeDateTimeOrError.result as DatetimeValueObject,
      type: typeOrError.result as ActivityTypeValueObject,
      category: categoryOrError.result as CategoryValueObject,
      weeklyFrequency: weeklyFrequencyOrError?.result as WeeklyFrequencyValueObject,
    };
  }
}
