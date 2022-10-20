import $ from 'jquery';
import _ from 'lodash';

import { ContractsStore } from 'stores';
import { Contract } from 'models';
import app from 'state';
import BN from 'bn.js';
import { ChainBase, ContractType } from 'common-common/src/types';
import { TypedResponse } from 'server/types';
import { ChainNodeAttributes } from 'server/models/chain_node';
import { ContractAttributes } from 'server/models/contract';

type CreateContractResp = {
  contract: ContractAttributes;
  node: ChainNodeAttributes;
};
class ContractsController {
  private _store: ContractsStore = new ContractsStore();
  private _initialized = false;
  public get store() {
    return this._store;
  }
  public get initialized() {
    return this._initialized;
  }
  public getByNickname(nickname: string) {
    return this._store.getContractByNickname(nickname);
  }
  public getByIdentifier(id) {
    return this._store.getById(id);
  }
  public getByAddress(address: string) {
    return this._store.getContractByAddress(address);
  }
  public getByType(type: string) {
    return this._store.getContractByType(type);
  }
  public getContractFactories() {
    return this._store.getContractFactories();
  }

  public async addContractAbi(contract: Contract, abi: Array<Record<string, unknown>>) {
    const response: TypedResponse<CreateContractResp> = await $.post(
      `${app.serverUrl()}/createContractAbi`,
      {
        jwt: app.user.jwt,
        contractId: contract.id,
        abi,
      }
    );
    return response;
  }

  public async add(
    community: string,
    chain_base: ChainBase,
    eth_chain_id: number,
    node_url: string,
    address: string,
    abi: JSON,
    contractType: ContractType,
    symbol: string,
    token_name: string,
    decimals: number
  ) {
    try {
      const response: TypedResponse<CreateContractResp> = await $.post(
        `${app.serverUrl()}/createContract`,
        {
          community,
          chain_base,
          eth_chain_id,
          jwt: app.user.jwt,
          node_url,
          address,
          abi,
          contractType,
          symbol,
          token_name,
          decimals,
        }
      );
      const responseContract = response['result']['contract'];
      const result = new Contract(
        responseContract.id,
        responseContract.address,
        responseContract.abi,
        responseContract.contractType,
        responseContract.symbol,
        responseContract.token_name,
        responseContract.decimals
      );
      if (this._store.getById(result.id)) {
        this._store.remove(this._store.getById(result.id));
      }
      this._store.add(result);
      return result;
    } catch (err) {
      console.log('Failed to create contract', err);
      throw new Error(
        err.responseJSON && err.responseJSON.error
          ? err.responseJSON.error
          : 'Failed to create contract'
      );
    }
  }
  public addToStore(contract: Contract) {
    return this._store.add(contract);
  }
  public initialize(contracts = [], reset = true) {
    if (reset) {
      this._store.clear();
    }
    contracts.forEach((contract) => {
      try {
        const result: Array<Record<string, unknown>> = JSON.parse(contract.ContractAbi.abi);
        this._store.add(
          Contract.fromJSON({
            ...contract,
            abi: result,
          })
        );
      } catch (e) {
        console.error(e);
      }
    });

    this._initialized = true;
  }
}

export default ContractsController;
