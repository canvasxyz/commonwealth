/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Provider, TransactionRequest } from '@ethersproject/providers';
import { Contract, ContractFactory, Overrides, Signer } from 'ethers';

import type { FlashAttacks } from '../FlashAttacks';

export class FlashAttacks__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _token: string,
    _MINTER: string,
    _governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FlashAttacks> {
    return super.deploy(
      _token,
      _MINTER,
      _governance,
      overrides || {}
    ) as Promise<FlashAttacks>;
  }
  getDeployTransaction(
    _token: string,
    _MINTER: string,
    _governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token,
      _MINTER,
      _governance,
      overrides || {}
    );
  }
  attach(address: string): FlashAttacks {
    return super.attach(address) as FlashAttacks;
  }
  connect(signer: Signer): FlashAttacks__factory {
    return super.connect(signer) as FlashAttacks__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlashAttacks {
    return new Contract(address, _abi, signerOrProvider) as FlashAttacks;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_MINTER",
        type: "address",
      },
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalPower",
        type: "uint256",
      },
      {
        internalType: "contract IExecutorWithTimelock",
        name: "executor",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "signatures",
        type: "string[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
      {
        internalType: "bool[]",
        name: "withDelegatecalls",
        type: "bool[]",
      },
      {
        internalType: "bytes32",
        name: "ipfsHash",
        type: "bytes32",
      },
    ],
    name: "flashProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "votePower",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "support",
        type: "bool",
      },
    ],
    name: "flashVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "votePower",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "support",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "flashVotePermit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e060405234801561001057600080fd5b50604051610e82380380610e8283398101604081905261002f91610072565b6001600160601b0319606093841b811660805291831b821660a05290911b1660c0526100b4565b80516001600160a01b038116811461006d57600080fd5b919050565b600080600060608486031215610086578283fd5b61008f84610056565b925061009d60208501610056565b91506100ab60408501610056565b90509250925092565b60805160601c60a05160601c60c05160601c610d5f6101236000398061015b528061036d52806105a652508060c5528061020e52806102d7528061044552806105105280610653525080609852806101df52806102aa528061041852806104e352806106245250610d5f6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806302564fb8146100465780633b5c12b21461005b578063c56686ae1461006e575b600080fd5b610059610054366004610a3f565b610081565b005b610059610069366004610917565b610293565b61005961007c366004610a07565b6104cc565b6040516323b872dd60e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906323b872dd906100f1907f00000000000000000000000000000000000000000000000000000000000000009030908b90600401610b97565b602060405180830381600087803b15801561010b57600080fd5b505af115801561011f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061014391906108dc565b5060405163af1e0bd360e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063af1e0bd3906101989088908890889088908890600401610c9b565b600060405180830381600087803b1580156101b257600080fd5b505af11580156101c6573d6000803e3d6000fd5b505060405163a9059cbb60e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016925063a9059cbb9150610238907f0000000000000000000000000000000000000000000000000000000000000000908a90600401610bbb565b602060405180830381600087803b15801561025257600080fd5b505af1158015610266573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028a91906108dc565b50505050505050565b6040516323b872dd60e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906323b872dd90610303907f00000000000000000000000000000000000000000000000000000000000000009030908d90600401610b97565b602060405180830381600087803b15801561031d57600080fd5b505af1158015610331573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035591906108dc565b50604051633e1d06a760e21b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063f8741a9c906103ae908a908a908a908a908a908a908a90600401610bd4565b602060405180830381600087803b1580156103c857600080fd5b505af11580156103dc573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040091906108ff565b5060405163a9059cbb60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a9059cbb9061046f907f0000000000000000000000000000000000000000000000000000000000000000908c90600401610bbb565b602060405180830381600087803b15801561048957600080fd5b505af115801561049d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c191906108dc565b505050505050505050565b6040516323b872dd60e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906323b872dd9061053c907f00000000000000000000000000000000000000000000000000000000000000009030908890600401610b97565b602060405180830381600087803b15801561055657600080fd5b505af115801561056a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058e91906108dc565b506040516330962b7d60e11b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063612c56fa906105dd9085908590600401610c8b565b600060405180830381600087803b1580156105f757600080fd5b505af115801561060b573d6000803e3d6000fd5b505060405163a9059cbb60e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016925063a9059cbb915061067d907f0000000000000000000000000000000000000000000000000000000000000000908790600401610bbb565b602060405180830381600087803b15801561069757600080fd5b505af11580156106ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cf91906108dc565b50505050565b600082601f8301126106e5578081fd5b81356106f86106f382610ce5565b610cc1565b81815291506020808301908481018184028601820187101561071957600080fd5b60005b8481101561074157813561072f81610d03565b8452928201929082019060010161071c565b505050505092915050565b600082601f83011261075c578081fd5b813561076a6106f382610ce5565b81815291506020808301908481018184028601820187101561078b57600080fd5b60005b848110156107415781356107a181610d1b565b8452928201929082019060010161078e565b6000601f83818401126107c4578182fd5b82356107d26106f382610ce5565b818152925060208084019085810160005b84811015610862578135880189603f8201126107fe57600080fd5b8381013567ffffffffffffffff81111561081457fe5b610825818901601f19168601610cc1565b81815260408c8184860101111561083b57600080fd5b828185018884013750600091810186019190915285525092820192908201906001016107e3565b50505050505092915050565b600082601f83011261087e578081fd5b813561088c6106f382610ce5565b8181529150602080830190848101818402860182018710156108ad57600080fd5b60005b84811015610741578135845292820192908201906001016108b0565b80356108d781610d03565b919050565b6000602082840312156108ed578081fd5b81516108f881610d1b565b9392505050565b600060208284031215610910578081fd5b5051919050565b600080600080600080600080610100898b031215610933578384fd5b8835975061094360208a016108cc565b9650604089013567ffffffffffffffff8082111561095f578586fd5b61096b8c838d016106d5565b975060608b0135915080821115610980578586fd5b61098c8c838d0161086e565b965060808b01359150808211156109a1578586fd5b6109ad8c838d016107b3565b955060a08b01359150808211156109c2578485fd5b6109ce8c838d016107b3565b945060c08b01359150808211156109e3578384fd5b506109f08b828c0161074c565b92505060e089013590509295985092959890939650565b600080600060608486031215610a1b578283fd5b83359250602084013591506040840135610a3481610d1b565b809150509250925092565b60008060008060008060c08789031215610a57578182fd5b86359550602087013594506040870135610a7081610d1b565b9350606087013560ff81168114610a85578283fd5b9598949750929560808101359460a0909101359350915050565b6000815180845260208085019450808401835b83811015610ad0578151151587529582019590820190600101610ab2565b509495945050505050565b60008282518085526020808601955080818302840101818601855b84811015610b5b57601f1980878503018a5282518051808652895b81811015610b2c578281018801518782018901528701610b11565b81811115610b3c578a8883890101525b509a86019a601f01909116939093018401925090830190600101610af6565b5090979650505050505050565b6000815180845260208085019450808401835b83811015610ad057815187529582019590820190600101610b7b565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b03888116825260e0602080840182905289519184018290526000928a820192909190610100860190855b81811015610c23578551851683529483019491830191600101610c05565b50508581036040870152610c37818c610b68565b93505050508281036060840152610c4e8188610adb565b90508281036080840152610c628187610adb565b905082810360a0840152610c768186610a9f565b9150508260c083015298975050505050505050565b9182521515602082015260400190565b948552921515602085015260ff9190911660408401526060830152608082015260a00190565b60405181810167ffffffffffffffff81118282101715610cdd57fe5b604052919050565b600067ffffffffffffffff821115610cf957fe5b5060209081020190565b6001600160a01b0381168114610d1857600080fd5b50565b8015158114610d1857600080fdfea2646970667358221220509def0ab238f8d545da76b86ed5fc1425195308d39720b66797889342cf939c64736f6c63430007050033";
