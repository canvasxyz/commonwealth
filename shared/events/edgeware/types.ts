import { Header, EventRecord } from '@polkadot/types/interfaces';

/**
 * Substrate lacks a block type that includes events as well, so we synthesize a type
 * from the combination of headers and events.
 */
export interface SubstrateBlock {
  header: Header;
  events: EventRecord[];
}

/**
 * To implement a new form of event, add it to this enum.
 */
export enum SubstrateEventType {
  Slash = 'slash',
  Reward = 'reward',
  DemocracyProposed = 'democracy-proposed',
  DemocracyStarted = 'democracy-started',
  DemocracyPassed = 'democracy-passed',
  DemocracyNotPassed = 'democracy-not-passed',
  DemocracyCancelled = 'democracy-cancelled',
}

/**
 * The full event, including data.
 */
export interface SubstrateEvent {
  type: SubstrateEventType;
  data: any; // data format specific to event type
}
