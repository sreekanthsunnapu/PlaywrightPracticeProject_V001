import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  //to configure test tags, below grep line runs tests with specific tags, keep this commented ,uncomment when you test
  // grep:/@sanity/,        //added by sreekanth
  // grepInvert:/@regression/,  //added by sreekanth
 
  //to change the timeout globally for all the tests (default is 30_000 ms)
  //timeout:60_000,       //added by sreekanth

  //to apply a longer waittime for all expect conditions/assertions (default is 5_000 ms)
  // expect:{timeout:10_000},   //added by sreekanth

  /* Run tests in files in parallel */
  fullyParallel: true,    //this runs all the tests in parallel
  // fullyParallel: false,   //added by sreekanth  -> this executes tests sequentially

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,   
  
  // retry on this workspace/projectDirectory
  // retries: 3,                       //added by sreekanth

  //below setting makes the max no.of testfails in a suit, stops when reached, to avois wasting resources
  //same can be passed from CLI> npx playwright test --max-failures=10
  // maxFailures:process.env.CI?10:undefined,   //added by sreekanth

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  //workers on local workspace, this value cannot be zero
  // workers:3   ,  //added by sreekanth

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //to capture screenshot - applicable to all the tests (on, off, on-first-failure, only-on-failure)
    screenshot:'only-on-failure',   //added by sreekanth
    
    //to record a video, off, on, retain-on-failure,on-first-retry,etc
    //keep this commented, to save memory, also not to reduce performance
    video:'retain-on-failure',    //added by sreekanth

    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',   //modified by sreekanth
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // fullyParallel:true,    //added by sreekanth
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
