import { test, expect, devices } from '@playwright/test';

//Terminal Command: npx playwright codegen -o tests/codegenTestOnDevice.spec.ts --device "iPhone 16"
//Terminal Command: npx playwright codegen -o tests/codegenTestOnDevice.spec.ts -d "iPhone 16"
//if you give some incorrect device name at the, it shows all the available devices, so that you can use any

test.use({
  ...devices['iPhone 16'],
});

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('admin');
  await page.getByRole('dialog', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome admin');
  await page.getByRole('link', { name: 'Log out' }).click();
});