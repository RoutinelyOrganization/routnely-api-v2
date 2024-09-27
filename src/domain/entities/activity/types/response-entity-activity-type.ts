import type { ActivityEntity } from '@/domain/entities/activity/activity-entity';
import type { FieldIsRequiredError } from '@/domain/shared/errors';
import type { Either } from '@/shared/either';

type ActivityErrorsType = FieldIsRequiredError;

export type ResponseEntityActivityType = Either<ActivityErrorsType, ActivityEntity>;
