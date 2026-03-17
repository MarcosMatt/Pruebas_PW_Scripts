import { test, expect } from "@playwright/test";

test('Hace un mock de un afruta que no viene en la API', async ({ page }) => {
    
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Melocoton', id: 26}];
        await route.fulfill({ json });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Melocoton')).toBeVisible();
});