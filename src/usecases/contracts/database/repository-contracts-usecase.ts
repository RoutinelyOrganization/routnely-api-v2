import type { Aggregate, Entity } from '@/domain';

export interface FindFieldOrNullRepositoryContract<T extends Entity | Aggregate> {
  findFieldOrNull<K extends keyof T>(field: K, value: T[K] | Partial<T[K]>): Promise<T | null>;
}

export interface CreateRepositoryContract<T extends Entity | Aggregate> {
  create(entity: T): Promise<void>;
}
