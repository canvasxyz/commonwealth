/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { EventFragment, FunctionFragment, Result } from '@ethersproject/abi';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import {
  BigNumber,
  CallOverrides,
  Contract,
  ContractTransaction,
  ethers,
  Overrides,
  PopulatedTransaction,
  Signer,
} from 'ethers';
import { TypedEvent, TypedEventFilter, TypedListener } from './commons';

interface ChainlinkUSDAdapterInterface extends ethers.utils.Interface {
  functions: {
    "aggregator()": FunctionFragment;
    "asset()": FunctionFragment;
    "getPriceInUSD()": FunctionFragment;
    "viewPriceInUSD()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "aggregator",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "asset", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPriceInUSD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "viewPriceInUSD",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "aggregator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPriceInUSD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewPriceInUSD",
    data: BytesLike
  ): Result;

  events: {
    "PriceUpdated(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PriceUpdated"): EventFragment;
}

export class ChainlinkUSDAdapter extends Contract {
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

  interface: ChainlinkUSDAdapterInterface;

  functions: {
    aggregator(overrides?: CallOverrides): Promise<[string]>;

    "aggregator()"(overrides?: CallOverrides): Promise<[string]>;

    asset(overrides?: CallOverrides): Promise<[string]>;

    "asset()"(overrides?: CallOverrides): Promise<[string]>;

    getPriceInUSD(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "getPriceInUSD()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    viewPriceInUSD(overrides?: CallOverrides): Promise<[BigNumber]>;

    "viewPriceInUSD()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  aggregator(overrides?: CallOverrides): Promise<string>;

  "aggregator()"(overrides?: CallOverrides): Promise<string>;

  asset(overrides?: CallOverrides): Promise<string>;

  "asset()"(overrides?: CallOverrides): Promise<string>;

  getPriceInUSD(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "getPriceInUSD()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  viewPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

  "viewPriceInUSD()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    aggregator(overrides?: CallOverrides): Promise<string>;

    "aggregator()"(overrides?: CallOverrides): Promise<string>;

    asset(overrides?: CallOverrides): Promise<string>;

    "asset()"(overrides?: CallOverrides): Promise<string>;

    getPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

    "getPriceInUSD()"(overrides?: CallOverrides): Promise<BigNumber>;

    viewPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

    "viewPriceInUSD()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    PriceUpdated(
      asset: null,
      newPrice: null
    ): TypedEventFilter<
      [string, BigNumber],
      { asset: string; newPrice: BigNumber }
    >;
  };

  estimateGas: {
    aggregator(overrides?: CallOverrides): Promise<BigNumber>;

    "aggregator()"(overrides?: CallOverrides): Promise<BigNumber>;

    asset(overrides?: CallOverrides): Promise<BigNumber>;

    "asset()"(overrides?: CallOverrides): Promise<BigNumber>;

    getPriceInUSD(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "getPriceInUSD()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    viewPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

    "viewPriceInUSD()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    aggregator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "aggregator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    asset(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "asset()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPriceInUSD(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "getPriceInUSD()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    viewPriceInUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "viewPriceInUSD()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
