import type { Entity } from '@/domain/entities/entity';
import { InvalidFieldError } from '@/domain/errors';
import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter';
import type { CustomErrorAbstract } from '@/shared/errors/custom-error';
import { CustomError } from '@/shared/errors/custom-error';

export type ResultValueId =
  | { isvalid: true; result: string }
  | { isvalid: false; result: CustomError };

type Props = { id: string } & Record<string, any>;

type EntityClass<T extends Entity<any>> = {
  create(props: any): T;
};

export abstract class Aggregate<T extends Props> {
  private static _errors: CustomErrorAbstract[] = [];
  protected readonly _id: string;

  protected constructor(protected readonly props: T) {
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  protected static validateId(id?: string): ResultValueId {
    const uuid = new UuidAdapter();

    if (id && !uuid.validate(id)) {
      return {
        isvalid: false,
        result: new CustomError(new InvalidFieldError('id')),
      };
    }

    const returnId = id ?? uuid.build();
    return { isvalid: true, result: returnId };
  }

  protected static errors(): CustomErrorAbstract[] | null {
    return this._errors.length ? this._errors : null;
  }

  protected static addError(error: CustomErrorAbstract | CustomErrorAbstract[]): void {
    if (Array.isArray(error)) {
      this._errors = this._errors.concat(error);
      return;
    }
    this._errors.push(error);
  }

  protected static clearErrors(): void {
    this._errors = [];
  }

  protected static validateEntities(
    entities: { entity: EntityClass<Entity<any>>; props: Record<string, any> }[], // Usar o tipo helper
  ): Entity<any>[] {
    const resultEntities: Entity<any>[] = [];

    entities.forEach(({ entity, props }) => {
      try {
        const result = entity.create(props); // Chama o método estático `create`
        resultEntities.push(result);
      } catch (error) {
        const _error = error as CustomError;
        this.addError(_error.errors);
      }
    });

    return resultEntities;
  }
}
