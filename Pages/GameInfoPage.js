class GameInfoPage {

    constructor(page){
        this.page = page;
        this.getGameName = this.page.getByRole('heading', {level:1});
        this.getPricesGameContentTab = this.page.getByRole('link', {name:'Prices'});
        this.getHistoryGameContentTab = this.page.getByRole('link', {name:'History'});
        this.getStatsGameContentTab = this.page.getByRole('link', {name:'Stats'});
        this.getRegionsGameContentTab = this.page.getByRole('link', {name:'Regions'});
        this.getAllGamePageDataCharts = this.page.locator('[data-highcharts-chart]');
        this.getAllGamePageLogTableItems = this.page.locator('[data-log-shop]');
        this.getHistoryTabPriceOverview = this.page.getByRole('button').filter({has: page.locator('span'), hasText: 'Price Overview'}); 
        this.getHistoryTabPriceDetail = this.page.getByRole('button').filter({has: page.locator('span'), hasText: 'Price Detail'});
        this.getHistoryTabCutOverview = this.page.getByRole('button').filter({has: page.locator('span'), hasText: 'Cut Overview'});
    }

    async switchGameInfoToPrices(){
        await this.getPricesGameContentTab.click();
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
        
    }

    async switchGameInfoToRegions(){
        
    }

}
module.exports = { GameInfoPage };