import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import { factory, formatFilename } from 'common-common/src/logging';
import validateChain from '../middleware/validateChain';
import { getNextPollEndingTime } from '../../shared/utils';
import { DB } from '../models';
import { AppError, ServerError } from 'common-common/src/errors';
import { findOneRole, isAddressPermitted } from '../util/roles';
import { Action, PermissionError } from 'common-common/src/permissions';

const log = factory.getLogger(formatFilename(__filename));

export const Errors = {
  NoThreadId: 'Must provide thread_id',
  NoThread: 'Cannot find thread',
  InvalidContent: 'Invalid poll content',
  InvalidDuration: 'Invalid poll duration',
  NotAuthor: 'Only the thread author can start polling',
  MustBeAdmin: 'Must be admin to create poll',
};

// TODO Graham 22-05-06: delete and update functionality should eventually be supported

const createPoll = async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [chain, error] = await validateChain(models, req.body);
  if (error) return next(new AppError(error));

  const author = req.address;

  const permission_error = await isAddressPermitted(
    models,
    author.id,
    chain.id,
    Action.CREATE_POLL
  );
  if (permission_error === PermissionError.NOT_PERMITTED) {
    return next(new AppError(PermissionError.NOT_PERMITTED));
  }

  const { thread_id, prompt, options } = req.body;
  let { custom_duration } = req.body;
  if (!thread_id) return next(new AppError(Errors.NoThreadId));

  if (custom_duration && custom_duration !== 'Infinite') {
    custom_duration = Number(custom_duration);
    if (
      !Number.isInteger(custom_duration) ||
      custom_duration < 0 ||
      custom_duration > 31
    ) {
      return next(new AppError(Errors.InvalidDuration));
    }
  }
  const ends_at =
    custom_duration === 'Infinite'
      ? null
      : custom_duration
      ? moment().add(custom_duration, 'days')
      : getNextPollEndingTime(moment());

  try {
    const thread = await models.Thread.findOne({
      where: {
        id: thread_id,
      },
    });
    if (!thread) return next(new AppError(Errors.NoThread));
    const userOwnedAddressIds = (await req.user.getAddresses())
      .filter((addr) => !!addr.verified)
      .map((addr) => addr.id);
    // TODO Graham 22-05-02: We should allow collaborators to start polling too
    if (!req.user || !userOwnedAddressIds.includes(thread.address_id)) {
      return next(new AppError(Errors.NotAuthor));
    }

    // check if admin_only flag is set
    if (thread.Chain?.admin_only_polling) {
      const role = await findOneRole(
        models,
        { where: { address_id: thread.address_id } },
        thread.Chain.id,
        ['admin']
      );
      if (role && !req.user.isAdmin) {
        return next(new AppError(Errors.MustBeAdmin));
      }
    }

    thread.has_poll = true;
    await thread.save();

    const finalPoll = await models.Poll.create({
      thread_id,
      chain_id: chain.id,
      prompt,
      options,
      ends_at,
    });

    return res.json({ status: 'Success', result: finalPoll.toJSON() });
  } catch (e) {
    return next(new ServerError(e));
  }
};

export default createPoll;
