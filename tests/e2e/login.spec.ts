
import { expect, test } from '@playwright/test';
import { CommonPage } from '../../src/pages/common.page';
import { COOKIES_PATH } from '../utils/constants';

test.use({
    storageState: COOKIES_PATH,
});

test.beforeEach(async ({ page }) => {
    await page.goto('/logged-in-successfully');
});

test.describe('Test Login functionality @login @smoke @regression', () => {
    test('Test user signout', async({ page }) => {
        const commonPage = new CommonPage(page);
        await commonPage.clickLink('Log out');
        await expect(page.getByRole('heading').filter({ hasText: 'Test login'})).toBeVisible();
    });

    test('Test Privacy Policy link on the footer', async({ page }) => {
        const commonPage = new CommonPage(page);
        await commonPage.clickLink('Privacy Policy');
        expect(page.url()).toContain('/privacy-policy');
    });
});
