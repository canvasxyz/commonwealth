import chai from 'chai';
import models from 'server/database';
import { Op } from "sequelize";
import { del, post } from "./appHook.spec";
import { testAddresses, testChains, testReactions } from "./dbEntityHooks.spec";

describe('deleteReactions Tests', () => {
  it('add entities to db', async () => {
    const smallestId = testReactions[testReactions.length - 1].id;

    chai.assert.equal(await models.Reaction.count({ where: { id: { [Op.in]: [smallestId - 1, smallestId - 2] } } }), 0);

    let resp = await post('/api/reactions', {
      reactions: [
        { id: smallestId - 1, address_id: testAddresses[0].id, community_id: testChains[0].id, reaction: 'like' },
        { id: smallestId - 2, address_id: testAddresses[0].id, community_id: testChains[0].id, reaction: 'like' }
      ]
    });

    chai.assert.equal(resp.result.error, '');
    chai.assert.equal(await models.Reaction.count({ where: { id: { [Op.in]: [smallestId - 1, smallestId - 2] } } }), 2);

    resp = await del('/api/reactions', { ids: [smallestId - 1, smallestId - 2] });

    chai.assert.equal(resp.result.error, '');
    chai.assert.equal(await models.Comment.count({where: {id: {[Op.in]: [smallestId - 1, smallestId - 2]}}}), 0);
  });

  it('fail on input error', async () => {
    const resp = await del('/api/reactions', {
      reactions: [{ bad: 3 }]
    }, true);

    chai.assert.equal(resp.status, 'Failure');
  });
});