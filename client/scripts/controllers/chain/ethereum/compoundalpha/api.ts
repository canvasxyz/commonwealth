import { AsyncSendable } from 'ethers/providers';

import { Uni } from 'Uni'; // @TODO: Change to COMP
import { GovernorAlpha } from 'GovernorAlpha';
import { GovernorAlphaFactory } from 'GovernorAlphaFactory';
import ContractApi, { ContractFactoryT } from 'controllers/chain/ethereum/contractApi';

export default class CompoundalphaAPI extends ContractApi<Uni> {
  private _GovernorAlphaAddress: string;
  private _GovernorAlphaContract: GovernorAlpha;
  private _Symbol: string;

  public get governorAlphaAddress() { return this._GovernorAlphaAddress; }
  public get governorAlphaContract(): GovernorAlpha { return this._GovernorAlphaContract; }

  public get symbol(): string { return this._Symbol; }

  constructor(
    factory: ContractFactoryT<Uni>,
    mPondAddress: string,
    governorAlphaAddress: string,
    web3Provider: AsyncSendable,
  ) {
    super(factory, mPondAddress, web3Provider);
    this._GovernorAlphaAddress = governorAlphaAddress;
    this._GovernorAlphaContract = GovernorAlphaFactory.connect(governorAlphaAddress, this.Provider);
  }

  public async init() {
    // Comp is the token
    await super.init(this.contractAddress);
    this._Symbol = await this.Contract.symbol();
  }
}
