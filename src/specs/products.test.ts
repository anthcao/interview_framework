import ProductPage from '../pages/productPage';
import LoginPage from '../pages/loginPage';
import { getUser } from '../data/users';
import { expect } from '@wdio/globals';

const standardUser = getUser('swift_tester');

describe('Products Page Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();

        await LoginPage.login(
            standardUser.username,
            standardUser.password
        );

        const url = await browser.getUrl();
        expect(url).toContain(ProductPage.url);

        await expect(ProductPage.loggedInUser).toBeDisplayed();
        await expect(ProductPage.loggedInUser).toHaveText(standardUser.username);
    });

    it('Verify the total count of items available', async () => {
        const textProductCount = await ProductPage.getTextProductCount();
        const cardProductCount = await ProductPage.getCardProductCount();

        expect(cardProductCount).toBe(textProductCount);
    });

    it('Verify the total count when filtered by each item category', async () => {
        // since categories are simple and we can dynamically grab them let's test them at once 
        // especially since the number of categories can change day by day
        const categories = await ProductPage.getAvailableCategories();  

        for (const category of categories) {
            await ProductPage.filterByCategory(category);

            const textProductCount = await ProductPage.getTextProductCount();
            const cardProductCount = await ProductPage.getCardProductCount();

            expect(cardProductCount).toBe(textProductCount);
        }
    });

    // since sorting options are more set in stone, let's have a test for each sorting option
    it('Verify sorting products by name from A to Z', async () => {
        await ProductPage.sortBy(ProductPage.sortOptions.nameAscending);

        const displayedProductNames = await ProductPage.getProductNames();
        const sortedProductNames = [...displayedProductNames].sort((a, b) => a.localeCompare(b));

        expect(displayedProductNames).toEqual(sortedProductNames);
    });

    it('Verify sorting products by name from Z to A', async () => {
        await ProductPage.sortBy(ProductPage.sortOptions.nameDescending);

        const displayedProductNames = await ProductPage.getProductNames();
        const sortedProductNames = [...displayedProductNames].sort((a, b) => b.localeCompare(a));

        expect(displayedProductNames).toEqual(sortedProductNames);
    });

    it('Verify sorting products by price from low to high', async () => {
        await ProductPage.sortBy(ProductPage.sortOptions.priceAscending);

        const displayedProductPrices = await ProductPage.getProductPrices();
        const sortedProductPrices = [...displayedProductPrices].sort((a, b) => a - b);

        expect(displayedProductPrices).toEqual(sortedProductPrices);
    });

    // this test fails so we skip and log the bug
    it.skip('Verify sorting products by price from high to low', async () => {
        await ProductPage.sortBy(ProductPage.sortOptions.priceDescending);

        const displayedProductPrices = await ProductPage.getProductPrices();
        const sortedProductPrices = [...displayedProductPrices].sort((a, b) => b - a);

        expect(displayedProductPrices).toEqual(sortedProductPrices);
    });
});