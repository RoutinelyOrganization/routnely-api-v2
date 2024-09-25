import { type ZodHelperData } from '@/infra/validators/';
import { ValidatorError } from '@/infra/validators/errors/validator-error';
import { CustomError } from '@/shared/errors/custom-error';
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
  static check(data: ZodHelperData): void {
    try {
      data.schema.parse(data.value);
      return;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const { message } = error;
        const parseMessage = JSON.parse(message) as Array<ZodObjectError>;

        throw new CustomError(
          parseMessage.map(err => new ValidatorError(`${err.path[0]}: ${err.message}`)),
        );
      }
      throw new Error('Internal server error');
    }
  }
}
