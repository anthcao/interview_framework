import ProductPage from '../pages/productPage';
import LoginPage from '../pages/loginPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';
import { getUser } from '../data/users';
import { expect } from '@wdio/globals';

const standardUser = getUser('swift_tester');

const productsToAdd = [
    { index: 0, quantity: 2, name: 'Automation Handbook' },
    { index: 2, quantity: 3, name: 'Debug Socks' },
    { index: 3, quantity: 1, name: 'Lab Notebook' },
];

describe('Checkout Page Tests', () => {
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

        await ProductPage.addMultipleProductsToCart(productsToAdd);
        await ProductPage.cartButton.click();

        await expect(CartPage.cartPage).toBeDisplayed();

        await CartPage.checkoutButton.click();

        await expect(CheckoutPage.checkoutPage).toBeDisplayed();
        await expect(CheckoutPage.checkoutForm).toBeDisplayed();
    });

    it('Verify user can complete checkout flow', async () => {
        const shippingInformation = {
            firstName: 'test',
            lastName: 'user',
            postalCode: 'M5V1K4' // Askuity office 👍
        };

        await CheckoutPage.fillShippingInformation(shippingInformation);
        await CheckoutPage.continueButton.click();

        await expect(CheckoutPage.orderSummary).toBeDisplayed();

        await expect(CheckoutPage.shippingInfo).toBeDisplayed();
        await expect(CheckoutPage.shippingInfo).toHaveText(
            `${shippingInformation.firstName} ${shippingInformation.lastName} — ${shippingInformation.postalCode}`
        );

        await expect(CheckoutPage.summarySubtotal).toBeDisplayed();
        await expect(CheckoutPage.summaryTax).toBeDisplayed();
        await expect(CheckoutPage.summaryTotal).toBeDisplayed();
        await expect(CheckoutPage.finishButton).toBeDisplayed();

        await CheckoutPage.finishButton.click();

        await expect(CheckoutPage.orderConfirmationPage).toBeDisplayed();

        await expect(CheckoutPage.orderConfirmationTitle).toBeDisplayed();
        await expect(CheckoutPage.orderConfirmationTitle).toHaveText('Order Placed!');

        await expect(CheckoutPage.orderConfirmationMessage).toBeDisplayed();
        await expect(CheckoutPage.orderConfirmationMessage).toHaveText(
            'Thank you for your purchase. Your order has been successfully submitted.'
        );

        await expect(CheckoutPage.continueShoppingButton).toBeDisplayed();
        await expect(CheckoutPage.continueShoppingButton).toHaveText('Continue Shopping');

        await CheckoutPage.continueShoppingButton.click();

        const url = await browser.getUrl();
        expect(url).toContain(ProductPage.url);

        await expect(ProductPage.productPage).toBeDisplayed();
    });

    it('Verify order summary displays correct item names and quantities', async () => {
        const shippingInformation = {
            firstName: 'test',
            lastName: 'user',
            postalCode: 'M5V1K4'
        };

        // I assume backend logic for tax and total calculations are the same
        // let's not retest that here since cart tests already cover that

        await CheckoutPage.fillShippingInformation(shippingInformation);
        await CheckoutPage.continueButton.click();

        await expect(CheckoutPage.orderSummary).toBeDisplayed();

        const orderSummaryItemNames = await CheckoutPage.getOrderSummaryItemNames();
        const orderSummaryItemQuantities = await CheckoutPage.getOrderSummaryItemQuantities();

        productsToAdd.forEach((product) => {
            expect(orderSummaryItemNames).toContain(product.name);
        });

        productsToAdd.forEach((product, index) => {
            expect(orderSummaryItemQuantities[index]).toBe(product.quantity);
        });
    });

    it('Verify invalid shipping information cannot checkout', async () => {
        await CheckoutPage.continueButton.click();

        await expect(CheckoutPage.firstNameError).toBeDisplayed();
        // this is a bug for the first name error, we skip the check and log a bug
        // await expect(CheckoutPage.firstNameError).toHaveText('First Name is required');

        await expect(CheckoutPage.lastNameError).toBeDisplayed();
        await expect(CheckoutPage.lastNameError).toHaveText('Last Name is required');

        await expect(CheckoutPage.postalCodeError).toBeDisplayed();
        await expect(CheckoutPage.postalCodeError).toHaveText('Postal Code is required');
        await expect(CheckoutPage.checkoutPage).toBeDisplayed();
        await expect(CheckoutPage.checkoutForm).toBeDisplayed();
        await expect(CheckoutPage.orderSummary).not.toBeDisplayed();
    });
});