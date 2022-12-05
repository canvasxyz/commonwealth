import { Sequelize} from 'sequelize';
import { Models } from '../models';
import { IPagination, OrderByOptions } from 'common-common/src/api/extApiTypes';

/*
These methods are for generating the sequelize formatting for
different types of query options. Enumerated methods here
for ORDERING, GROUPING, LIMIT, OFFSET
*/

// Yields `GROUP BY property`
export const groupBy = (property: string) => {
  return { group: property };
};

// Yields `LIMIT count`
export const limitBy = (count: number) => {
  return { limit: count };
};

// Yields `OFFSET page`
export const offsetBy = (page: number) => {
  return { offset: page };
};

// Yields `LIMIT count OFFSET page`
export const paginate = (count: number, page: number) => {
  return { limit: count, offset: count * (page - 1) };
};

// helper methods
export const formatPagination = (query: IPagination) => {
  const { limit, page } = query;
  let pagination: any = {};
  if (limit && page) pagination = paginate(limit, page);
  else if (limit) pagination = limitBy(limit);

  pagination.order = [[OrderByOptions.CREATED, 'DESC']];
  if (query.sort == OrderByOptions.UPDATED) pagination.order = [[OrderByOptions.UPDATED, 'DESC']];

  return pagination;
};