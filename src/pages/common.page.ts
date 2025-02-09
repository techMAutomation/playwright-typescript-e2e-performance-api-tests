import { expect, type Page } from '@playwright/test';

export class CommonPage {
    page: Page;
 
    constructor(page: Page) {
        this.page = page;
    }

    async enterText(text: string, value: string) {
        const element = this.page.getByRole('textbox', { name: text }).first();
        await element.click();
        await element.clear();
        await element.fill(value);
    }

    async clickLink(text: string) {
        const element = this.page.getByRole('link', { name: text }).first();
        await element.click();
    }

    async clickButton(text: string) {
        const element = this.page.getByRole('button', { name: text }).first();
        await element.click();
    }
 
    async strictSwitchTab(expectedURL: string) {
        const newTabPromise = await this.page.waitForEvent('popup');
        const newTab = newTabPromise;
        // Wait for new tab to load
        await newTab.waitForLoadState();
        // Verify new tab URL
        const newURL = newTab.url();
        expect(newURL).toContain(expectedURL);

        return newTab;
    }
}
