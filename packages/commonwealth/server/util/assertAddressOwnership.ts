import { ServerError } from '@hicommonwealth/core';
import { logger } from '@hicommonwealth/logging';
import type { DB } from '@hicommonwealth/model';
import { fileURLToPath } from 'node:url';
import { Op, Transaction } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const log = logger(__filename);

export default async function assertAddressOwnership(
  models: DB,
  address: string,
  transaction?: Transaction,
) {
  const addressUsers = await models.Address.findAll({
    where: {
      address,
      verified: { [Op.ne]: null },
    },
    transaction,
  });
  const numUserIds = new Set(addressUsers.map((au) => au.user_id)).size;
  if (numUserIds !== 1) {
    log.error(`Address ${address} is not owned by a single user!`);
    if (process.env.NODE_ENV !== 'production') {
      throw new ServerError('Address failed assertion check');
    }
  }

  const numProfileIds = new Set(addressUsers.map((au) => au.profile_id)).size;
  if (numProfileIds !== 1) {
    log.error(`Address ${address} relates to multiple profiles!`);
    if (process.env.NODE_ENV !== 'production') {
      throw new ServerError('Address failed assertion check');
    }
  }
}
