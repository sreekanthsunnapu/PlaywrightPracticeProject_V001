import {test, expect} from '@playwright/test'

/*
We have set screenshot:'on' in playwright.config.ts
we have not set any path to store the screenshots, 
so by default it stores in test-results folder, by creating a folder with testcase name and stores finshed test screenshot
the screenshot is also attached in the html report
*/ 
test("Capture Screeshot from config screeshot : 'on' ", async({page})=>{
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
})

/*
We have set screenshot:'only-on-failure' in playwright.config.ts
we have not set any path to store the screenshots, 
so by default it stores in test-results folder, by creating a folder with testcase name and stores  test-failed-1 screenshot
the screenshot is also attached in the html report
*/
test("Capture Screeshot from config screeshot : 'only-on-failure' ", async({page})=>{
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginpassword').fill('incorrectPassrod');
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
})