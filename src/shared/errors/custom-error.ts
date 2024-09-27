export type ObjError = {
  codeError: number;
};

export type InputObjError = ObjError & {
  message: string;
};

export type OutputObjError = ObjError & {
  messages: string[];
};

export class CustomErrorAbstract {
  protected _codeError: number;
  protected _message: string;
  constructor({ codeError, message }: InputObjError) {
    this._codeError = codeError;
    this._message = message;
  }

  get codeError(): number {
    return this._codeError;
  }

  get message(): string {
    return this._message;
  }
}

export class CustomError {
  private props: CustomErrorAbstract[];
  constructor(errors: CustomErrorAbstract | CustomErrorAbstract[]) {
    this.props = Array.isArray(errors) ? errors : [errors];
  }

  get formatErrors(): OutputObjError {
    return {
      codeError: this.props[0].codeError,
      messages: this.props.map(error => error.message),
    };
  }

  get errors(): CustomErrorAbstract[] {
    return this.props;
  }
}
