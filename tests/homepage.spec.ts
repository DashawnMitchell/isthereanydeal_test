import { test, expect, chromium } from '@playwright/test';
import { Homepage } from '../Pages/Homepage';

test.beforeEach(async ({page}) => {
    console.log(`Running ${test.info().title}`);
    const homePage = new Homepage( page );
    await homePage.goto();
});

test('navigating to IsThereADeal homepage', async ({ page }) => {
    // const browser = await chromium.launch();
    // await browser.close();
    const homePage = new Homepage( page );
    await homePage.navigateToTheDealHomePage();
    await expect(page.getByRole('link', { name: 'New in Subscriptions' })).toContainText('New in Subscriptions');

    await page.screenshot({ path: `screenshot/IsThereADealHomePg.png` });
});

test('navigating to the Games Deal page', async ({page}) => {
    const homePage = new Homepage( page );

    homePage.navigateToGamesDealsPage();
    await page.screenshot({ path: `screenshot/GamesDealsPage.png` });
    await expect(page).toHaveURL('https://isthereanydeal.com/deals/');
});

test('navigating to the Top Rank Game Deal page', async ({page}) => {
    const homePage = new Homepage( page );

    homePage.navigateToTopGame();
    await expect(page.getByText('Prices')).toHaveText('Prices');
    await page.screenshot({ path: `screenshot/TopGamePage.png` });

});

test('navigating to a Random Rank Game Deal page', async ({page}) => {
    const homePage = new Homepage( page );

    homePage.navigateToRandomGame();
    await expect(page.getByText('Prices')).toHaveText('Prices');
    await page.screenshot({ path: `screenshot/RandomGamePage.png` });

});

test('searching for a game deal through search bar', async ({page}) =>{
    const homePage = new Homepage( page );

    await homePage.openSeachBar('Star Ocean');
    await expect(page.locator('section[class^="games svelte-"]')); //getByRole('heading', {name:'Bundles', exact: true }));
    await page.screenshot({ path: `screenshot/SearchedGame.png` });
    await homePage.closeSeachBar();




});

/*
Figure out how playwright can get you information like below on locators 

        1) <h2 class="svelte-1q50er9">…</h2> aka getByRole('link', { name: 'New in Subscriptions' })
        2) <h2 class="svelte-1q50er9">…</h2> aka getByRole('link', { name: 'Latest Bundles' })
        3) <h2 class="svelte-1q50er9">…</h2> aka getByRole('link', { name: 'Giveaways' })
        4) <h2 class="svelte-1q50er9">…</h2> aka getByRole('link', { name: 'Misc. Deals' })
        5) <h2 class="svelte-1rlx3l9">Most Waitlisted in last 30 days</h2> aka getByRole('heading', { name: 'Most Waitlisted in last 30' })
        6) <h2 class="svelte-1rlx3l9">Most Collected in last 30 days</h2> aka getByRole('heading', { name: 'Most Collected in last 30 days' })
        7) <h2>Explore</h2> aka getByRole('link', { name: 'Explore Browse all the latest' })
        8) <h2>Wait</h2> aka getByRole('link', { name: 'Wait Get notified right away' })
        9) <h2>Collect</h2> aka getByRole('link', { name: 'Collect Track your entire' })



*/