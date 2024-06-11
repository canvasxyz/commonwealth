import { dispose } from '@hicommonwealth/core';
import { tester, type DB } from '@hicommonwealth/model';
import { assert } from 'chai';
import { ServerCommunitiesController } from '../../../server/controllers/server_communities_controller';

describe('GetRelatedCommunities Tests', async () => {
  let models: DB;

  before(async () => {
    models = await tester.seedDb();
  });

  after(async () => {
    await dispose()();
  });

  it('Correctly returns nothing if base does not match chainNode', async () => {
    // @ts-expect-error StrictNullChecks
    const controller = new ServerCommunitiesController(models, null);
    const response = await controller.getRelatedCommunities({
      chainNodeId: -100,
    });

    assert.equal(response.length, 0);
  });

  it('Correctly returns results if base matches some chainNode.name', async () => {
    // @ts-expect-error StrictNullChecks
    const controller = new ServerCommunitiesController(models, null);
    const response = await controller.getRelatedCommunities({ chainNodeId: 2 });

    assert.equal(response.length, 3);

    const ethereumCommunity = response.find((r) => r.community === 'Ethereum');
    // @ts-expect-error StrictNullChecks
    assert.equal(ethereumCommunity.address_count, 2);
    // @ts-expect-error StrictNullChecks
    assert.equal(ethereumCommunity.thread_count, 0);
    // @ts-expect-error StrictNullChecks
    assert.equal(ethereumCommunity.icon_url, '/static/img/protocols/eth.png');
    // @ts-expect-error StrictNullChecks
    assert.equal(ethereumCommunity.description, null);

    const sushiCommunity = response.find((r) => r.community === 'Sushi');
    // @ts-expect-error StrictNullChecks
    assert.equal(sushiCommunity.address_count, 0);
    // @ts-expect-error StrictNullChecks
    assert.equal(sushiCommunity.thread_count, 0);
    // @ts-expect-error StrictNullChecks
    assert.equal(sushiCommunity.icon_url, '/static/img/protocols/eth.png');
    // @ts-expect-error StrictNullChecks
    assert.equal(sushiCommunity.description, 'sushi community description');

    const yearnFinanceCommunity = response.find(
      (r) => r.community === 'yearn.finance',
    );
    // @ts-expect-error StrictNullChecks
    assert.equal(yearnFinanceCommunity.address_count, 0);
    // @ts-expect-error StrictNullChecks
    assert.equal(yearnFinanceCommunity.thread_count, 0);
    assert.equal(
      // @ts-expect-error StrictNullChecks
      yearnFinanceCommunity.icon_url,
      '/static/img/protocols/eth.png',
    );
    // @ts-expect-error StrictNullChecks
    assert.equal(yearnFinanceCommunity.description, null);
  });
});
