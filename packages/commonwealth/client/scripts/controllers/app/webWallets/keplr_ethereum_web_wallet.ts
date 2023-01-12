import { EthSignType } from '@keplr-wallet/types';
import app from 'state';

import type { OfflineDirectSigner, AccountData } from '@cosmjs/proto-signing';

import { ChainBase, ChainNetwork, WalletId } from 'common-common/src/types';
import type { Account, IWebWallet } from 'models';
import type { ChainInfo, Window as KeplrWindow } from '@keplr-wallet/types';
import type { CanvasData } from 'shared/adapters/shared';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

class EVMKeplrWebWalletController implements IWebWallet<AccountData> {
  // GETTERS/SETTERS
  private _accounts: readonly AccountData[];
  private _enabled: boolean;
  private _enabling = false;
  private _chainId: string;
  private _offlineSigner: OfflineDirectSigner;

  public readonly name = WalletId.KeplrEthereum;
  public readonly label = 'Keplr (Ethereum)';
  public readonly chain = ChainBase.CosmosSDK;
  public readonly defaultNetwork = ChainNetwork.Evmos;
  public readonly specificChains = ['evmos'];

  public get available() {
    return !!window.keplr;
  }
  public get enabling() {
    return this._enabling;
  }
  public get enabled() {
    return this.available && this._enabled;
  }
  public get accounts() {
    return this._accounts || [];
  }
  public get api() {
    return window.keplr;
  }
  public get offlineSigner() {
    return this._offlineSigner;
  }

  getChainId() {
    return this._chainId;
  }

  public async getRecentBlock(chainIdentifier: string) {
    const url = `${window.location.origin}/cosmosAPI/${
      chainIdentifier
    }`;
    const cosm = await import('@cosmjs/stargate')
    const client = await cosm.StargateClient.connect(url);
    const height = await client.getHeight();
    const block = await client.getBlock(height - 1);

    return {
      number: block.header.height,
      hash: block.id,
      // seconds since epoch
      timestamp: Math.floor((new Date(block.header.time)).getTime() / 1000)
    };
  }

  public async signCanvasMessage(account: Account, canvasMessage: CanvasData): Promise<string> {
    const signature = await window.keplr.signEthereum(
      this._chainId,
      account.address,
      JSON.stringify(canvasMessage),
      EthSignType.MESSAGE
    );
    return `0x${Buffer.from(signature).toString('hex')}`;
  }

  // ACTIONS
  public async enable() {
    console.log('Attempting to enable Keplr web wallet');

    if (!window.keplr?.experimentalSuggestChain) {
      alert('Please update to a more recent version of Keplr');
      return;
    }

    // enable
    this._enabling = true;
    try {
      // fetch chain id from URL using stargate client
      const url = `${window.location.origin}/cosmosAPI/${app.chain.id}`;
      const cosm = await import('@cosmjs/stargate');
      const client = await cosm.StargateClient.connect(url);
      const chainId = await client.getChainId();
      this._chainId = chainId;
      client.disconnect();

      try {
        await window.keplr.enable(this._chainId);
      } catch (err) {
        console.log(
          `Failed to enable chain: ${err.message}. Trying experimentalSuggestChain...`
        );

        const bech32Prefix = app.chain.meta.bech32Prefix;
        const info: ChainInfo = {
          chainId: this._chainId,
          chainName: app.chain.meta.name,
          rpc: url,
          // Note that altWalletUrl on Cosmos chains should be the REST endpoint -- if not available, we
          // use the RPC url as hack, which will break some querying functionality but not signing.
          rest: app.chain.meta.node.altWalletUrl || url,
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: `${bech32Prefix}`,
            bech32PrefixAccPub: `${bech32Prefix}pub`,
            bech32PrefixValAddr: `${bech32Prefix}valoper`,
            bech32PrefixValPub: `${bech32Prefix}valoperpub`,
            bech32PrefixConsAddr: `${bech32Prefix}valcons`,
            bech32PrefixConsPub: `${bech32Prefix}valconspub`,
          },
          currencies: [
            {
              coinDenom: app.chain.meta.default_symbol,
              coinMinimalDenom: `u${app.chain.meta.default_symbol.toLowerCase()}`,
              coinDecimals: app.chain.meta.decimals || 6,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: app.chain.meta.default_symbol,
              coinMinimalDenom: `u${app.chain.meta.default_symbol.toLowerCase()}`,
              coinDecimals: app.chain.meta.decimals || 6,
            },
          ],
          stakeCurrency: {
            coinDenom: app.chain.meta.default_symbol,
            coinMinimalDenom: `u${app.chain.meta.default_symbol.toLowerCase()}`,
            coinDecimals: app.chain.meta.decimals || 6,
          },
          gasPriceStep: { low: 0, average: 0.025, high: 0.03 },
          features: ['stargate'],
        };
        await window.keplr.experimentalSuggestChain(info);
        await window.keplr.enable(this._chainId);
      }
      console.log(`Enabled web wallet for ${this._chainId}`);

      this._offlineSigner = window.keplr.getOfflineSigner(this._chainId);
      this._accounts = await this._offlineSigner.getAccounts();
      this._enabled = true;
      this._enabling = false;
    } catch (error) {
      console.error(`Failed to enable keplr wallet: ${error.message}`);
      this._enabling = false;
    }
  }
}

export default EVMKeplrWebWalletController;
