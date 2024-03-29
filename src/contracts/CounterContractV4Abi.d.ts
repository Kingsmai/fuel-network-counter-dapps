/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.67.0
  Forc version: 0.46.1
  Fuel-Core version: 0.20.8
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

interface CounterContractV4AbiInterface extends Interface {
  functions: {
    count: FunctionFragment;
    increment: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'count', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'increment', values: []): Uint8Array;

  decodeFunctionData(functionFragment: 'count', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'increment', data: BytesLike): DecodedValue;
}

export class CounterContractV4Abi extends Contract {
  interface: CounterContractV4AbiInterface;
  functions: {
    count: InvokeFunction<[], BN>;
    increment: InvokeFunction<[], void>;
  };
}
