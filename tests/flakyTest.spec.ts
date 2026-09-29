import {test, expect} from '@playwright/test'

/*
There are 3 ways to configure the no.of times playwright to retry the test-execution when failed
Appraoch: 1
retry on CI Environment (Jenkins/GitHub Actions/etc) 
playwright.config.ts > retries: process.env.CI ? 2 : 0

Appraoch: 2
Globally/for entire project  ---> playwright.config.ts > retries: 3,
or this setting also works --> retries: process.env.CI ? 2 :3 

Appraoch: 3
for all the Testcases : from the CLI> npx playwright test --reties=2
for a particular Testcase: from the CLI> npx playwright test testcaseName.spec.ts --headed --retries=3 
*/

test('flaky test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginusername').press('Tab');
  await page.locator('#loginpassword').fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();

  //intenstionally keeping this timeout to interrupt the test execution flow
  //run in --headed mode, do some actions on webpage to interrupt the flow, 
  //so that test may get fail, then playwright configuration retries it for upto 3 times 
  await page.waitForTimeout(10000)
  await expect(page.locator('#nameofuser')).toContainText('Welcome admin');
  await page.getByRole('link', { name: 'Log out' }).click();

  //look into the html report and analyse the results: test steps, screenshots, videos, trace, etc
});