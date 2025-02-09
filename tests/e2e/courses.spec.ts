import { expect, test } from '@playwright/test';
import { CommonPage } from '../../src/pages/common.page';
import { COOKIES_PATH } from '../utils/constants';

test.use({
    storageState: COOKIES_PATH,
});

test.describe('Test User navigates to courses page @courses @regression', () => {
    test('Test user navigates to the Courses page', async({ page }) => {
        const originalTab = page;
        const commonPage = new CommonPage(page);
        await page.goto('/logged-in-successfully');
        // Clicks on 'Courses' menu link
        await commonPage.clickLink('Courses');
        await expect(page.getByRole('heading').filter({ hasText: 'Courses'})).toBeVisible();
        // Clicks on 'Start a Free Trail Now' button
        await commonPage.clickLink('Start a Free Trial Now!');
        // Switch to new tab
        const newTab = await commonPage.strictSwitchTab('https://checkout.teachable.com/secure/971788/checkout/');
        // Close new tab
        await newTab.close();
        // Switch back to original tab
        await originalTab.bringToFront();
        await expect(page.getByRole('heading').filter({ hasText: 'Courses'})).toBeVisible();
    });
});
