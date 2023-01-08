/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { EventFragment, FunctionFragment, Result } from '@ethersproject/abi';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import {
  BigNumber,
  BigNumberish,
  CallOverrides,
  Contract,
  ContractTransaction,
  ethers,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
} from 'ethers';
import { TypedEvent, TypedEventFilter, TypedListener } from './commons';

interface GovernorInterface extends ethers.utils.Interface {
  functions: {
    "BALLOT_TYPEHASH()": FunctionFragment;
    "COUNTING_MODE()": FunctionFragment;
    "castVote(uint256,uint8)": FunctionFragment;
    "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)": FunctionFragment;
    "castVoteWithReason(uint256,uint8,string)": FunctionFragment;
    "execute(address[],uint256[],bytes[],bytes32)": FunctionFragment;
    "getVotes(address,uint256)": FunctionFragment;
    "hasVoted(uint256,address)": FunctionFragment;
    "hashProposal(address[],uint256[],bytes[],bytes32)": FunctionFragment;
    "name()": FunctionFragment;
    "proposalDeadline(uint256)": FunctionFragment;
    "proposalSnapshot(uint256)": FunctionFragment;
    "propose(address[],uint256[],bytes[],string)": FunctionFragment;
    "quorum(uint256)": FunctionFragment;
    "state(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "version()": FunctionFragment;
    "votingDelay()": FunctionFragment;
    "votingPeriod()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "BALLOT_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "COUNTING_MODE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "castVote",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "castVoteBySig",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "castVoteWithReason",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [string[], BigNumberish[], BytesLike[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVotes",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasVoted",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hashProposal",
    values: [string[], BigNumberish[], BytesLike[], BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposalDeadline",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proposalSnapshot",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "propose",
    values: [string[], BigNumberish[], BytesLike[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "quorum",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "state", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "votingDelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "votingPeriod",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "BALLOT_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "COUNTING_MODE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "castVote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "castVoteBySig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "castVoteWithReason",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVotes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasVoted", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hashProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposalDeadline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposalSnapshot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "propose", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "quorum", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "state", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "votingDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "votingPeriod",
    data: BytesLike
  ): Result;

  events: {
    "ProposalCanceled(uint256)": EventFragment;
    "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)": EventFragment;
    "ProposalExecuted(uint256)": EventFragment;
    "VoteCast(address,uint256,uint8,uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProposalCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCast"): EventFragment;
}

export class Governor extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: GovernorInterface;

  functions: {
    BALLOT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    "BALLOT_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;

    COUNTING_MODE(overrides?: CallOverrides): Promise<[string]>;

    "COUNTING_MODE()"(overrides?: CallOverrides): Promise<[string]>;

    castVote(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "castVote(uint256,uint8)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    castVoteBySig(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    castVoteWithReason(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "castVoteWithReason(uint256,uint8,string)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    execute(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "execute(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getVotes(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getVotes(address,uint256)"(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    hasVoted(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "hasVoted(uint256,address)"(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    hashProposal(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "hashProposal(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    "name()"(overrides?: CallOverrides): Promise<[string]>;

    proposalDeadline(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "proposalDeadline(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    proposalSnapshot(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "proposalSnapshot(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    propose(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "propose(address[],uint256[],bytes[],string)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    quorum(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "quorum(uint256)"(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    state(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    "state(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    version(overrides?: CallOverrides): Promise<[string]>;

    "version()"(overrides?: CallOverrides): Promise<[string]>;

    votingDelay(overrides?: CallOverrides): Promise<[BigNumber]>;

    "votingDelay()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    votingPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    "votingPeriod()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  BALLOT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  "BALLOT_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

  COUNTING_MODE(overrides?: CallOverrides): Promise<string>;

  "COUNTING_MODE()"(overrides?: CallOverrides): Promise<string>;

  castVote(
    proposalId: BigNumberish,
    support: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "castVote(uint256,uint8)"(
    proposalId: BigNumberish,
    support: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  castVoteBySig(
    proposalId: BigNumberish,
    support: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)"(
    proposalId: BigNumberish,
    support: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  castVoteWithReason(
    proposalId: BigNumberish,
    support: BigNumberish,
    reason: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "castVoteWithReason(uint256,uint8,string)"(
    proposalId: BigNumberish,
    support: BigNumberish,
    reason: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  execute(
    targets: string[],
    values: BigNumberish[],
    calldatas: BytesLike[],
    descriptionHash: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "execute(address[],uint256[],bytes[],bytes32)"(
    targets: string[],
    values: BigNumberish[],
    calldatas: BytesLike[],
    descriptionHash: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getVotes(
    account: string,
    blockNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getVotes(address,uint256)"(
    account: string,
    blockNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  hasVoted(
    proposalId: BigNumberish,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "hasVoted(uint256,address)"(
    proposalId: BigNumberish,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hashProposal(
    targets: string[],
    values: BigNumberish[],
    calldatas: BytesLike[],
    descriptionHash: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "hashProposal(address[],uint256[],bytes[],bytes32)"(
    targets: string[],
    values: BigNumberish[],
    calldatas: BytesLike[],
    descriptionHash: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  name(overrides?: CallOverrides): Promise<string>;

  "name()"(overrides?: CallOverrides): Promise<string>;

  proposalDeadline(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "proposalDeadline(uint256)"(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  proposalSnapshot(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "proposalSnapshot(uint256)"(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  propose(
    targets: string[],
    values: BigNumberish[],
    calldatas: BytesLike[],
    description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "propose(address[],uint256[],bytes[],string)"(
    targets: string[],
    values: BigNumberish[],
    calldatas: BytesLike[],
    description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  quorum(
    blockNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "quorum(uint256)"(
    blockNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  state(proposalId: BigNumberish, overrides?: CallOverrides): Promise<number>;

  "state(uint256)"(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  version(overrides?: CallOverrides): Promise<string>;

  "version()"(overrides?: CallOverrides): Promise<string>;

  votingDelay(overrides?: CallOverrides): Promise<BigNumber>;

  "votingDelay()"(overrides?: CallOverrides): Promise<BigNumber>;

  votingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  "votingPeriod()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    BALLOT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    "BALLOT_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;

    COUNTING_MODE(overrides?: CallOverrides): Promise<string>;

    "COUNTING_MODE()"(overrides?: CallOverrides): Promise<string>;

    castVote(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "castVote(uint256,uint8)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    castVoteBySig(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    castVoteWithReason(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "castVoteWithReason(uint256,uint8,string)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    execute(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "execute(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVotes(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getVotes(address,uint256)"(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasVoted(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "hasVoted(uint256,address)"(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hashProposal(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hashProposal(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    "name()"(overrides?: CallOverrides): Promise<string>;

    proposalDeadline(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposalDeadline(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposalSnapshot(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposalSnapshot(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    propose(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "propose(address[],uint256[],bytes[],string)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quorum(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "quorum(uint256)"(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    state(proposalId: BigNumberish, overrides?: CallOverrides): Promise<number>;

    "state(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    version(overrides?: CallOverrides): Promise<string>;

    "version()"(overrides?: CallOverrides): Promise<string>;

    votingDelay(overrides?: CallOverrides): Promise<BigNumber>;

    "votingDelay()"(overrides?: CallOverrides): Promise<BigNumber>;

    votingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    "votingPeriod()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    ProposalCanceled(
      proposalId: null
    ): TypedEventFilter<[BigNumber], { proposalId: BigNumber }>;

    ProposalCreated(
      proposalId: null,
      proposer: null,
      targets: null,
      values: null,
      signatures: null,
      calldatas: null,
      startBlock: null,
      endBlock: null,
      description: null
    ): TypedEventFilter<
      [
        BigNumber,
        string,
        string[],
        BigNumber[],
        string[],
        string[],
        BigNumber,
        BigNumber,
        string
      ],
      {
        proposalId: BigNumber;
        proposer: string;
        targets: string[];
        values: BigNumber[];
        signatures: string[];
        calldatas: string[];
        startBlock: BigNumber;
        endBlock: BigNumber;
        description: string;
      }
    >;

    ProposalExecuted(
      proposalId: null
    ): TypedEventFilter<[BigNumber], { proposalId: BigNumber }>;

    VoteCast(
      voter: string | null,
      proposalId: null,
      support: null,
      weight: null,
      reason: null
    ): TypedEventFilter<
      [string, BigNumber, number, BigNumber, string],
      {
        voter: string;
        proposalId: BigNumber;
        support: number;
        weight: BigNumber;
        reason: string;
      }
    >;
  };

  estimateGas: {
    BALLOT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    "BALLOT_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;

    COUNTING_MODE(overrides?: CallOverrides): Promise<BigNumber>;

    "COUNTING_MODE()"(overrides?: CallOverrides): Promise<BigNumber>;

    castVote(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "castVote(uint256,uint8)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    castVoteBySig(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    castVoteWithReason(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "castVoteWithReason(uint256,uint8,string)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    execute(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "execute(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getVotes(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getVotes(address,uint256)"(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasVoted(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hasVoted(uint256,address)"(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashProposal(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hashProposal(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    "name()"(overrides?: CallOverrides): Promise<BigNumber>;

    proposalDeadline(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposalDeadline(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposalSnapshot(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposalSnapshot(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    propose(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "propose(address[],uint256[],bytes[],string)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    quorum(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "quorum(uint256)"(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    state(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "state(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;

    "version()"(overrides?: CallOverrides): Promise<BigNumber>;

    votingDelay(overrides?: CallOverrides): Promise<BigNumber>;

    "votingDelay()"(overrides?: CallOverrides): Promise<BigNumber>;

    votingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    "votingPeriod()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    BALLOT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "BALLOT_TYPEHASH()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    COUNTING_MODE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "COUNTING_MODE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    castVote(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "castVote(uint256,uint8)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    castVoteBySig(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    castVoteWithReason(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "castVoteWithReason(uint256,uint8,string)"(
      proposalId: BigNumberish,
      support: BigNumberish,
      reason: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    execute(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "execute(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getVotes(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getVotes(address,uint256)"(
      account: string,
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasVoted(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasVoted(uint256,address)"(
      proposalId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashProposal(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hashProposal(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      descriptionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "name()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposalDeadline(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "proposalDeadline(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposalSnapshot(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "proposalSnapshot(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    propose(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "propose(address[],uint256[],bytes[],string)"(
      targets: string[],
      values: BigNumberish[],
      calldatas: BytesLike[],
      description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    quorum(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "quorum(uint256)"(
      blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    state(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "state(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "version()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    votingDelay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "votingDelay()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    votingPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "votingPeriod()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
