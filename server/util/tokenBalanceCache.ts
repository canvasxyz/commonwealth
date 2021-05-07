import moment from 'moment';
import Web3 from 'web3';
import BN from 'bn.js';
import { providers } from 'ethers';

import { INFURA_API_KEY } from '../config';
import { Erc20Factory } from '../../eth/types/Erc20Factory';
import { Erc20 } from '../../eth/types/Erc20';

import JobRunner from './cacheJobRunner';
import TokenListCache, { TokenResponse } from './tokenListCache';
import { tokenNameToId } from './createTokenChain';

import { factory, formatFilename } from '../../shared/logging';
const log = factory.getLogger(formatFilename(__filename));
const TEST_CONTRACT_ID = 'ABC';

// map of addresses to balances
interface CacheT {
  [contract: string]: {
    [address: string]: {
      balance: BN,
      fetchedAt: moment.Moment;
    };
  };
}

export interface TokenForumMeta {
  id: string;
  address: string;
  balanceThreshold?: BN;
  api?: Erc20;
}

export default class TokenBalanceCache extends JobRunner<CacheT> {
  private _contracts: TokenForumMeta[];

  constructor(
    private readonly _listCache: TokenListCache,
    noBalancePruneTimeS: number = 5 * 60,
    private readonly _hasBalancePruneTimeS: number = 24 * 60 * 60,
  ) {
    super({}, noBalancePruneTimeS);
    this._listCache = new TokenListCache();
  }

  private async _connectTokens(models, network = 'mainnet'): Promise<TokenForumMeta[]> {
    // initialize web3 (we all URL fields should be the same -- infura)
    const web3Provider = new Web3.providers.HttpProvider(`https://${network}.infura.io/v3/${INFURA_API_KEY}`);
    const provider = new providers.Web3Provider(web3Provider);

    // initialize metadata from database
    const dbTokens = await models['Chain'].findAll({
      where: { type: 'token' },
      include: [ models['ChainNode'] ],
    });

    // TODO: support customized balance thresholds
    // TODO: support ChainId
    const tokens: TokenForumMeta[] = dbTokens
      .filter(({ ChainNodes }) => ChainNodes)
      .map(({ ChainNodes }): TokenForumMeta => ({
        id: ChainNodes[0].chain,
        address: ChainNodes[0].address,
        api: Erc20Factory.connect(ChainNodes[0].address, provider),
      }));

    try {
      const tokensFromListsResponses = await this._listCache.getTokens();
      const tokensFromLists: TokenForumMeta[] = tokensFromListsResponses
        .map((o) => {
          return {
            id: tokenNameToId(o.name),
            address: o.address,
            api: Erc20Factory.connect(o.address, provider)
          };
        });

      return [...tokens, ...tokensFromLists];
    } catch (e) {
      log.error('An error occurred trying to access token lists', e.message);
    }

    return tokens;
  }

  public async start(models, network = 'mainnet', prefetchedTokenMeta?: TokenForumMeta[]) {
    if (!prefetchedTokenMeta) {
      const tokenMeta = await this._connectTokens(models, network);
      this._contracts = tokenMeta;
    } else {
      const tokenMeta = await this._connectTokens(models, network);
      this._contracts = tokenMeta;
    }

    // write init values into saved cache
    await this.access(async (cache) => {
      for (const { id } of this._contracts) {
        cache[id] = { };
      }
    });

    // kick off job
    super.start();
    log.info(`Started Token Balance Cache with ${this._contracts.length} tokens.`);
  }

  public async reset(tokenMeta: TokenForumMeta[]) {
    super.close();
    await this.access(async (cache) => {
      for (const key of Object.keys(cache)) {
        delete cache[key];
      }
    });
    return this.start(tokenMeta);
  }

  public getTokens(): Promise<TokenResponse[]> {
    return this._listCache.getTokens();
  }

  // query a user's balance on a given token contract and save in cache
  public async hasToken(contractId: string, address: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'development' && contractId === TEST_CONTRACT_ID) {
      return true;
    }
    const tokenMeta = this._contracts.find(({ id }) => id === contractId);
    if (!tokenMeta || !tokenMeta.api) throw new Error('unsupported token');
    const threshold = tokenMeta.balanceThreshold || new BN(1);

    // first check the cache for the token balance
    const result = await this.access((async (c: CacheT): Promise<BN | undefined> => {
      return c[contractId][address]?.balance;
    }));
    if (result !== undefined) return result.gte(threshold);

    // fetch balance if not found in cache
    let balance: BN;
    try {
      const balanceBigNum = await tokenMeta.api.balanceOf(address);
      balance = new BN(balanceBigNum.toString());
    } catch (e) {
      throw new Error(`Could not fetch token balance: ${e.message}`);
    }
    const fetchedAt = moment();

    // write fetched balance back to cache
    await this.access((async (c: CacheT) => {
      c[contractId][address] = { balance, fetchedAt };
    }));
    return balance.gte(threshold);
  }

  // prune cache job
  protected async _job(cache: CacheT): Promise<void> {
    for (const contract of Object.keys(cache)) {
      for (const address of Object.keys(cache[contract])) {
        if (cache[contract][address].balance.eqn(0)) {
          // 5 minute lifetime (i.e. one job run) if no token balance
          delete cache[contract][address];
        } else {
          // 24 hour lifetime if token balance
          const cutoff = moment().subtract(this._hasBalancePruneTimeS, 'seconds');
          const fetchedAt = cache[contract][address].fetchedAt;
          if (fetchedAt.isSameOrBefore(cutoff)) {
            delete cache[contract][address];
          }
        }
      }
    }
  }
}
