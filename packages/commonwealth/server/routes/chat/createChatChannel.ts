import { AppError } from 'common-common/src/errors';
import type { NextFunction, Request, Response } from 'express';
import type { DB } from '../../models';

export const Errors = {
  NotLoggedIn: 'Not logged in',
  NotAdmin: 'Must be an admin to create a chat channel',
  NoChainId: 'No chain id given',
};

export default async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError(Errors.NotLoggedIn));
  }

  if (!req.user.isAdmin) {
    return next(new AppError(Errors.NotAdmin));
  }

  if (!req.body.chain_id) {
    return next(new AppError(Errors.NoChainId));
  }

  const channel = await models.ChatChannel.create({
    name: req.body.name,
    chain_id: req.body.chain_id,
    category: req.body.category,
  });

  return res.json({
    status: '200',
    result: { chat_channel: channel.toJSON() },
  });
};
