type Input = Record<string, any> | string;

type Output = Promise<Input | void> | Input | void;

export interface ContractDomain {
  perform(data?: Input): Output | Promise<Output>;
}
