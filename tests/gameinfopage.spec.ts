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

//data-anchor="prices"
//data-highcharts-chart - will get the data charts
//[class^="selected "] -> will get the currently selected chart
//[data-log-shop] -> will get the data itmes from Log table
////a[contains(text(), "Log In")]
});

test('Switching to the Histoty Tab and confirming exisitence of data tables', async ({page}) => {
    const gamePage = new GameInfoPage(page);
    gamePage.switchGameInfoToHistory();
    await expect( gamePage.getHistoryTabPriceOverview ).toContainClass('selected');
    gamePage.selectGameHistoryPriceChart('Price Detail');
    await expect( gamePage.getHistoryTabPriceDetail ).toContainClass('selected');
    gamePage.selectGameHistoryPriceChart('Cut Overview');
    await expect( gamePage.getHistoryTabCutOverview ).toContainClass('selected');
});
