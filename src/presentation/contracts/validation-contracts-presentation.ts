import type { Either } from '@/shared/either';

export interface ValidationContract {
  validate(input: any): Either<Error, void>;
}
