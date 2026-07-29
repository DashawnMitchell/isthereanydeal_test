class Homepage {

    constructor(page) {
        this.page = page;
        this.getAllLinks = page.getByRole('link');
        this.getIsThereAnyDealLink = page.getByAltText('IsThereAnyDeal Logo');
        this.getNewInSubscriptions = page.getByText('New in Subscriptions');
        this.getTopNavGamesBttn = page.getByRole('button', {name:'Games'});
        this.getGamesDealsLink = page.getByRole('link', {name:'Deals', exact: true });
        this.getAllGamesLinksWithImgs = this.getAllLinks.filter({has: this.page.getByRole('img')}).filter({hasText: /^\s*$/});
        this.getSearchButton = page.getByRole('button', {name: 'Search'});
        this.getSearchBar = page.getByPlaceholder('Search game, bundle, giveaway');
        this.getSearchBarCloseBtt = page.locator('[class^="modal-close"]');
    }

    async goto() {
        await this.page.goto('https://isthereanydeal.com/');
    }

    async navigateToTheDealHomePage() {
        await this.getIsThereAnyDealLink.first().click();
    }

    async navigateToGamesDealsPage() {
        await this.getTopNavGamesBttn.click();
        await this.getGamesDealsLink.click();
    }

    async navigateToTopGame() {
        await this.getAllGamesLinksWithImgs.first().click();
    }

    async navigateToRandomGame() {
        const totalOfGamesCapture = await this.getAllGamesLinksWithImgs.count();
        let randomNum = Math.floor(Math.random() * totalOfGamesCapture);

        await this.getAllGamesLinksWithImgs.nth(randomNum).click();
    }

    async openSeachBar(searchItem) {
        await this.getSearchButton.click();
        await this.getSearchBar.fill(searchItem); 
    }

    async closeSeachBar() {
        await this.getSearchBarCloseBtt.click();
    }

}
module.exports = { Homepage };