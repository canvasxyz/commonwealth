import { z } from 'zod';
import { PG_INT, zDate } from '../utils';

// TODO: use this as single source of truth for model?
export const Reaction = z.object({
  id: PG_INT.nullish(),
  address_id: PG_INT,
  reaction: z.enum(['like']),
  thread_id: PG_INT.nullish(),
  comment_id: PG_INT.nullish(),
  proposal_id: z.number().nullish(),
  calculated_voting_weight: PG_INT.nullish(),
  canvas_signed_data: z.any().nullish(),
  canvas_hash: z.string().max(255).nullish(),
  created_at: zDate.nullish(),
  updated_at: zDate.nullish(),
});
