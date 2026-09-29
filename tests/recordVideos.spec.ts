import {test,expect} from '@playwright/test'

/*
Playwright Test can record videos for your tests,  
controlled by the video option in your Playwright config. By default videos are off.
'off' - Do not record video.
'on' - Record video for each test.
'retain-on-failure' - Record video for each test, but remove all videos from successful test runs.
'on-first-retry' - Record video only when retrying a test for the first time.
Video files will appear in the test output directory, typically test-results.

--> we cannot write any code within the test to record the video
*/

test("record video ", async({page})=>{
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