import { type ZodHelperData } from '@/infra/validators/';
import { left, right, type Either } from '@/shared/either';
import { ZodError } from 'zod';

type ZodObjectError = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
};

export class ZodHelper {
  static check(data: ZodHelperData): Either<Error, void> {
    try {
      data.schema.parse(data.value);
      return right();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const { message } = error;
        const parseMessage = JSON.parse(message) as Array<ZodObjectError>;
        const errorsFormated = parseMessage.map(err => `${err.path[0]}: ${err.message}`);

        return left({
          errors: errorsFormated,
        });
      }
      return left(error);
    }
  }
}
