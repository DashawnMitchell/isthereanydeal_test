/**
 * Represents isthereanydeal.com Landing/Home Page. 
 * url: https://isthereanydeal.com/
 */
class Homepage {

    /**
     * Constructor used to initiate the locators for isthereanydeal.com landing/home page
     * @param {*} page 
     */
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

    /**
     * Use to go to the is there any deal website
     */
    async goto() {
        await this.page.goto('https://isthereanydeal.com/');
    }

    /**
     * Navigates to the landing/homepage of is there any deal website
     */
    async navigateToTheDealHomePage() {
        await this.getIsThereAnyDealLink.first().click();
    }

    /**
     * Navigates to the Games Deal Page
     */
    async navigateToGamesDealsPage() {
        await this.getTopNavGamesBttn.click();
        await this.getGamesDealsLink.click();
    }

    /**
     * Navigates to the current Top selling game info page from the home page
     */
    async navigateToTopGame() {
        await this.getAllGamesLinksWithImgs.first().click();
    }

    /**
     * Naviages to the a random game currently on sale displayed on the landing/homepage
     */
    async navigateToRandomGame() {
        const totalOfGamesCapture = await this.getAllGamesLinksWithImgs.count();
        let randomNum = Math.floor(Math.random() * totalOfGamesCapture);

        await this.getAllGamesLinksWithImgs.nth(randomNum).click();
    }

    /**
     * Submits text into the search bar
     * @param {*} searchItem 
     */
    async openSeachBar(searchItem) {
        await this.getSearchButton.click();
        await this.getSearchBar.fill(searchItem); 
    }

    /**
     * Closes the search bar popup
     */
    async closeSeachBar() {
        await this.getSearchBarCloseBtt.click();
    }

}
module.exports = { Homepage };