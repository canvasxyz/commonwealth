/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';

export const UpdateCommentResponseThreadCollaboratorsItemUserProfileTagsItem =
  core.serialization.object({
    userId: core.serialization.property('user_id', core.serialization.number()),
    tagId: core.serialization.property('tag_id', core.serialization.number()),
    createdAt: core.serialization.property(
      'created_at',
      core.serialization.date().optional(),
    ),
    updatedAt: core.serialization.property(
      'updated_at',
      core.serialization.date().optional(),
    ),
  });
