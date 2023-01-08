/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Provider } from '@ethersproject/providers';
import { Contract, Signer } from 'ethers';

import type { IERC20Decimals } from '../IERC20Decimals';

export class IERC20Decimals__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC20Decimals {
    return new Contract(address, _abi, signerOrProvider) as IERC20Decimals;
  }
}

const _abi = [
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
