import BasePage from './basePage';
import { environments } from '../../environments';

type ProductToAdd = {
    index: number;
    quantity: number;
};

class ProductPage extends BasePage {
    constructor() {
        super(environments.qa.productPageUrl);
    }

    readonly sortOptions = {
        nameAscending: 'name-az',
        nameDescending: 'name-za',
        priceAscending: 'price-low',
        priceDescending: 'price-high'
    };

    get productPage() {
        return $('[data-test="inventory-page"]');
    }

    get cartButton() {
        return $('[data-test="nav-cart"]');
    }

    get cartBadge() {
        return $('[data-test="cart-badge"]');
    }

    get loggedInUser() {
        return $('[data-test="logged-in-user"]');
    }

    get categoryDropdown() {
        return $('[data-test="filter-category"]');
    }

    get categoryOptions() {
        return $$('[data-test="filter-category"] option');
    }

    get sortDropdown() {
        return $('[data-test="sort-select"]');
    }

    get productCountText() {
        return $('[data-test="inventory-title"] + p');
    }

    get productCards() {
        return $$('[data-test="inventory-item"]');
    }

    get productNames() {
        return $$('[data-test="inventory-item-name"]');
    }

    get productPrices() {
        return $$('[data-test="inventory-item-price"]');
    }

    get increaseQuantityButtons() {
        return $$('button[data-test^="qty-increase-"]');
    }

    get addToCartButtons() {
        return $$('button[data-test^="add-to-cart-"]');
    }

    async getBadgeCartCount() {
        const badgeText = await this.cartBadge.getText();
        const count = Number(badgeText.trim());

        return count;
    }

    async getTextProductCount() {
        const countText = await this.productCountText.getText();
        // product count is returned as 'x items available' so we split to extract number only
        const count = Number(countText.trim().split(' ')[0]);

        return count;
    }

    async getCardProductCount() {
        return await this.productCards.length;
    }

    async getAvailableCategories() {
        // lets dynamically grab all dropdown options for category

        const options = await this.categoryOptions;
        const categoryValues: string[] = [];

        for (const option of options) {
            const value = await option.getAttribute('value');

            categoryValues.push(value);
        }

        return categoryValues;
    }


    async filterByCategory(categoryValue: string) {
        await this.categoryDropdown.selectByAttribute('value', categoryValue);
    }

    async getProductNames() {
        const names = await this.productNames;
        const productNames: string[] = [];

        for (const name of names) {
            productNames.push(await name.getText());
        }

        return productNames;
    }

    async getProductPrices() {
        const prices = await this.productPrices;
        const productPrices: number[] = [];

        for (const price of prices) {
            const priceText = await price.getText();
            const priceNumber = Number(priceText.replace('$', '').trim());

            productPrices.push(priceNumber);
        }

        return productPrices;
    }

    async sortBy(sortValue: string) {
        await this.sortDropdown.selectByAttribute('value', sortValue);
    }

    async addProductToCartByIndex(index: number, quantity: number) {
        const productCards = await this.productCards;

        if (!productCards[index]) {
            throw new Error(`Product card at index: ${index} was not found.`);
        }

        for (let i = 1; i < quantity; i++) {
            const increaseQuantityButtons = await this.increaseQuantityButtons;

            await increaseQuantityButtons[index].waitForDisplayed();
            await increaseQuantityButtons[index].click();
        }

        const addToCartButtons = await this.addToCartButtons;

        await addToCartButtons[index].waitForDisplayed();
        await addToCartButtons[index].click();
    }

    async addMultipleProductsToCart(productsToAdd: ProductToAdd[]) {
        for (const product of productsToAdd) {
            await this.addProductToCartByIndex(product.index, product.quantity);
        }
    }
}

export default new ProductPage();