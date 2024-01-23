import { z } from 'zod';
import { models } from '../database';
import type { ReactionAttributes } from '../models';
import type { CommandMetadata } from '../types';

export const schema = z.object({
  content: z.string(),
});

export const CreateReaction: CommandMetadata<
  typeof schema,
  ReactionAttributes
> = {
  schema,
  fn: async () =>
    //actor,
    //id,
    //payload,
    {
      // TODO
      const reaction = await models.Reaction.findOne();
      return reaction!;
    },
};
