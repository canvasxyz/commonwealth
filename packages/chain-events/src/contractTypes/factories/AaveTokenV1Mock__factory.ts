/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Provider, TransactionRequest } from '@ethersproject/providers';
import { Contract, ContractFactory, Overrides, Signer } from 'ethers';

import type { AaveTokenV1Mock } from '../AaveTokenV1Mock';

export class AaveTokenV1Mock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AaveTokenV1Mock> {
    return super.deploy(overrides || {}) as Promise<AaveTokenV1Mock>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AaveTokenV1Mock {
    return super.attach(address) as AaveTokenV1Mock;
  }
  connect(signer: Signer): AaveTokenV1Mock__factory {
    return super.connect(signer) as AaveTokenV1Mock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AaveTokenV1Mock {
    return new Contract(address, _abi, signerOrProvider) as AaveTokenV1Mock;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "oldValue",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "newValue",
        type: "uint128",
      },
    ],
    name: "SnapshotDone",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EIP712_REVISION",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVISION",
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
  {
    inputs: [],
    name: "_aaveGovernance",
    outputs: [
      {
        internalType: "contract ITransferHook",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_countsSnapshots",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_nonces",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_snapshots",
    outputs: [
      {
        internalType: "uint128",
        name: "blockNumber",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "value",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "migrator",
        type: "address",
      },
      {
        internalType: "address",
        name: "distributor",
        type: "address",
      },
      {
        internalType: "contract ITransferHook",
        name: "aaveGovernance",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
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
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260006006553480156200001657600080fd5b50604080518082018252600a81526920b0bb32902a37b5b2b760b11b6020808301918252835180850190945260048452634141564560e01b908401528151919291620000659160039162000091565b5080516200007b90600490602084019062000091565b50506005805460ff19166012179055506200013d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620000c9576000855562000114565b82601f10620000e457805160ff191683800117855562000114565b8280016001018555821562000114579182015b8281111562000114578251825591602001919060010190620000f7565b506200012292915062000126565b5090565b5b8082111562000122576000815560010162000127565b61171d806200014d6000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c80638779588c116100b8578063c0c53b8b1161007c578063c0c53b8b146103e3578063c3863ada1461041d578063c4d66de814610441578063d505accf14610467578063dd62ed3e146104b8578063dde43cba146104e657610142565b80638779588c1461033757806395d89b411461035d578063a457c2d714610365578063a9059cbb14610391578063b9844d8d146103bd57610142565b806330adf81f1161010a57806330adf81f146102af578063313ce567146102b75780633644e515146102d557806339509351146102dd57806370a0823114610309578063781603761461032f57610142565b806306fdde0314610147578063095ea7b3146101c457806318160ddd1461020457806323b872dd1461021e5780632acbf82314610254575b600080fd5b61014f6104ee565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610189578181015183820152602001610171565b50505050905090810190601f1680156101b65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101f0600480360360408110156101da57600080fd5b506001600160a01b038135169060200135610584565b604080519115158252519081900360200190f35b61020c6105a1565b60408051918252519081900360200190f35b6101f06004803603606081101561023457600080fd5b506001600160a01b038135811691602081013590911690604001356105a7565b6102806004803603604081101561026a57600080fd5b506001600160a01b03813516906020013561062e565b60405180836001600160801b03168152602001826001600160801b031681526020019250505060405180910390f35b61020c61065f565b6102bf610683565b6040805160ff9092168252519081900360200190f35b61020c61068c565b6101f0600480360360408110156102f357600080fd5b506001600160a01b038135169060200135610692565b61020c6004803603602081101561031f57600080fd5b50356001600160a01b03166106e0565b61014f6106fb565b61020c6004803603602081101561034d57600080fd5b50356001600160a01b0316610718565b61014f61072a565b6101f06004803603604081101561037b57600080fd5b506001600160a01b03813516906020013561078b565b6101f0600480360360408110156103a757600080fd5b506001600160a01b0381351690602001356107f3565b61020c600480360360208110156103d357600080fd5b50356001600160a01b0316610807565b61041b600480360360608110156103f957600080fd5b506001600160a01b038135811691602081013582169160409091013516610819565b005b6104256109e2565b604080516001600160a01b039092168252519081900360200190f35b61041b6004803603602081101561045757600080fd5b50356001600160a01b03166109f1565b61041b600480360360e081101561047d57600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610b9d565b61020c600480360360408110156104ce57600080fd5b506001600160a01b0381358116916020013516610de4565b61020c610e0f565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561057a5780601f1061054f5761010080835404028352916020019161057a565b820191906000526020600020905b81548152906001019060200180831161055d57829003601f168201915b5050505050905090565b6000610598610591610e14565b8484610e18565b50600192915050565b60025490565b60006105b4848484610f04565b610624846105c0610e14565b61061f85604051806060016040528060288152602001611624602891396001600160a01b038a166000908152600160205260408120906105fe610e14565b6001600160a01b03168152602081019190915260400160002054919061105f565b610e18565b5060019392505050565b603a6020908152600092835260408084209091529082529020546001600160801b0380821691600160801b90041682565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60055460ff1690565b603d5481565b600061059861069f610e14565b8461061f85600160006106b0610e14565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906110f6565b6001600160a01b031660009081526020819052604090205490565b604051806040016040528060018152602001603160f81b81525081565b603b6020526000908152604090205481565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561057a5780601f1061054f5761010080835404028352916020019161057a565b6000610598610798610e14565b8461061f856040518060600160405280602581526020016116c360259139600160006107c2610e14565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919061105f565b6000610598610800610e14565b8484610f04565b60396020526000908152604090205481565b6000610823611157565b905060065481116108655760405162461bcd60e51b815260040180806020018281038252602e81526020018061164c602e913960400191505060405180910390fd5b6006819055604080518082018252600a8082526920b0bb32902a37b5b2b760b11b60209283018190528351808501855260018152603160f81b9084015283517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818501527fc79ca22c0992a4cca3636d52362fc61ce7d8001b81a7b225d701c42fb0636f32818601527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015246608082018190523060a0808401919091528651808403909101815260c0830180885281519190960120603d5561010082019095529282905260e090920191825261096191600391611517565b50604080518082019091526004808252634141564560e01b602090920191825261098b9181611517565b50610996601261115c565b603c80546001600160a01b0319166001600160a01b0385161790556109c6856a0ac0db698068112d000000611172565b6109db846a027b46536c66c8e3000000611172565b5050505050565b603c546001600160a01b031681565b60006109fb611157565b90506006548111610a3d5760405162461bcd60e51b815260040180806020018281038252602e81526020018061164c602e913960400191505060405180910390fd5b6006819055604080518082018252600a8082526920b0bb32902a37b5b2b760b11b60209283018190528351808501855260018152603160f81b9084015283517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818501527fc79ca22c0992a4cca3636d52362fc61ce7d8001b81a7b225d701c42fb0636f32818601527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015246608082018190523060a0808401919091528651808403909101815260c0830180885281519190960120603d5561010082019095529282905260e0909201918252610b3991600391611517565b50604080518082019091526004808252634141564560e01b6020909201918252610b639181611517565b50610b6e601261115c565b610b83836a0ac0db698068112d000000611172565b610b98836a027b46536c66c8e3000000611172565b505050565b6001600160a01b038716610be8576040805162461bcd60e51b815260206004820152600d60248201526c24a72b20a624a22fa7aba722a960991b604482015290519081900360640190fd5b83421115610c32576040805162461bcd60e51b815260206004820152601260248201527124a72b20a624a22fa2ac2824a920aa24a7a760711b604482015290519081900360640190fd5b6001600160a01b03808816600081815260396020908152604080832054603d5482517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958c166060860152608085018b905260a0850181905260c08086018b90528251808703909101815260e08601835280519084012061190160f01b6101008701526101028601969096526101228086019690965281518086039096018652610142850180835286519684019690962093909552610162840180825283905260ff88166101828501526101a284018790526101c284018690525191926001926101e28083019392601f198301929081900390910190855afa158015610d47573d6000803e3d6000fd5b505050602060405103516001600160a01b0316896001600160a01b031614610daa576040805162461bcd60e51b8152602060048201526011602482015270494e56414c49445f5349474e415455524560781b604482015290519081900360640190fd5b610db58260016110f6565b6001600160a01b038a16600090815260396020526040902055610dd9898989610e18565b505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600181565b3390565b6001600160a01b038316610e5d5760405162461bcd60e51b815260040180806020018281038252602481526020018061169f6024913960400191505060405180910390fd5b6001600160a01b038216610ea25760405162461bcd60e51b81526004018080602001828103825260228152602001806115dc6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610f495760405162461bcd60e51b815260040180806020018281038252602581526020018061167a6025913960400191505060405180910390fd5b6001600160a01b038216610f8e5760405162461bcd60e51b81526004018080602001828103825260238152602001806115b96023913960400191505060405180910390fd5b610f99838383611262565b610fd6816040518060600160405280602681526020016115fe602691396001600160a01b038616600090815260208190526040902054919061105f565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461100590826110f6565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156110ee5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156110b357818101518382015260200161109b565b50505050905090810190601f1680156110e05780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015611150576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600190565b6005805460ff191660ff92909216919091179055565b6001600160a01b0382166111cd576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6111d960008383611262565b6002546111e690826110f6565b6002556001600160a01b03821660009081526020819052604090205461120c90826110f6565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b816001600160a01b0316836001600160a01b0316141561128157610b98565b6001600160a01b038316156112b357600061129b846106e0565b90506112b184826112ac8186611379565b6113bb565b505b6001600160a01b038216156112e05760006112cd836106e0565b90506112de83826112ac81866110f6565b505b603c546001600160a01b0316801561137357806001600160a01b0316634a3931498585856040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018281526020019350505050600060405180830381600087803b15801561135a57600080fd5b505af115801561136e573d6000803e3d6000fd5b505050505b50505050565b600061115083836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061105f565b6001600160a01b0383166000908152603b6020908152604080832054603a909252909120439190811580159061140f575060001982016000908152602082905260409020546001600160801b038481169116145b15611444576000198201600090815260208290526040902080546001600160801b03808716600160801b0291161790556114bd565b6040805180820182526001600160801b038086168252868116602080840191825260008781528682528581209451855493518516600160801b029085166fffffffffffffffffffffffffffffffff1990941693909317909316919091179092556001600160a01b0389168152603b909152206001830190555b604080516001600160a01b03881681526001600160801b03808816602083015286168183015290517f2cd3c83ddac2953ee75f53265d9ea4463eaf05030e5459a1b7e63819b7ce88f79181900360600190a1505050505050565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261154d5760008555611593565b82601f1061156657805160ff1916838001178555611593565b82800160010185558215611593579182015b82811115611593578251825591602001919060010190611578565b5061159f9291506115a3565b5090565b5b8082111561159f57600081556001016115a456fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a656445524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220b3be6f13ee0f4eec60a08ebd7aac8d9c7d5f023bc04c7f00b2fc51ffc93db36064736f6c63430007050033";
