import { test, expect } from '@playwright/test';

test.describe('API Tests @api', () => {

    test('API GET Request for Users list', async({ request }) => {
        const response = await request.get(`${process.env.API_URL}/users`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        let res = await response.json();
        console.log('*** users list :: ' + JSON.stringify(res));
        if (res != null) {
            expect(res[1].name).not.toBeNull;
            console.log(' *** username :: ' +  res[1].name);
        }
    });

    test('API GET Request for "User Not Found" message', async({ request }) => {
        const response = await request.get(`${process.env.API_URL}/users/692`);
        expect(response.status()).toBe(404);
        let res = await response.json();
        console.log(' *** users list :: ' + JSON.stringify(res));
        if (res == null) {
            expect(res.message).toBe('Resource not found');
        } 
    });
});
