import { expect as pwexpect, test } from '@playwright/test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Page } from 'playwright-core/index';
import { testThreads } from '../hooks/e2eDbEntityHooks';
import { login } from '../utils/e2eUtils';

chai.use(chaiHttp);
const { expect } = chai;

export const discussionTests = (test) => {
  return () => {
    test('Discussion page loads and can navigate to first thread', async ({
      page,
    }: {
      page: Page;
    }) => {
      test.setTimeout(120_000);
      await page.locator('div.HeaderWithFilters').waitFor();

      // Assert Threads are loaded into page
      await page.waitForSelector('div[data-test-id]');

      // Perform the assertion
      await pwexpect(async () => {
        const numberOfThreads = await page.$$eval(
          'div[data-test-id] > div',
          (divs) => divs.length
        );
        expect(numberOfThreads).to.be.gte(testThreads.length - 1);
      }).toPass();

      const firstThread = await page.$(
        'div[data-test-id="virtuoso-item-list"] > div:first-child'
      );

      // navigate to first link
      await firstThread.click();

      expect(page.url())
        .to.include('discussion')
        .and.not.include('discussions');
    });

    test('Check navigation to first profile', async ({
      page,
    }: {
      page: Page;
    }) => {
      let userProfileLinks = await page.locator('a.user-display-name.username');

      do {
        userProfileLinks = await page.locator('a.user-display-name.username');
      } while (!(await userProfileLinks.first().getAttribute('href')));

      // navigate to first link
      await userProfileLinks.first().click();

      expect(page.url()).to.include('/profile/id/');
    });

    test('Check User can Like/Dislike post', async ({
      page,
    }: {
      page: Page;
    }) => {
      await login(page);

      let reactionsCountDivs = await page.locator('.Upvote');

      await pwexpect(async () => {
        reactionsCountDivs = await page.locator('.Upvote');
        await pwexpect(reactionsCountDivs.first()).toBeVisible();
      }).toPass();

      const firstThreadReactionCount = await reactionsCountDivs
        .first()
        .innerText();

      // click button
      await page
        .getByRole('button', { name: firstThreadReactionCount, exact: true })
        .first()
        .click();

      const expectedNewReactionCount = (
        parseInt(firstThreadReactionCount) + 1
      ).toString();
      // assert reaction count increased
      await pwexpect(async () => {
        reactionsCountDivs = await page.locator('.Text.caption.regular');
        pwexpect(await reactionsCountDivs.first().innerText()).toEqual(
          expectedNewReactionCount
        );
      }).toPass({ intervals: [10_000], timeout: 60_000 });

      // click button
      await page
        .getByRole('button', { name: expectedNewReactionCount, exact: true })
        .first()
        .click();

      // assert reaction count decreased
      await pwexpect(async () => {
        reactionsCountDivs = await page.locator('.Text.caption.regular');
        pwexpect(await reactionsCountDivs.first().innerText()).toEqual(
          firstThreadReactionCount
        );
      }).toPass({ intervals: [10_000], timeout: 60_000 });
    });
  };
};
