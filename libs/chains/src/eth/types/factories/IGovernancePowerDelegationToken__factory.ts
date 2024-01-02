/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Signer } from "ethers";
import { Contract } from "ethers";
import type { Provider } from "@ethersproject/providers";

import type { IGovernancePowerDelegationToken } from "../IGovernancePowerDelegationToken";

export class IGovernancePowerDelegationToken__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGovernancePowerDelegationToken {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IGovernancePowerDelegationToken;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "enum IGovernancePowerDelegationToken.DelegationType",
        name: "delegationType",
        type: "uint8",
      },
    ],
    name: "getPowerAtBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];