import { CosmosSigner } from '@canvas-js/chain-cosmos';
import { SubstrateSigner } from '@canvas-js/chain-substrate';
import { AbstractSessionData, Session } from '@canvas-js/interfaces';
import { fromBech32, toBech32 } from '@cosmjs/encoding';
import { addressSwapper } from 'shared/utils';

/**
 * In Canvas, the default behaviour is that a SessionSigner saves a session key in localStorage for
 * each combination of chain base (e.g. "cosmos", "ethereum", "substrate"), chain id and address.
 *
 * This is not ideal for Commonwealth, where the chain id is not always known, e.g. with Cosmos.
 *
 * In these cases we want to override the default behaviour and store one session for all chains.
 * We can do this by overriding the `getAddress` method of the session signer class (e.g. CosmosSigner).
 */

export class CosmosSignerCW extends CosmosSigner {
  public async getAddress(): Promise<string> {
    const chainId = await this._signer.getChainId();
    const walletAddress = await this._signer.getAddress(chainId);
    const { data } = fromBech32(walletAddress);
    const walletAddressWithPrefix = toBech32(this.bech32Prefix, data);
    return `cosmos:cosmoshub-1:${walletAddressWithPrefix}`;
  }

  // Use this._signer.getChainId() instead of the chainId inferred from the CAIP-2 address
  public async authorize(data: AbstractSessionData): Promise<Session<any>> {
    const { topic, address, timestamp, publicKey, duration } = data;

    const addressPattern = /^cosmos:([0-9a-z\-_]+):([a-zA-Fa-f0-9]+)$/;
    function parseAddress(
      address: string,
    ): [chain: string, walletAddress: string] {
      const result = addressPattern.exec(address);
      if (result === null) {
        throw new Error(
          `invalid address: ${address} did not match ${addressPattern}`,
        );
      }

      const [_, chain, walletAddress] = result;
      return [chain, walletAddress];
    }

    const [chainId, walletAddress] = parseAddress(address);

    const issuedAt = new Date(timestamp);
    const message = {
      topic: topic,
      address: walletAddress,
      chainId,
      publicKey: publicKey,
      issuedAt: issuedAt.toISOString(),
      expirationTime: null,
    };

    if (duration !== null) {
      message.expirationTime = new Date(timestamp + duration).toISOString();
    }

    const signResult = await this._signer.sign(
      message,
      walletAddress,
      this._signer.getChainId(),
    );

    return {
      type: 'session',
      address: address,
      publicKey: publicKey,
      authorizationData: signResult,
      blockhash: null,
      timestamp: timestamp,
      duration: duration,
    };
  }
}

export class SubstrateSignerCW extends SubstrateSigner {
  public async getAddress(): Promise<string> {
    const chainId = await this._signer.getChainId();
    const walletAddress = await this._signer.getAddress(chainId);
    const finalAddress = addressSwapper({
      currentPrefix: 42,
      address: walletAddress,
    });
    return `polkadot:42:${finalAddress}`;
  }

  hasSession(topic, address) {
    const [namespace, chainId, walletAddress] = address.split(':');
    const finalAddress = addressSwapper({
      currentPrefix: 42,
      address: walletAddress,
    });
    const key = `canvas/${topic}/${namespace}:${chainId}:${finalAddress}`;
    return this.target.get(key) !== null;
    // return this.#cache.has(key) || target.get(key) !== null
  }
}