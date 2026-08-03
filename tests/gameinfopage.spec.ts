import { test, expect, chromium } from '@playwright/test';
import { Homepage } from '../Pages/Homepage';
import { GameInfoPage } from '../Pages/GameInfoPage';

test.beforeEach(async ({page}) => {
    console.log(`Running ${test.info().title}`);
    const homePage = new Homepage( page );
    await homePage.goto();
    homePage.navigateToTopGame();
    await expect(page.getByText('Prices')).toHaveText('Prices');
    //await page.screenshot({ path: `screenshot/TopGamePage.png` });
});

test('Displaying a Games Price chart information', async ({page}) => {
    const gamePage = new GameInfoPage(page);
    gamePage.switchGameInfoToPrices();
    // await expect(page.getByText(' Prices', {exact: true})).toBeVisible();
    await expect(page.locator('[data-anchor="prices"]')).toBeVisible();
    await page.screenshot({ path: `screenshot/generalGameInfoPage.png` });
});

test('Switching to the Histoty Tab and confirming exisitence of various tables by switching to them', async ({page}) => {
    const gamePage = new GameInfoPage(page);
    gamePage.switchGameInfoToHistory();
    await expect( gamePage.getHistoryTabPriceOverview ).toContainClass('selected');
    gamePage.selectGameHistoryPriceChart('Price Detail');
    await expect( gamePage.getHistoryTabPriceDetail ).toContainClass('selected');
    gamePage.selectGameHistoryPriceChart('Cut Overview');
    await expect( gamePage.getHistoryTabCutOverview ).toContainClass('selected');
    await page.screenshot({ path: `screenshot/GameInfoHistoryPage.png` });
});

test('Switching to the Stats Tab and confirming expected headers and data charts', async ({page}) => {
    const gamePage = new GameInfoPage(page);
    gamePage.switchGameInfoToStats();
    await expect( gamePage.getStatsTabPlayersHeadLine).toBeVisible();
    await expect( gamePage.getStatsTabCollectionHeadLine).toBeVisible();
    await expect( gamePage.getStatsTabPriceLimitHeadLine).toBeVisible();
    await expect( gamePage.getStatsTabCutLimitHeadLine).toBeVisible();
    await expect( gamePage.getTotalMainCharts()).toBeGreaterThan(1);
    await page.screenshot({ path: `screenshot/GameInfoStatsPage.png` });
});

test('Switching to the Regions Tab and confirming at least the minimal of regions matches the total of stoes the game is sold', async ({page}) => {
    const gamePage = new GameInfoPage(page);
    const storeTotal = await gamePage.getTotalStoreGameIsSold();
    gamePage.switchGameInfoToRegions();
    await expect( page.getByRole('heading', {level:2}).filter({hasText: 'Steam'}) ).toBeVisible();
    await expect( await gamePage.getTotalRegionGameIsSold()).toBeGreaterThanOrEqual(storeTotal);
    await page.screenshot({ path: `screenshot/GameInfoRegionsPage.png` });
});
