import type { Either } from '@/shared/either';

export interface FindByFieldRepositoryContract<T> {
  findByField<K extends keyof T>(field: K, value: T[K]): Promise<Either<Error, T | null>>;
}

export interface CreateRepositoryContract<T> {
  create(entity: T): Promise<Either<Error, void>>;
}
