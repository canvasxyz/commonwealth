import moment from 'moment';

import type { SubscriptionInstance } from 'server/models/subscription';
import DeliveryMechanism from './DeliveryMechanism';
import type ChainInfo from './ChainInfo';
import { default as CommentT } from './Comment';
import { Thread as ThreadT } from './Thread';
import type { IUniqueId } from './interfaces';

class NotificationSubscription {
  public readonly category: string;
  public readonly snapshotId: string;
  public readonly createdAt: moment.Moment;
  public readonly Chain: ChainInfo;
  public readonly Comment: CommentT<IUniqueId>;
  public readonly Thread: ThreadT;
  public readonly deliveryInterval?: string;
  public readonly SubscriptionDelivery: DeliveryMechanism[];

  public readonly id?: number;

  private _immediateEmail: boolean;
  public get immediateEmail() {
    return this._immediateEmail;
  }

  public enableImmediateEmail() {
    this._immediateEmail = true;
  }

  public disableImmediateEmail() {
    this._immediateEmail = false;
  }

  private _isActive: boolean;
  public disable() {
    this._isActive = false;
  }

  public enable() {
    this._isActive = true;
  }

  public get isActive() {
    return this._isActive;
  }

  public get chainId() {
    return this.Chain?.id;
  }

  public get threadId() {
    return this.Thread?.id;
  }

  public get commentId() {
    return this.Comment?.id;
  }

  public get categoryId() {
    return this.category;
  }

  constructor(
    id,
    category,
    isActive,
    createdAt,
    immediateEmail,
    deliveryInterval,
    SubscriptionDelivery?: DeliveryMechanism[],
    Chain?,
    comment?: CommentT<IUniqueId>,
    thread?: ThreadT,
    snapshotId?: string
  ) {
    this.id = id;
    this.category = category;
    this._isActive = isActive;
    this.createdAt = moment(createdAt);
    this._immediateEmail = immediateEmail;
    this.deliveryInterval = deliveryInterval;
    this.SubscriptionDelivery = SubscriptionDelivery || [];
    this.Chain = Chain;
    this.Comment = comment;
    this.Thread = thread;
    this.snapshotId = snapshotId;
  }

  public static fromJSON(json) {
    return new NotificationSubscription(
      json.id,
      json.category_id,
      json.is_active,
      json.created_at,
      json.immediate_email,
      json.delivery_interval,
      json.SubscriptionDelivery || [],
      json.Chain,
      json.Comment,
      json.Thread,
      json.snapshot_id
    );
  }
}

export const modelFromServer = (subscription: SubscriptionInstance) => {
  const {
    id,
    category_id,
    is_active,
    created_at,
    immediate_email,
    delivery_interval,
    SubscriptionDelivery,
    Chain,
    Comment,
    Thread,
    snapshot_id,
  } = subscription;

  let modeledThread: ThreadT;

  if (Thread) {
    try {
      // The `Thread` var here uses /server/models/thread.ts as its type
      // and we are modeling it to /client/scripts/models/Thread.ts so
      // using any here to avoid lint error.
      modeledThread = new ThreadT(Thread as any);
    } catch (e) {
      console.log('error', e);
    }
  }

  let modeledComment: CommentT<IUniqueId>;

  if (Comment) {
    try {
      modeledComment = new CommentT({ ...Comment } as any);
    } catch (e) {
      console.log('error', e);
    }
  }

  const modeledSubscriptionDeliveries: DeliveryMechanism[] =
    SubscriptionDelivery.map((subDelivery) =>
      DeliveryMechanism.modelFromServer(subDelivery.DeliveryMechanism)
    );

  return new NotificationSubscription(
    id,
    category_id,
    is_active,
    created_at,
    immediate_email,
    delivery_interval,
    modeledSubscriptionDeliveries,
    Chain,
    modeledComment,
    modeledThread,
    snapshot_id
  );
};

export default NotificationSubscription;
