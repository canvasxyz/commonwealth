import { Request, Response, NextFunction } from 'express';
import { DB } from '../models';

export const Errors = {
  NotAuthorized: 'Not authorized',
  InvalidUpdate: 'Invalid update',
  NoProfileFound: 'No profile found',
  NoAddressFound: 'No address found',
  NoAddressProvided: 'No address provided in query',
};

const updateNewProfile = async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.address) {
    return next(new Error(Errors.NoAddressProvided));
  }

  if (
    !req.body.email &&
    !req.body.slug &&
    !req.body.name &&
    !req.body.bio &&
    !req.body.website &&
    !req.body.avatarUrl
  ) {
    return next(new Error(Errors.InvalidUpdate));
  }

  const { address, email, slug, name, bio, website, avatarUrl } = req.body;

  const addressModel = await models.Address.findOne({
    where: {
      address,
    },
    include: [models.OffchainProfile],
  });
  if (!addressModel) return next(new Error(Errors.NoAddressFound));

  if (addressModel.user_id !== req.user.id) {
    return next(new Error(Errors.NotAuthorized));
  }

  const profile = await models.Profile.findOne({
    where: {
      id: addressModel.profile_id,
    },
  });
  if (!profile) return next(new Error(Errors.NoProfileFound));

  const updateStatus = await models.Profile.update(
    {
      ...(email && { email }),
      ...(slug && { slug }),
      ...(name && { profile_name: name }),
      ...(bio && { bio }),
      ...(website && { website }),
      ...(avatarUrl && { avatar_url: avatarUrl }),
    },
    {
      where: {
        id: profile.id,
      },
    }
  );

  if (!updateStatus) {
    return res.json({
      status: 'Failed',
    });
  }

  return res.json({
    status: 'Success',
  });
};

export default updateNewProfile;
