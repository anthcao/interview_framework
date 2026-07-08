import { environments } from '../../environments';
import BasePage from './basePage';

type ShippingInformation = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

class CheckoutPage extends BasePage {
    constructor() {
        super(environments.qa.checkoutUrl);
    }

    get checkoutPage() {
        return $('[data-test="checkout-page"]');
    }

    get checkoutForm() {
        return $('[data-test="checkout-form"]');
    }

    get firstNameInput() {
        return $('[data-test="checkout-first-name"]');
    }

    get lastNameInput() {
        return $('[data-test="checkout-last-name"]');
    }

    get postalCodeInput() {
        return $('[data-test="checkout-postal-code"]');
    }

    get continueButton() {
        return $('[data-test="continue-to-summary"]');
    }

    get orderSummary() {
        return $('[data-test="checkout-summary"]');
    }

    get summarySubtotal() {
        return $('[data-test="checkout-subtotal"]');
    }

    get summaryTax() {
        return $('[data-test="checkout-tax"]');
    }

    get summaryTotal() {
        return $('[data-test="checkout-total"]');
    }

    get finishButton() {
        return $('[data-test="finish-button"]');
    }

    get orderConfirmationPage() {
        return $('[data-test="checkout-success-page"]');
    }

    get orderConfirmationTitle() {
        return $('[data-test="checkout-success-title"]');
    }

    get orderConfirmationMessage() {
        return $('[data-test="checkout-success-message"]');
    }

    get continueShoppingButton() {
        return $('[data-test="back-to-home"]');
    }
    
    get shippingInfo() {
        return $('[data-test="shipping-info"]');
    }

    get firstNameError() {
        return $('[data-test="first-name-error"]');
    }

    get lastNameError() {
        return $('[data-test="last-name-error"]');
    }

    get postalCodeError() {
        return $('[data-test="postal-code-error"]');
    }

    get orderSummaryItems() {
        return $$('[data-test="checkout-item"]');
    }

    get orderSummaryItemNames() {
        return $$('[data-test="checkout-item-name"]');
    }

    get orderSummaryItemQuantities() {
        return $$('[data-test="checkout-item-qty"]');
    }

    async fillShippingInformation(shippingInformation: ShippingInformation) {
        await this.firstNameInput.setValue(shippingInformation.firstName);
        await this.lastNameInput.setValue(shippingInformation.lastName);
        await this.postalCodeInput.setValue(shippingInformation.postalCode);
    }

    async getOrderSummaryItemNames() {
        const itemNameElements = await this.orderSummaryItemNames;
        const itemNames: string[] = [];

        for (const itemNameElement of itemNameElements) {
            itemNames.push(await itemNameElement.getText());
        }

        return itemNames;
    }

    async getOrderSummaryItemQuantities() {
        const quantityElements = await this.orderSummaryItemQuantities;
        const quantities: number[] = [];

        for (const quantityElement of quantityElements) {
            const quantityText = await quantityElement.getText();

            // Example text: "Qty: 2 × $24.99"
            const quantity = Number(
                quantityText
                    .replace('Qty:', '')
                    .trim()
                    .split(' ')[0]
            );

            quantities.push(quantity);
        }

        return quantities;
    }
}

export default new CheckoutPage();