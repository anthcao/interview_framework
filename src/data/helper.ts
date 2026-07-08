import LoginPage from '../pages/loginPage';
import ProductPage from '../pages/productPage';
import { getUser } from '../data/users';
import { expect } from '@wdio/globals';


export async function loginUser(username: string): Promise<void> {
    const user = getUser(username);

    await LoginPage.open();
    await LoginPage.login(user.username, user.password);

    const url = await browser.getUrl();
    expect(url).toContain(ProductPage.url);

    await expect(ProductPage.loggedInUser).toBeDisplayed();
    await expect(ProductPage.loggedInUser).toHaveText(user.username);
}
