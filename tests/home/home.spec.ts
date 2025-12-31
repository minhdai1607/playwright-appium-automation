import { carv, expect } from '../../fixtures/mobile.fixture';
import { logger } from '../../utils/logger';

carv.describe('TC-001 Verify the user navigate to explore screen successfully', () => {
  carv('Navigate to Explore screen', async ({ homePage, explorePage }) => {
    logger.testStart('Navigate to Explore screen');
    await homePage.goToExplore();
    await expect(await explorePage.isTitleDisplayed()).toBe(true);
    logger.testEnd('Navigate to Explore screen successfully', true);
  });
});

carv.describe('TC-002 Verify the user navigate to events screen successfully', () => {
  carv('Navigate to Events screen', async ({ homePage, eventPage }) => {
    logger.testStart('Navigate to Events screen');
    await homePage.goToEvents();
    await expect(await eventPage.isTitleDisplayed()).toBe(true);
    logger.testEnd('Navigate to Events screen successfully', true);
  });
});
