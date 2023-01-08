/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Provider } from '@ethersproject/providers';
import { Contract, Signer } from 'ethers';

import type { MPondInterface } from '../MPondInterface';

export class MPondInterface__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MPondInterface {
    return new Contract(address, _abi, signerOrProvider) as MPondInterface;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPriorVotes",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
