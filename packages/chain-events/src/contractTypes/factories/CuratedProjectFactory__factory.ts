/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  Signer,
  BigNumberish,
  Overrides} from "ethers";
import {
  Contract,
  ContractFactory
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";

import type { CuratedProjectFactory } from "../CuratedProjectFactory";

export class CuratedProjectFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _owner: string,
    _acceptedTokens: string[],
    _protocolFee: BigNumberish,
    _feeTo: string,
    _projectImp: string,
    _cwTokenImp: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CuratedProjectFactory> {
    return super.deploy(
      _owner,
      _acceptedTokens,
      _protocolFee,
      _feeTo,
      _projectImp,
      _cwTokenImp,
      overrides || {}
    ) as Promise<CuratedProjectFactory>;
  }
  getDeployTransaction(
    _owner: string,
    _acceptedTokens: string[],
    _protocolFee: BigNumberish,
    _feeTo: string,
    _projectImp: string,
    _cwTokenImp: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _owner,
      _acceptedTokens,
      _protocolFee,
      _feeTo,
      _projectImp,
      _cwTokenImp,
      overrides || {}
    );
  }
  attach(address: string): CuratedProjectFactory {
    return super.attach(address) as CuratedProjectFactory;
  }
  connect(signer: Signer): CuratedProjectFactory__factory {
    return super.connect(signer) as CuratedProjectFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CuratedProjectFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CuratedProjectFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_acceptedTokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_protocolFee",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_feeTo",
        type: "address",
      },
      {
        internalType: "address",
        name: "_projectImp",
        type: "address",
      },
      {
        internalType: "address",
        name: "_cwTokenImp",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newProject",
        type: "address",
      },
    ],
    name: "ProjectCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
    ],
    name: "addAcceptedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_name",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_ipfsHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_cwUrl",
        type: "bytes32",
      },
      {
        internalType: "address payable",
        name: "_beneficiary",
        type: "address",
      },
      {
        internalType: "address",
        name: "_acceptedToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_threshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_curatorFee",
        type: "uint256",
      },
    ],
    name: "createProject",
    outputs: [
      {
        internalType: "address",
        name: "newProjectAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cwTokenImp",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProtocolData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "protocolFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFee",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "feeTo",
            type: "address",
          },
        ],
        internalType: "struct DataTypes.ProtocolData",
        name: "",
        type: "tuple",
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
    name: "isAcceptedToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numProjects",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectImp",
    outputs: [
      {
        internalType: "address",
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
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolData",
    outputs: [
      {
        internalType: "uint256",
        name: "protocolFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxFee",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "feeTo",
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
        name: "_cwToken",
        type: "address",
      },
    ],
    name: "setCWTokenImpl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_feeTo",
        type: "address",
      },
    ],
    name: "setFeeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_projectImpl",
        type: "address",
      },
    ],
    name: "setProjectImpl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_protocolFee",
        type: "uint256",
      },
    ],
    name: "setProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200177038038062001770833981016040819052620000349162000455565b6001600160a01b038616620000905760405162461bcd60e51b815260206004820152601460248201527f504a4641433a20494e56414c49445f4f574e455200000000000000000000000060448201526064015b60405180910390fd5b600084118015620000a357506127108411155b620000e65760405162461bcd60e51b8152602060048201526012602482015271504a4641433a20494e56414c49445f46454560701b604482015260640162000087565b6001600160a01b0383166200013e5760405162461bcd60e51b815260206004820152601460248201527f504a4641433a20494e56414c49445f464545544f000000000000000000000000604482015260640162000087565b6001600160a01b038216620001965760405162461bcd60e51b815260206004820152601b60248201527f504a4641433a20494e56414c49445f50524f4a4543545f414444520000000000604482015260640162000087565b6001600160a01b038116620001ee5760405162461bcd60e51b815260206004820152601b60248201527f504a4641433a20494e56414c49445f4357544f4b454e5f414444520000000000604482015260640162000087565b600380546001600160a01b038089166001600160a01b031992831617909255600480548584169083161790556007805484841664010000000002600160201b600160c01b03199091161790556040805160608101825287815261271060208201819052938716910181905260008790556001929092556002805490911690911790556200027b8562000287565b505050505050620005d9565b805180620002d85760405162461bcd60e51b815260206004820152601860248201527f504a4641433a204e4f5f41434345505445445f544f4b454e0000000000000000604482015260640162000087565b60005b818110156200043e5760006001600160a01b03168382815181106200031057634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b03161415620003715760405162461bcd60e51b815260206004820152601d60248201527f504a4641433a20494e56414c49445f41434345505445445f544f4b454e000000604482015260640162000087565b600660008483815181106200039657634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff166200042957600160066000858481518110620003e957634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055505b80620004358162000582565b915050620002db565b505050565b80516200045081620005c0565b919050565b60008060008060008060c087890312156200046e578182fd5b86516200047b81620005c0565b602088810151919750906001600160401b03808211156200049a578485fd5b818a0191508a601f830112620004ae578485fd5b815181811115620004c357620004c3620005aa565b8060051b604051601f19603f83011681018181108582111715620004eb57620004eb620005aa565b604052828152858101935084860182860187018f10156200050a578889fd5b8895505b838610156200053757620005228162000443565b8552600195909501949386019386016200050e565b50809a5050505050505060408701519350620005566060880162000443565b9250620005666080880162000443565b91506200057660a0880162000443565b90509295509295509295565b6000600019821415620005a357634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114620005d657600080fd5b50565b61118780620005e96000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063d7691f8f11610066578063d7691f8f14610226578063d8869b4f14610265578063f46901ed14610278578063ffd10afe1461028b57600080fd5b80638da5cb5b146101e5578063975f5abe146101f8578063a6217d0a1461021357600080fd5b8063787dce3d116100c8578063787dce3d1461017f5780637ad7c7f21461019457806385e6e9c2146101bf5780638cf088d4146101d257600080fd5b80632d94bffe146100ef5780633b6e750f146101275780635a067baa1461015a575b600080fd5b6100f76102b4565b604080518251815260208084015190820152918101516001600160a01b0316908201526060015b60405180910390f35b61014a610135366004610e2a565b60066020526000908152604090205460ff1681565b604051901515815260200161011e565b60075461016a9063ffffffff1681565b60405163ffffffff909116815260200161011e565b61019261018d366004610fa2565b61030f565b005b6101a76101a2366004610f34565b6103a5565b6040516001600160a01b03909116815260200161011e565b6101926101cd366004610e2a565b6109a5565b6004546101a7906001600160a01b031681565b6003546101a7906001600160a01b031681565b6007546101a79064010000000090046001600160a01b031681565b610192610221366004610e4d565b610a53565b6000546001546002546102419291906001600160a01b031683565b6040805193845260208401929092526001600160a01b03169082015260600161011e565b610192610273366004610e2a565b610a89565b610192610286366004610e2a565b610b2b565b6101a7610299366004610fba565b6005602052600090815260409020546001600160a01b031681565b6102e16040518060600160405280600081526020016000815260200160006001600160a01b031681525090565b5060408051606081018252600054815260015460208201526002546001600160a01b03169181019190915290565b6003546001600160a01b031633146103425760405162461bcd60e51b815260040161033990610fde565b60405180910390fd5b60008111801561035457506001548111155b6103a05760405162461bcd60e51b815260206004820152601b60248201527f504a4641433a20494e56414c49445f50524f544f434f4c5f46454500000000006044820152606401610339565b600055565b60006001600160a01b0386166103fd5760405162461bcd60e51b815260206004820152601a60248201527f504a4641433a20494e56414c49445f42454e45464943494152590000000000006044820152606401610339565b8361044a5760405162461bcd60e51b815260206004820152601860248201527f504a4641433a20494e56414c49445f5448524553484f4c4400000000000000006044820152606401610339565b6000831161049a5760405162461bcd60e51b815260206004820152601760248201527f504a4641433a20494e56414c49445f444541444c494e450000000000000000006044820152606401610339565b6001600160a01b03851660009081526006602052604090205460ff1661050d5760405162461bcd60e51b815260206004820152602260248201527f504a4641433a204e4f545f50524f544f434f4c5f41434345505445445f544f4b60448201526122a760f11b6064820152608401610339565b8161055a5760405162461bcd60e51b815260206004820152601a60248201527f504a4641433a20494e56414c49445f43555241544f525f4645450000000000006044820152606401610339565b6000546127109061056b90846110b5565b106105af5760405162461bcd60e51b8152602060048201526014602482015273086aaa482a89ea4408c8a8a40a89e9e4090928e960631b6044820152606401610339565b60408051608081018252858152602081018590526001600160a01b038089168284015287166060820152815160a08101909252600754909160009181906105fd9063ffffffff1660016110cd565b63ffffffff1681526020018c81526020018b81526020018a8152602001336001600160a01b03168152509050600033868c8e604051602001610667949392919060609490941b6001600160601b031916845260148401929092526034830152605482015260740190565b60408051601f198184030181529190528051602090910120600454909150610698906001600160a01b031682610bc4565b935060006107288360200151846040015185606001518c6040516020016106f694939291909384526020840192909252604083015265212a37b5b2b760d11b6060808401919091521b6001600160601b0319166066820152607a0190565b60408051808303601f19018152919052805160209091012060075464010000000090046001600160a01b031690610bc4565b604051634888a7d160e01b81526001600160a01b038b8116600483015260016024830152878116604483015291925090821690634888a7d190606401600060405180830381600087803b15801561077e57600080fd5b505af1158015610792573d6000803e3d6000fd5b5050505060208381015160408086015160608088015183519586019490945291840152828101919091526521aa37b5b2b760d11b60808301528a901b6001600160601b03191660868201526000906107ec90609a016106f6565b604051634888a7d160e01b81526001600160a01b038c8116600483015260016024830152888116604483015291925090821690634888a7d190606401600060405180830381600087803b15801561084257600080fd5b505af1158015610856573d6000803e3d6000fd5b50506000546002546040516301c8120560e61b81526001600160a01b038b8116955063720481409450610899938a938c938f93909116908a908a90600401611013565b602060405180830381600087803b1580156108b357600080fd5b505af11580156108c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108eb9190610f14565b50600780546001919060009061090890849063ffffffff166110cd565b82546101009290920a63ffffffff81810219909316918316021790915560078054821660009081526005602090815260409182902080546001600160a01b0319166001600160a01b038d1690811790915592548251941684528301919091527f63c92f9505d420bff631cb9df33be952bdc11e2118da36a850b43e6bcc4ce4de92500160405180910390a150505050505b98975050505050505050565b6003546001600160a01b031633146109cf5760405162461bcd60e51b815260040161033990610fde565b6001600160a01b038116610a255760405162461bcd60e51b815260206004820152601b60248201527f504a4641433a20494e56414c49445f4357546f6b656e5f494d504c00000000006044820152606401610339565b600780546001600160a01b0390921664010000000002640100000000600160c01b0319909216919091179055565b6003546001600160a01b03163314610a7d5760405162461bcd60e51b815260040161033990610fde565b610a8681610c6a565b50565b6003546001600160a01b03163314610ab35760405162461bcd60e51b815260040161033990610fde565b6001600160a01b038116610b095760405162461bcd60e51b815260206004820152601b60248201527f504a4641433a20494e56414c49445f50524f4a4543545f494d504c00000000006044820152606401610339565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b03163314610b555760405162461bcd60e51b815260040161033990610fde565b6001600160a01b038116610ba25760405162461bcd60e51b8152602060048201526014602482015273504a4641433a20494e56414c49445f464545544f60601b6044820152606401610339565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528360601b60148201526e5af43d82803e903d91602b57fd5bf360881b6028820152826037826000f59150506001600160a01b038116610c645760405162461bcd60e51b815260206004820152601760248201527f455243313136373a2063726561746532206661696c65640000000000000000006044820152606401610339565b92915050565b805180610cb95760405162461bcd60e51b815260206004820152601860248201527f504a4641433a204e4f5f41434345505445445f544f4b454e00000000000000006044820152606401610339565b60005b81811015610e155760006001600160a01b0316838281518110610cef57634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b03161415610d4e5760405162461bcd60e51b815260206004820152601d60248201527f504a4641433a20494e56414c49445f41434345505445445f544f4b454e0000006044820152606401610339565b60066000848381518110610d7257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff16610e0357600160066000858481518110610dc357634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055505b80610e0d816110f5565b915050610cbc565b505050565b8035610e258161113c565b919050565b600060208284031215610e3b578081fd5b8135610e468161113c565b9392505050565b60006020808385031215610e5f578182fd5b823567ffffffffffffffff80821115610e76578384fd5b818501915085601f830112610e89578384fd5b813581811115610e9b57610e9b611126565b8060051b604051601f19603f83011681018181108582111715610ec057610ec0611126565b604052828152858101935084860182860187018a1015610ede578788fd5b8795505b83861015610f0757610ef381610e1a565b855260019590950194938601938601610ee2565b5098975050505050505050565b600060208284031215610f25578081fd5b81518015158114610e46578182fd5b600080600080600080600080610100898b031215610f50578384fd5b8835975060208901359650604089013595506060890135610f708161113c565b94506080890135610f808161113c565b979a969950949793969560a0850135955060c08501359460e001359350915050565b600060208284031215610fb3578081fd5b5035919050565b600060208284031215610fcb578081fd5b813563ffffffff81168114610e46578182fd5b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b87518152602080890151818301526040808a0151818401526060808b0151818501526080808c01516001600160a01b03908116918601919091528a5160a0860152928a015160c085015290890151821660e084015288015181166101008301526101208201879052610140820186905284166101608201526101c081016001600160a01b0384166101808301526001600160a01b0383166101a0830152610999565b600082198211156110c8576110c8611110565b500190565b600063ffffffff8083168185168083038211156110ec576110ec611110565b01949350505050565b600060001982141561110957611109611110565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a8657600080fdfea2646970667358221220eb61a59d014ce053be54ba1db403397e6c06dd2bdd8582c6f5fe0f72508433e964736f6c63430008040033";
