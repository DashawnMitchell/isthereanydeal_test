class GameInfoPage {

    constructor(page){
        this.page = page;
        this.getGameName = this.page.getByRole('heading', {level:1});
        this.getPricesGameContentTab = this.page.getByRole('link', {name:'Prices'});
        this.getTotalPricedGameStoreFronts = this.page.locator('[class^="cell cell--shop"]');
        this.getHistoryGameContentTab = this.page.getByRole('link', {name:'History'});
        this.getStatsGameContentTab = this.page.getByRole('link', {name:'Stats'});
        this.getRegionsGameContentTab = this.page.getByRole('link', {name:'Regions'});
        this.getTotalGamePageDataCharts = this.page.locator('[data-highcharts-chart]');
        this.getAllGamePageLogTableItems = this.page.locator('[data-log-shop]');
        this.getHistoryTabPriceOverview = this.page.getByRole('button').filter({has: page.locator('span'), hasText: 'Price Overview'}); 
        this.getHistoryTabPriceDetail = this.page.getByRole('button').filter({has: page.locator('span'), hasText: 'Price Detail'});
        this.getHistoryTabCutOverview = this.page.getByRole('button').filter({has: page.locator('span'), hasText: 'Cut Overview'});
        this.getStatsTabPlayersHeadLine = this.page.getByRole('heading', {level:2}).filter({hasText: 'Players on Steam'});
        this.getStatsTabCollectionHeadLine = this.page.getByRole('heading', {level:2}).filter({hasText: 'Waitlist and Collection Trends'});
        this.getStatsTabPriceLimitHeadLine = this.page.getByRole('heading', {level:2}).filter({hasText: 'Waitlist Price Limit Distribution'});
        this.getStatsTabCutLimitHeadLine = this.page.getByRole('heading', {level:2}).filter({hasText: 'Waitlist Cut Limit Distribution'});
        this.getTotalRegionDisplayed = this.page.locator('[class^="cell cell--shop"]');
    }

    async switchGameInfoToPrices(){
        await this.getPricesGameContentTab.click();
    }

    async getTotalStoreGameIsSold(){
        let totalOfStores = await this.getTotalPricedGameStoreFronts.count();
        return totalOfStores;
    }

    async switchGameInfoToHistory(){
        await this.getHistoryGameContentTab.click();
    }

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

    async switchGameInfoToStats(){
        await this.getStatsGameContentTab.click(); 
    }

    async getTotalMainCharts(){
        let allChartsOnPgMainSection = await this.getTotalGamePageDataCharts.count();
        return allChartsOnPgMainSection;
    }

    async switchGameInfoToRegions(){
        await this.getRegionsGameContentTab.click();
    }

    async getTotalRegionGameIsSold(){
        let totalOfRegion = await this.getTotalRegionDisplayed.count();
        return totalOfRegion;
    }

}
module.exports = { GameInfoPage };