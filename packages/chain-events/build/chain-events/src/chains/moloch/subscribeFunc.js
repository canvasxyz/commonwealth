"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeEvents = exports.createApi = void 0;
const ethereum_block_by_date_1 = __importDefault(require("ethereum-block-by-date"));
const sleep_promise_1 = __importDefault(require("sleep-promise"));
const eth_1 = require("../../eth");
const contractTypes_1 = require("../../contractTypes");
const interfaces_1 = require("../../interfaces");
const logging_1 = require("../../logging");
const subscriber_1 = require("./subscriber");
const processor_1 = require("./processor");
const storageFetcher_1 = require("./storageFetcher");
/**
 * Attempts to open an API connection, retrying if it cannot be opened.
 * @returns a promise resolving to an ApiPromise once the connection has been established
 * @param ethNetworkUrl
 * @param contractVersion
 * @param contractAddress
 * @param retryTimeMs
 * @param chain
 */
async function createApi(ethNetworkUrl, contractVersion, contractAddress, retryTimeMs = 10 * 1000, chain) {
    // eslint-disable-next-line no-shadow
    const log = logging_1.factory.getLogger((0, logging_1.addPrefix)(__filename, [interfaces_1.SupportedNetwork.Moloch, chain]));
    for (let i = 0; i < 3; ++i) {
        try {
            const provider = await (0, eth_1.createProvider)(ethNetworkUrl, interfaces_1.SupportedNetwork.Moloch, chain);
            const contract = contractVersion === 1
                ? contractTypes_1.Moloch1__factory.connect(contractAddress, provider)
                : contractTypes_1.Moloch2__factory.connect(contractAddress, provider);
            await contract.deployed();
            // fetch summoning time to guarantee connected
            await contract.summoningTime();
            log.info('Connection successful!');
            return contract;
        }
        catch (err) {
            log.error(`Moloch ${contractAddress} at ${ethNetworkUrl} failure: ${err.message}`);
            await (0, sleep_promise_1.default)(retryTimeMs);
            log.error('Retrying connection...');
        }
    }
    throw new Error(`[${interfaces_1.SupportedNetwork.Moloch}${chain ? `::${chain}` : ''}]: Failed to start Moloch listener for ${contractAddress} at ${ethNetworkUrl}`);
}
exports.createApi = createApi;
/**
 * This is the main function for edgeware event handling. It constructs a connection
 * to the chain, connects all event-related modules, and initializes event handling.
 * @param options
 * @returns An active block subscriber.
 */
const subscribeEvents = async (options) => {
    const { chain, api, handlers, skipCatchup, discoverReconnectRange, contractVersion, verbose, } = options;
    const log = logging_1.factory.getLogger((0, logging_1.addPrefix)(__filename, [interfaces_1.SupportedNetwork.Moloch, chain]));
    // helper function that sends an event through event handlers
    const handleEventFn = async (event) => {
        let prevResult = null;
        for (const handler of handlers) {
            try {
                event.chain = chain;
                event.received = Date.now();
                // pass result of last handler into next one (chaining db events)
                prevResult = await handler.handle(event, prevResult);
            }
            catch (err) {
                log.error(`Event handle failure: ${err.message}`);
                break;
            }
        }
    };
    // helper function that sends a block through the event processor and
    // into the event handlers
    const processor = new processor_1.Processor(api, contractVersion);
    const processEventFn = async (event) => {
        // retrieve events from block
        const cwEvents = await processor.process(event);
        // process events in sequence
        for (const cwEvent of cwEvents) {
            await handleEventFn(cwEvent);
        }
    };
    const subscriber = new subscriber_1.Subscriber(api, chain, verbose);
    // helper function that runs after we've been offline/the server's been down,
    // and attempts to fetch skipped events
    const pollMissedEventsFn = async () => {
        if (!discoverReconnectRange) {
            log.warn('No function to discover offline time found, skipping event catchup.');
            return;
        }
        log.info(`Fetching missed events since last startup of ${chain}...`);
        let offlineRange;
        try {
            offlineRange = await discoverReconnectRange();
            if (!offlineRange) {
                log.warn('No offline range found, skipping event catchup.');
                return;
            }
        }
        catch (e) {
            log.error(`Could not discover offline range: ${e.message}. Skipping event catchup.`);
            return;
        }
        // reuse provider interface for dater function
        const dater = new ethereum_block_by_date_1.default(api.provider);
        const fetcher = new storageFetcher_1.StorageFetcher(api, contractVersion, dater);
        try {
            const cwEvents = await fetcher.fetch(offlineRange);
            // process events in sequence
            for (const cwEvent of cwEvents) {
                await handleEventFn(cwEvent);
            }
        }
        catch (e) {
            log.error(`Unable to fetch events from storage: ${e.message}`);
        }
    };
    if (!skipCatchup) {
        await pollMissedEventsFn();
    }
    else {
        log.info('Skipping event catchup on startup!');
    }
    try {
        log.info(`Subscribing to Moloch contract ${chain}...`);
        await subscriber.subscribe(processEventFn);
    }
    catch (e) {
        log.error(`Subscription error: ${e.message}`);
    }
    return subscriber;
};
exports.subscribeEvents = subscribeEvents;
