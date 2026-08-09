/**
 * Represents isthereanydeal.com game information Page. 
 * url: https://isthereanydeal.com/game/{name_of_Game}/info/
 */
class GameInfoPage {

    /**
     * Constructor used to initiate Game info page locators
     * @param {*} page 
     */
    constructor(page){
        this.page = page;
        this.getGameName = page.getByRole('heading', {level:1});
        this.getPricesGameContentTab = page.getByRole('link', {name:'Prices'});
        this.getTotalPricedGameStoreFronts = page.locator('[class^="cell cell--shop"]');
        this.getHistoryGameContentTab = page.getByRole('link', {name:'History'});
        this.getStatsGameContentTab = page.getByRole('link', {name:'Stats'});
        this.getRegionsGameContentTab = page.getByRole('link', {name:'Regions'});
        this.getTotalGamePageDataCharts = page.locator('[data-highcharts-chart]');
        this.getAllGamePageLogTableItems = page.locator('[data-log-shop]');
        this.getHistoryTabPriceOverview = page.getByRole('button').filter({has: page.locator('span'), hasText: 'Price Overview'}); 
        this.getHistoryTabPriceDetail = page.getByRole('button').filter({has: page.locator('span'), hasText: 'Price Detail'});
        this.getHistoryTabCutOverview = page.getByRole('button').filter({has: page.locator('span'), hasText: 'Cut Overview'});
        this.getStatsTabPlayersHeadLine = page.getByRole('heading', {level:2}).filter({hasText: 'Players on Steam'});
        this.getStatsTabCollectionHeadLine = page.getByRole('heading', {level:2}).filter({hasText: 'Waitlist and Collection Trends'});
        this.getStatsTabPriceLimitHeadLine = page.getByRole('heading', {level:2}).filter({hasText: 'Waitlist Price Limit Distribution'});
        this.getStatsTabCutLimitHeadLine = page.getByRole('heading', {level:2}).filter({hasText: 'Waitlist Cut Limit Distribution'});
        this.getTotalRegionDisplayed = page.getByRole('heading', {level:2}).filter({hasNot:page.locator('div[class^="band__content"] h2')});
    }

    /**
     * Used to switch to the game Price tab by clicking the tab button
     */
    async switchGameInfoToPrices(){
        await this.getPricesGameContentTab.click();
    }

    /**
     * Use to return the amount of stores the video game is being sold in. The locator is from Price Tab
     * @returns the total amount of store fronts the game is currently sold in
     */
    async getTotalStoreGameIsSold(){
        let totalOfStores = await this.getTotalPricedGameStoreFronts.count();
        return totalOfStores;
    }

    /**
     * Use to switch to the game History tab by clicking the tab button
     */
    async switchGameInfoToHistory(){
        await this.getHistoryGameContentTab.click();
    }

    /**
     * Use to swtich between the different Pricing charts fround on the History
     * tab
     * @param {*} priceChartData - name of the price chart
     */
    async selectGameHistoryPriceChart(priceChartData){
        switch (priceChartData){
            case 'Price Overview':
                await this.getHistoryTabPriceOverview.click();
                break;

            case 'Price Detail':
                await this.getHistoryTabPriceDetail.click();
                break;

            case 'Cut Overview':
                await this.getHistoryTabCutOverview.click();
                break;
                
            default:
                await console.log(`${priceChartData} does not exisit`);
        }
    }

    /**
     * Use to swtich to game Stats Tab by clicking the tab button
     */
    async switchGameInfoToStats(){
        await this.getStatsGameContentTab.click(); 
    }

    /**
     * Use to return the amount of charts/graphs found on a page
     * @returns - the amount of elements found that matches the locator
     */
    async getTotalMainCharts(){
        let allChartsOnPgMainSection = await this.getTotalGamePageDataCharts.count();
        return allChartsOnPgMainSection;
    }

    /**
     * Use to switch to the game Regions Tab by clicking the tab button
     */
    async switchGameInfoToRegions(){
        await this.getRegionsGameContentTab.click();
    }

    /**
     * Use to collect the total amount of regions listed on the Regions tab on the 
     * @returns 
     */
    async getTotalRegionGameIsSold(){
        let totalOfRegion = await this.getTotalRegionDisplayed.count();
        return totalOfRegion;
    }

}
module.exports = { GameInfoPage };