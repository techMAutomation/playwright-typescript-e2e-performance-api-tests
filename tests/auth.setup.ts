import { expect, test as setup } from '@playwright/test';
import { getUserAccount } from './utils/getUserAccount';
import { COOKIES_PATH } from './utils/constants';
import { CommonPage } from '../src/pages/common.page';

const userAccount = getUserAccount();

setup.describe('Login @setup', () => {
    setup('Authentication', async({ page }) => {
        const commonPage = new CommonPage(page);
        await setup.step('Enter username and password', async() => {
            // Navigate to the URL
            await page.goto('/practice-test-login/');
            // Enter Username/Password
            await commonPage.enterText('Username', userAccount.username);
            await commonPage.enterText('Password', userAccount.password);
        });

        await setup.step('Sign in and Verify Dashboard page', async() => {
            commonPage.clickButton('Submit');
            await expect(page.getByRole('heading').filter({ hasText: 'Logged In Successfully' })).toBeVisible();
        });

        await setup.step('Store Cookies and local storage snapshot of current context', async() => {
            await page.context().storageState({ path: COOKIES_PATH });
        });
    });
});
