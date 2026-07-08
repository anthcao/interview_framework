import ProductPage from '../pages/productPage';
import LoginPage from '../pages/loginPage';
import { users, getUser } from '../data/users';
import { expect } from '@wdio/globals';

const acceptedUsers = users.filter(user => user.acceptedUser);
const lockedUser = getUser('vault_locked');
const invalidUser = getUser('invalid_user');

describe('Login Page Tests', () => {
    it('Verify login success for all accepted users', async () => {
        for (const user of acceptedUsers) {
            await LoginPage.open();

            await LoginPage.login(
                user.username,
                user.password
            );

            const url = await browser.getUrl();
            expect(url).toContain(ProductPage.url);

            await expect(ProductPage.loggedInUser).toBeDisplayed();
            await expect(ProductPage.loggedInUser).toHaveText(user.username);
        }
    });

    it('Verify login failure with a locked user', async () => {
        await LoginPage.open();

        await LoginPage.login(
            lockedUser.username,
            lockedUser.password
        );

        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface below — Sorry, this user has been locked out.');
    });

    it('Verify login failure with an invalid user', async () => {
        await LoginPage.open();

        await LoginPage.login(
            invalidUser.username,
            invalidUser.password
        );

        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface below — Username and password do not match any user in this service');
    });
});