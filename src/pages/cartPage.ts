import { environments } from '../../environments';
import BasePage from './basePage';

class CartPage extends BasePage{
    taxRate: number;

    constructor() {
        super(environments.qa.cartUrl);
        this.taxRate = environments.qa.taxRate; // I grabbed from environment because it depends on region
    }

    get cartPage() {
        return $('[data-test="cart-page"]');
    }

    get cartButton() {
        return $('[data-test="nav-cart"]');
    }

    get cartTitle() {
        return $('[data-test="cart-title"]');
    }

    get emptyCartTitle() {
        return $('[data-test="cart-empty-title"]');
    }

    get emptyCartMessage() {
        return $('[data-test="cart-empty-message"]');
    }

    get continueShoppingButton() {
        return $('[data-test="continue-shopping"]');
    }

    get cartItems() {
        return $$('[data-test="cart-item"]');
    }

    get itemQuantities() {
        return $$('[data-test^="quantity-item-"]');
    }

    get increaseQuantityButtons() {
        return $$('[data-test^="increase-qty-item-"]');
    }

    get decreaseQuantityButtons() {
        return $$('[data-test^="decrease-qty-item-"]');
    }

    get cartItemNames() {
        return $$('[data-test="cart-item-name"]');
    }

    get cartItemPrices() {
        return $$('[data-test="cart-item-price"]');
    }

    get cartItemTotals() {
        return $$('[data-test^="cart-item-total-"]');
    }

    get subtotalAmount() {
        return $('[data-test="cart-subtotal"]');
    }

    get taxAmount() {
        return $('[data-test="cart-tax"]');
    }

    get totalAmount() {
        return $('[data-test="cart-total"]');
    }

    get checkoutButton() {
        return $('[data-test="checkout-button"]');
    }

    async getCartItemNames() {
        const itemNames = await this.cartItemNames;
        const names: string[] = [];

        for (const itemName of itemNames) {
            names.push(await itemName.getText());
        }

        return names;
    }

    async getTitleItemCount() {
        const titleText = await this.cartTitle.getText();
        // we use the bracket in "Your Cart (1 item)" to grab the number of items
        const countText = titleText.split('(')[1].split(' ')[0];
        const count = Number(countText);

        return count;
    }

    async getPageItemCount() {
        // returns the number of items in cart by adding up all displayed items
        const quantities = await this.itemQuantities;
        let total = 0;

        for (const quantity of quantities) {
            const quantityText = await quantity.getText();
            const quantityNumber = Number(quantityText.trim());

            total += quantityNumber;
        }

        return total;
    }

    async getCartItemPrices() {
        const priceElements = await this.cartItemPrices;
        const prices: number[] = [];

        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const price = Number(
                priceText
                    .replace('$', '')
                    .replace(' each', '')
                    .trim()
            );

            prices.push(price);
        }

        return prices;
    }

    async getCartItemQuantities() {
        const quantityElements = await this.itemQuantities;
        const quantities: number[] = [];

        for (const quantityElement of quantityElements) {
            const quantityText = await quantityElement.getText();
            const quantity = Number(quantityText.trim());

            quantities.push(quantity);
        }

        return quantities;
    }

    async changeItemQuantity(index: number, change: number) {
        // takes a product index in the cart and the relative change
        // since the change can be negative we need to absolute value it
        const clickCount = Math.abs(change);

        for (let i = 0; i < clickCount; i++) {
            const quantityButtons = change > 0
                ? await this.increaseQuantityButtons
                : await this.decreaseQuantityButtons;

            if (!quantityButtons[index]) {
                throw new Error(`Quantity button at index: ${index} was not found.`);
            }

            await quantityButtons[index].waitForDisplayed();
            await quantityButtons[index].click();
        }
    }

    convertCurrencyTextToNumber(text: string) {
        const amount = Number(
            text
                .replace('$', '')
                .replace('each', '')
                .trim()
        );

        return amount;
    }

    async calculateExpectedSubtotal() {
        const itemPrices = await this.getCartItemPrices();
        const itemQuantities = await this.getCartItemQuantities();

        let subtotal = 0;

        itemPrices.forEach((price, index) => {
            subtotal += price * itemQuantities[index];
        });

        // for whatever reason, despite that this subtotal should never be more than 2 decimal places
        // I'm running into trailing numbers, so I'll add this round function for stability
        return Math.round(subtotal * 100) / 100;
    }

    async calculateExpectedTax() {
        const expectedSubtotal = await this.calculateExpectedSubtotal();

        return Math.round(expectedSubtotal * this.taxRate * 100) / 100;    
    }

    async getCartItemTotals() {
        const totalElements = await this.cartItemTotals;
        const totals: number[] = [];

        for (const totalElement of totalElements) {
            const totalText = await totalElement.getText();
            const total = this.convertCurrencyTextToNumber(totalText);

            totals.push(total);
        }

        return totals;
    }

    async calculateExpectedItemTotals() {
        const itemPrices = await this.getCartItemPrices();
        const itemQuantities = await this.getCartItemQuantities();
        const expectedItemTotals: number[] = [];

        itemPrices.forEach((price, index) => {
            const expectedTotal = Math.round(price * itemQuantities[index] * 100) / 100;
            expectedItemTotals.push(expectedTotal);
        });

        return expectedItemTotals;
    }
}

export default new CartPage();