import { PinoLogger } from '@hicommonwealth/adapters';
import { logger } from '@hicommonwealth/core';
import { EVM_CE_POLL_INTERVAL_MS } from '../../config';
import { processChainNode, scheduleNodeProcessing } from './nodeProcessing';

const log = logger(PinoLogger()).getLogger(__filename);

/**
 * Starts an infinite loop that periodically fetches and parses blocks from
 * relevant EVM blockchains. Events parsed from these blocks are emitted
 * as chain-event notifications. The interval between each fetch is specified in milliseconds and should be
 * no more than 500k ms (500 seconds) so that we support any EVM chain that has an average block time of
 * 1 second or more (block fetching is limited to 500 blocks per interval). The recommended interval
 * is 120_000 ms (120 seconds) to avoid issues with public EVM nodes rate limiting requests.
 */
export async function startEvmPolling(
  interval: number,
): Promise<NodeJS.Timeout> {
  const { models } = await import('@hicommonwealth/model');

  log.info(`Starting EVM poller`);
  if (interval > 500_000) {
    throw new Error(
      `Interval for EVM polling must be less than 500_000 ms (500 seconds)`,
    );
  }

  log.info(
    `All chains will be polled for events every ${interval / 1000} seconds`,
  );
  await scheduleNodeProcessing(models, interval, processChainNode);
  return setInterval(
    scheduleNodeProcessing,
    interval,
    models,
    interval,
    processChainNode,
  );
}

if (require.main === module) {
  startEvmPolling(EVM_CE_POLL_INTERVAL_MS).catch((e) => {
    log.error('Evm poller shutting down due to a critical error:', e);
    process.exit(1);
  });
}
