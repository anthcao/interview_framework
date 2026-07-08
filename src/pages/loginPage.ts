import BasePage from './basePage';
import { environments } from '../../environments';

class LoginPage extends BasePage {
    constructor() {
        super(environments.qa.loginUrl);
    }

    get usernameInput() {
        return $('input[name="username"]');
    }

    get passwordInput() {
        return $('input[name="password"]');
    }

    get loginButton() {
        return $('button[type="submit"]');
    }

    get errorMessage() {
        return $('[data-test="login-error-message"]');
    }

    async open(): Promise<void> {
        await super.open(this.url);
    }

    async login( username: string, password: string ): Promise<void> {
        await this.usernameInput.waitForDisplayed();
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

export default new LoginPage();