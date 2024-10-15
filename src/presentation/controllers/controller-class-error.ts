import {
  badRequest,
  conflict,
  forbidden,
  notFound,
  serverError,
  unauthorized,
} from '@/presentation/helpers/http-helpers';
import type { ControllerResponseType } from '@/presentation/types';
import { CustomError } from '@/shared/errors/custom-error';

export abstract class ControllerError {
  returnError(error: Error | CustomError): ControllerResponseType {
    if (error instanceof CustomError) {
      return this.switchHelpers(error);
    }
    return serverError(error);
  }

  private switchHelpers(error: CustomError): ControllerResponseType {
    const { codeError, messages: errors } = error.formatErrors;
    console.log('codeError', codeError);

    switch (codeError) {
      case 400:
        return badRequest({ errors });
      case 401:
        return unauthorized({ errors });
      case 403:
        return forbidden({ errors });
      case 404:
        return notFound({ errors });
      case 409:
        return conflict({ errors });
      default:
        return serverError(new Error('Internal server error'));
    }
  }
}
