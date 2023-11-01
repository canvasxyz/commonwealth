import { AppError } from 'common-common/src/errors';
import { ChainCategoryType } from 'common-common/src/types';
import type { NextFunction } from 'express';
import type { DB } from '../models';
import type { TypedRequestBody, TypedResponse } from '../types';
import { success } from '../types';

type UpdateChainCategoryReq = {
  selected_tags: { [tag: string]: boolean };
  chain_id: string;
  auth: string;
  jwt: string;
};

type UpdateChainCategoryRes = {
  chain: string;
  tags: ChainCategoryType[];
};

const updateChainCategory = async (
  models: DB,
  req: TypedRequestBody<UpdateChainCategoryReq>,
  res: TypedResponse<UpdateChainCategoryRes>,
  next: NextFunction,
) => {
  const chain = await models.Community.findOne({
    where: {
      id: req.body.chain_id,
    },
  });
  if (!chain) throw new AppError('Invalid Chain Id');

  const existingCategories = chain.category ? (chain.category as string[]) : [];
  const updateCategories = Object.keys(req.body.selected_tags).filter((tag) => {
    return (
      req.body.selected_tags[tag] &&
      Object.keys(ChainCategoryType).includes(tag)
    );
  });

  if (
    existingCategories.length !== updateCategories.length ||
    !updateCategories.every(
      (element, index) => element === existingCategories[index],
    )
  ) {
    chain.category = updateCategories;
    await chain.save();
  }
  const updatedCategory = {
    [req.body.chain_id]: updateCategories as ChainCategoryType[],
  };
  return success(res, {
    chain: req.body.chain_id,
    tags: updateCategories as ChainCategoryType[],
  });
};

export default updateChainCategory;
