import { chromium, expect, test } from "@playwright/test";
import { playAudit } from 'playwright-lighthouse';
import lighthouseDesktopConfig from 'lighthouse/core/config/lr-desktop-config.js';
import { COOKIES_PATH } from '../utils/constants';
import path from 'path';

const thresholds = {
    performance: 73,
    accessibility: 92,
    'best-practices': 96,
    seo: 92,
};

const options = {
    loglevel: "info",
}

const URLS = [
    { url: '/practice', name: 'practice-page', firstPaint: 'Practice' },
    { url: '/courses', name: 'courses-page', firstPaint: 'Courses' },
];

test.use({ 
    storageState: COOKIES_PATH,
});

test.describe('Performance tests @performance', async() => {
    
    URLS.forEach((webPage) => {
        test(`Run Lighthouse audit for ${webPage.name}`, async ({ page }) => {
            const port = Math.floor(Math.random() * (65535 - 1024) + 1024);
            
            const launchedBrowser = await chromium.launch({
                args: [`--remote-debugging-port=${port}`],
                headless: true,
            });
            const context = await launchedBrowser.newContext();
            page = await context.newPage();
            const targetURL = `${webPage.url}`;
            // Navigate to the URL
            await page.goto(targetURL);
            await expect(page.getByRole('heading').filter({ hasText: `${webPage.firstPaint}` })).toBeVisible();
            // Run lighthouse audit
            await playAudit({
                page: page,
                config: lighthouseDesktopConfig,
                port: port,
                thresholds: thresholds,
                opts: options,
                reports: {
                    formats: {
                        html: true, 
                    },
                    name: `${webPage.name}-${new Date().getTime()}`, //defaults to `lighthouse-${new Date().getTime()}`
                    directory: path.resolve('dist/reports/lighthouse'),
                }
            });
            await context.close();
        });
    });
});
