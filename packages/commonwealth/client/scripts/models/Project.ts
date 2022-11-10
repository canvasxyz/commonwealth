import BN from 'bn.js';
import moment from 'moment';
import * as CommonwealthTypes from 'chain-events/src/chains/commonwealth/types';
import ChainEntityT from './ChainEntity';
import { CWParticipant } from '../controllers/chain/ethereum/commonwealth/participants';
import AddressInfo from './AddressInfo';
import { weiToTokens } from '../helpers';

const projectDefaults = {
  title: 'Untitled Crowdfund',
  description: 'This project has not been provided with a description.',
  coverImage: '/static/img/crowdfund_default.png',
};

class Project {
  // Helper getters
  public get address(): string {
    return this.createdEvent.id;
  }

  public get completionPercent(): number {
    return (
      +weiToTokens(this.fundingAmount.toString(), 18) /
      +weiToTokens(this.threshold.toString(), 18)
    );
  }

  public get creatorAddressInfo(): AddressInfo {
    return new AddressInfo(
      this.creatorAddressId,
      this.creator,
      this.chainId || 'ethereum',
      null
    );
  }

  // Event getters
  public get createdEvent(): CommonwealthTypes.IProjectCreated {
    return this.entity.chainEvents.find(
      ({ type }) =>
        type.eventName === CommonwealthTypes.EventKind.ProjectCreated
    ).data as CommonwealthTypes.IProjectCreated;
  }

  public get backEvents(): CommonwealthTypes.IProjectBacked[] {
    return this.entity.chainEvents
      .filter(
        ({ type }) =>
          type.eventName === CommonwealthTypes.EventKind.ProjectBacked
      )
      .map(({ data }) => data as CommonwealthTypes.IProjectBacked);
  }

  public get curateEvents(): CommonwealthTypes.IProjectCurated[] {
    return this.entity.chainEvents
      .filter(
        ({ type }) =>
          type.eventName === CommonwealthTypes.EventKind.ProjectCurated
      )
      .map(({ data }) => data as CommonwealthTypes.IProjectCurated);
  }

  public get succeededEvent(): CommonwealthTypes.IProjectSucceeded | null {
    const evt = this.entity.chainEvents.find(
      ({ type }) =>
        type.eventName === CommonwealthTypes.EventKind.ProjectSucceeded
    );
    if (evt) {
      return evt.data as CommonwealthTypes.IProjectSucceeded;
    }
    return null;
  }

  public get failedEvent(): CommonwealthTypes.IProjectFailed | null {
    const evt = this.entity.chainEvents.find(
      ({ type }) => type.eventName === CommonwealthTypes.EventKind.ProjectFailed
    );
    if (evt) {
      return evt.data as CommonwealthTypes.IProjectFailed;
    }
    return null;
  }

  public isEnded(currentBlockNumber: number): boolean {
    return currentBlockNumber > this.deadline;
  }

  public get withdrawEvents(): CommonwealthTypes.IProjectWithdraw[] {
    return this.entity.chainEvents
      .filter(
        ({ type }) =>
          type.eventName === CommonwealthTypes.EventKind.ProjectWithdraw
      )
      .map(({ data }) => data as CommonwealthTypes.IProjectWithdraw);
  }

  // Role getters

  public get backers(): CWParticipant[] {
    const backerAmounts: { [address: string]: BN } = {};
    return [
      new CWParticipant(
        this,
        '0xDaB156b7F2aFcBE63301eB2C81941703b808B28C',
        new BN(5000000000000000)
      ),
    ];

    this.backEvents.forEach((event) => {
      const runningTotal = backerAmounts[event.sender] || new BN(0);
      backerAmounts[event.sender] = runningTotal.add(new BN(event.amount));
    });

    return this.backEvents.map((event) => {
      return new CWParticipant(this, event.sender, backerAmounts[event.sender]);
    });
  }

  public get curators(): CWParticipant[] {
    const curatorAmounts: { [address: string]: BN } = {};

    this.curateEvents.forEach((event) => {
      const runningTotal = curatorAmounts[event.sender] || new BN(0);
      curatorAmounts[event.sender] = runningTotal.add(new BN(event.amount));
    });

    return this.curateEvents.map((event) => {
      return new CWParticipant(
        this,
        event.sender,
        curatorAmounts[event.sender]
      );
    });
  }

  // Role checks

  public isAuthor(address: string, chainId: string): boolean {
    if (!this.chainId) return false;
    return this.address === address && this.chainId === chainId;
  }

  public isBacker(address: string, chainId: string): boolean {
    if (!this.chainId) return false;
    return this.backers.some(
      (backer: CWParticipant) =>
        backer.address === address && this.chainId === chainId
    );
  }

  public getBackedAmount(address: string, chainId: string): BN {
    if (!this.isBacker(address, chainId)) return null;
    let totalAmount = new BN(0);
    this.backers.forEach((backer: CWParticipant) => {
      if (backer.address === address && this.chainId === chainId) {
        totalAmount = totalAmount.add(backer.amount);
      }
    });
    return totalAmount;
  }

  public isCurator(address: string, chainId: string): boolean {
    if (!this.chainId) return false;
    return this.curators.some(
      (curator: CWParticipant) =>
        curator.address === address && this.chainId === chainId
    );
  }

  public getCuratedAmount(address: string, chainId: string): BN {
    if (!this.isCurator(address, chainId)) return null;
    let totalAmount = new BN(0);
    this.curators.forEach((curator: CWParticipant) => {
      if (curator.address === address && this.chainId === chainId) {
        totalAmount = totalAmount.add(curator.amount);
      }
    });
    return totalAmount;
  }

  constructor(
    // on-chain data
    public readonly id: number,
    public readonly creator: string,
    public readonly creatorAddressId: number,
    public readonly beneficiary: string,
    public readonly token: string,
    public readonly title: string = projectDefaults.title,
    public readonly description: string = projectDefaults.description,
    public readonly shortDescription: string,
    public readonly coverImage: string = projectDefaults.coverImage,
    public readonly curatorFee: number,
    public readonly threshold: BN,
    public readonly deadline: number,
    public readonly createdAt: moment.Moment,
    public fundingAmount: BN,
    public readonly entity: ChainEntityT,
    public readonly chainId?: string
  ) {}

  public static fromJSON({
    id,
    chain_id,
    creator,
    creator_address_id,
    beneficiary,
    token,
    title,
    description,
    short_description,
    cover_image,
    curator_fee,
    threshold,
    deadline,
    created_at,
    funding_amount,
    ChainEntity,
  }: {
    id: number;
    chain_id?: string;
    creator: string;
    creator_address_id?: number;
    beneficiary: string;
    token: string;
    title: string;
    description: string;
    short_description: string;
    cover_image: string;
    curator_fee: string;
    threshold: string;
    deadline: number;
    created_at: number;
    funding_amount: string;
    ChainEntity;
  }) {
    return new Project(
      id,
      creator,
      creator_address_id,
      beneficiary,
      token,
      title || projectDefaults.title,
      description || projectDefaults.description,
      short_description,
      cover_image || projectDefaults.coverImage,
      +curator_fee,
      new BN(threshold),
      deadline,
      moment(created_at),
      new BN(funding_amount),
      ChainEntityT.fromJSON(ChainEntity),
      chain_id
    );
  }
}

export default Project;
