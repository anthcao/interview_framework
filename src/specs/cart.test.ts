import ProductPage from '../pages/productPage';
import LoginPage from '../pages/loginPage';
import CartPage from '../pages/cartPage';
import { getUser } from '../data/users';
import { expect } from '@wdio/globals';

const standardUser = getUser('swift_tester');

describe('Cart Page Tests', () => {
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

    it('Verify initial empty cart state', async () => {
        await ProductPage.cartButton.click();

        await expect(CartPage.cartPage).toBeDisplayed();

        await expect(CartPage.emptyCartTitle).toBeDisplayed();
        await expect(CartPage.emptyCartTitle).toHaveText('Your cart is empty');

        await expect(CartPage.emptyCartMessage).toBeDisplayed();
        await expect(CartPage.emptyCartMessage).toHaveText(
            'Head back to the store and add some items.'
        );
    });

    it('Verify continue shopping returns to products page', async () => {
        await ProductPage.cartButton.click();

        await expect(CartPage.continueShoppingButton).toBeDisplayed();
        await expect(CartPage.continueShoppingButton).toHaveText('Continue Shopping');

        await CartPage.continueShoppingButton.click();

        const productUrl = await browser.getUrl();
        expect(productUrl).toContain(ProductPage.url);

        await expect(ProductPage.productPage).toBeDisplayed();
    });

    it('Verify multiple items can be added to cart', async () => {
        // I originally used product names, but the selectors got ugly quick so index instead
        const productsToAdd = [
            { index: 0, quantity: 3 }, // Automation Handbook
            { index: 2, quantity: 1 }, // Debug Socks
            { index: 3, quantity: 2 }, // Lab Notebook
        ];

        let expectedItemCount = 0;

        productsToAdd.forEach((product) => {
            expectedItemCount += product.quantity;
        });

        await ProductPage.addMultipleProductsToCart(productsToAdd);

        // check cart icon badge number updates
        const cartBadgeCount = await ProductPage.getBadgeCartCount();
        expect(cartBadgeCount).toBe(expectedItemCount);

        await ProductPage.cartButton.click();

        const cartUrl = await browser.getUrl();
        expect(cartUrl).toContain(CartPage.url);

        await expect(CartPage.cartPage).toBeDisplayed();
        
        // check cart page quantities
        const titleItemCount = await CartPage.getTitleItemCount();
        const pageItemCount = await CartPage.getPageItemCount();

        expect(titleItemCount).toBe(expectedItemCount);
        expect(pageItemCount).toBe(expectedItemCount);
    });

    it('Verify cart items quantity can be increased and decreased', async () => {
        const productsToAdd = [
            { index: 5, quantity: 3 }, // Sauce Labs Backpack
            { index: 2, quantity: 1 }, // Debug Socks
            { index: 4, quantity: 2 }, // QA Sticker Pack
        ];

        let expectedItemCount = 0;

        productsToAdd.forEach((product) => {
            expectedItemCount += product.quantity;
        });

        await ProductPage.addMultipleProductsToCart(productsToAdd);
        await ProductPage.cartButton.click();
        await expect(CartPage.cartPage).toBeDisplayed();

        let cartItemNames = await CartPage.getCartItemNames();
        expect(cartItemNames).toContain('Sauce Labs Backpack');
        expect(cartItemNames).toContain('Debug Socks');
        expect(cartItemNames).toContain('QA Sticker Pack');

        expect(await CartPage.getTitleItemCount()).toBe(expectedItemCount);
        expect(await CartPage.getPageItemCount()).toBe(expectedItemCount);

        await CartPage.changeItemQuantity(0, 1);
        await CartPage.changeItemQuantity(1, 1);
        await CartPage.changeItemQuantity(2, 2);
        expectedItemCount += 4;

        cartItemNames = await CartPage.getCartItemNames();
        expect(cartItemNames).toContain('Sauce Labs Backpack');
        expect(cartItemNames).toContain('Debug Socks');
        expect(cartItemNames).toContain('QA Sticker Pack');

        expect(await CartPage.getTitleItemCount()).toBe(expectedItemCount);
        expect(await CartPage.getPageItemCount()).toBe(expectedItemCount);

        await CartPage.changeItemQuantity(0, -1);
        await CartPage.changeItemQuantity(1, -2); // Debug Socks should be removed from cart entirely
        expectedItemCount -= 3;

        cartItemNames = await CartPage.getCartItemNames();
        expect(cartItemNames).toContain('Sauce Labs Backpack');
        expect(cartItemNames).not.toContain('Debug Socks');
        expect(cartItemNames).toContain('QA Sticker Pack');

        expect(await CartPage.getTitleItemCount()).toBe(expectedItemCount);
        expect(await CartPage.getPageItemCount()).toBe(expectedItemCount);
    });

    it('Verify per item total prices updates when quantity changes', async () => {
        const productsToAdd = [
            { index: 0, quantity: 2 }, // Automation Handbook
            { index: 2, quantity: 1 }, // Debug Socks
            { index: 4, quantity: 3 }, // QA Sticker Pack
        ];

        await ProductPage.addMultipleProductsToCart(productsToAdd);
        await ProductPage.cartButton.click();

        await expect(CartPage.cartPage).toBeDisplayed();

        let expectedItemTotals = await CartPage.calculateExpectedItemTotals();
        let actualItemTotals = await CartPage.getCartItemTotals();

        expect(actualItemTotals).toEqual(expectedItemTotals);

        await CartPage.changeItemQuantity(0, 1);
        await CartPage.changeItemQuantity(1, 2);
        await CartPage.changeItemQuantity(2, -1);

        expectedItemTotals = await CartPage.calculateExpectedItemTotals();
        actualItemTotals = await CartPage.getCartItemTotals();

        expect(actualItemTotals).toEqual(expectedItemTotals);
    });

    it('Verify cart subtotal, tax, and total pricing calculation', async () => {
        const productsToAdd = [
            { index: 0, quantity: 2 }, // Automation Handbook
            { index: 2, quantity: 3 }, // Debug Socks
            { index: 4, quantity: 1 }, // QA Sticker Pack
        ];
        // this set of items was picked to test dollar rounding logic

        await ProductPage.addMultipleProductsToCart(productsToAdd);
        await ProductPage.cartButton.click();

        await expect(CartPage.cartPage).toBeDisplayed();

        const expectedSubtotal = await CartPage.calculateExpectedSubtotal();
        const expectedTax = await CartPage.calculateExpectedTax();
        const expectedTotal = expectedSubtotal + expectedTax;

        const actualSubtotal = CartPage.convertCurrencyTextToNumber(await CartPage.subtotalAmount.getText());
        const actualTax = CartPage.convertCurrencyTextToNumber(await CartPage.taxAmount.getText());
        const actualTotal = CartPage.convertCurrencyTextToNumber(await CartPage.totalAmount.getText());

        expect(actualSubtotal).toBe(expectedSubtotal);
        expect(actualTax).toBe(expectedTax);
        expect(actualTotal).toBe(expectedTotal);
    });
});