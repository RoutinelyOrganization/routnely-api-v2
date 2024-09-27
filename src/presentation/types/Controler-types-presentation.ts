export type ControllerRequestType = {
  headers?: any;
  body?: any;
  params?: any;
  query?: any;
};

export type ControllerResponseType = {
  statusCode: number;
  body: any;
};
