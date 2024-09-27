import { ServerError } from '@/presentation/errors';
import type { ControllerResponseType } from '@/presentation/types';

type ObjectErrorType = { errors: string[] };

export const ok = (data: any): ControllerResponseType => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): ControllerResponseType => ({
  statusCode: 204,
  body: null,
});

export const badRequest = (error: ObjectErrorType): ControllerResponseType => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (error: ObjectErrorType): ControllerResponseType => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: ObjectErrorType): ControllerResponseType => ({
  statusCode: 403,
  body: error,
});
export const notFound = (error: ObjectErrorType): ControllerResponseType => ({
  statusCode: 404,
  body: error,
});

export const serverError = (error: Error): ControllerResponseType => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
