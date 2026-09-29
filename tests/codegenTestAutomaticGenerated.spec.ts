import { test, expect } from '@playwright/test';

// this file automatically get created and the testing steps are recodred by PW Codegen/Inspector
//Command on the terminal: npx playwright codegen --output tests/codegenTest.spec.ts

test('Verify Login Test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginpassword').fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome admin');
  await page.getByRole('link', { name: 'Log out' }).click();
});

//inorder to record the test on a particular browser or a device, we can do that.
//npx playwright codegen -o tests/codegenTestOnDevice.spec.ts --device "iphone 16"