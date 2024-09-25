export interface FindFieldOrNullRepositoryContract<T> {
  findFieldOrNull<K extends keyof T>(field: K, value: T[K]): Promise<T | null>;
}

export interface CreateRepositoryContract<T> {
  create(entity: T): Promise<void>;
}
