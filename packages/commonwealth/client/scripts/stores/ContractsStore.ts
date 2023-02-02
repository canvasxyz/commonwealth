import type { Contract } from '../models';
import IdStore from './IdStore';

// Models a store of all the contracts
class ContractsStore extends IdStore<Contract> {
  private _storeAddress: { [address: string]: Contract } = {};
  private _storeType: { [type: string]: Array<Contract> } = {};
  private _storeFactories : Array<Contract> = [];

  public add(contract: Contract) {
    super.add(contract);
    this._storeAddress[contract.address] = contract;
    if (!this._storeType[contract.type]) {
      this._storeType[contract.type] = [];
    }
    this._storeType[contract.type].push(contract);
    if (contract.isFactory) {
      this._storeFactories.push(contract);
    }
    return this;
  }

  public remove(contract: Contract) {
    super.remove(contract);
    delete this._storeAddress[contract.address];
    const typeIndex = this._storeType[contract.type].indexOf(contract);
    if (typeIndex === -1) {
      console.error(
        'Attempting to remove a contract that was not found in the types store'
      );
    }
    this._storeType[contract.type].splice(typeIndex, 1);
    return this;
  }
  public getFactoryContractByNickname(nickname: string): Contract {
    // filter through the _storeId map for a contract with a specified nickname
    const contracts = this._storeFactories.filter((c) => c.nickname === nickname);
    // if there is more than one contract with the same nickname, return the first one
    if (contracts.length > 0) {
      return contracts[0];
    } else {
      console.log('No contract found with nickname: ', nickname);
      return null;
    }
  }
  public getContractByType(type: string): Array<Contract> {
    return this._storeType[type] || [];
  }

  public getCommunityContracts(): Array<Contract> {
    // filter through the _storeId map for all contracts with a specified chain
    return this.getAll();
  }

  public getFactoryContracts(): Array<Contract> {
    // filter through the _storeId map for all contracts that are factories
    return this._storeFactories || [];
  }

  public getContractByAddress(address: string): Contract {
    return this._storeAddress[address] || null;
  }
}

export default ContractsStore;
