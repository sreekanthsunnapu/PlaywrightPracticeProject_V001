import { test, expect } from '@playwright/test';

//Command on Terminal : npx playwright codegen -o tests/codegenTestOnChrome.spec.ts --browser "firefox"
//npx playwright codegen -o tests/codegenTestOnChrome.spec.ts -b "firefox"  (chromium, webkit)
//whatever the browser name you give here, test steps are browser neutral
test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginpassword').fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome admin');
  await expect(page.locator('#nava')).toMatchAriaSnapshot(`
    - link "PRODUCT STORE":
      - /url: index.html
      - img
      - text: ""
    `);
  await page.getByRole('link', { name: 'Log out' }).click();
});