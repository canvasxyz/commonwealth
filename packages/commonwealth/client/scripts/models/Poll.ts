import axios from 'axios';
import moment from 'moment';
import { SERVER_URL } from 'state/api/config';
import { notifyError } from '../controllers/app/notifications';
import { userStore } from '../state/ui/user';
import Vote from './Vote';

class Poll {
  public readonly id: number;
  public readonly threadId: number;
  public readonly communityId: string;
  public readonly createdAt: moment.Moment;
  public readonly endsAt: moment.Moment;
  public readonly prompt: string;
  public readonly options: string[];
  private readonly _votes: Vote[];

  public get votes() {
    return this._votes;
  }

  public get votesNum() {
    return this._votes.length;
  }

  constructor({
    id,
    threadId,
    communityId,
    createdAt,
    endsAt,
    prompt,
    options,
    votes,
  }: {
    id: number;
    threadId: number;
    communityId: string;
    createdAt: moment.Moment;
    endsAt: moment.Moment;
    prompt: string;
    options: string[];
    votes: Vote[];
  }) {
    this.id = id;
    this.threadId = threadId;
    this.communityId = communityId;
    this.createdAt = createdAt;
    this.endsAt = endsAt;
    this.prompt = prompt;
    this.options = options;
    this._votes = votes;
  }

  public getUserVote(chain: string, address: string) {
    return (this.votes || []).find(
      (vote) => vote.address === address && vote.authorCommunityId === chain,
    );
  }

  public getVotes(): Vote[] {
    return this.votes;
  }

  public async submitVote(
    authorChain: string,
    address: string,
    option: string,
  ) {
    const selectedOption = this.options.find((o: string) => o === option);
    if (!selectedOption) {
      notifyError('Invalid voting option');
    }
    // TODO move put to RQ
    const response = await axios.put(`${SERVER_URL}/polls/${this.id}/votes`, {
      poll_id: this.id,
      chain_id: this.communityId,
      author_chain: authorChain,
      option: selectedOption,
      address,
      jwt: userStore.getState().jwt,
    });
    // TODO Graham 5/3/22: We should have a dedicated controller + store
    // to handle logic like this
    const vote = new Vote(response.data.result);
    // Remove existing vote
    const existingVoteIndex = this.votes.findIndex(
      (v) => v.address === address && v.authorCommunityId === authorChain,
    );
    if (existingVoteIndex !== -1) {
      this.votes.splice(existingVoteIndex, 1);
    }
    // Add new or updated vote
    this.votes.push(vote);
    return vote;
  }

  public static fromJSON(json) {
    const {
      id,
      thread_id,
      community_id,
      prompt,
      options,
      ends_at,
      votes = [],
      created_at,
    } = json;

    let pollOptions;

    try {
      pollOptions = JSON.parse(options);
    } catch (e) {
      pollOptions = [];
    }

    return new Poll({
      id,
      threadId: thread_id,
      communityId: community_id,
      prompt,
      options: pollOptions,
      endsAt: moment(ends_at),
      votes: votes.map((v) => new Vote(v)),
      createdAt: moment(created_at),
    });
  }
}

export default Poll;
