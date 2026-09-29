import {test,expect} from '@playwright/test'
/*
Playwright annotations are different from TestNG annotations
Playwright Hooks are simiar to TestNG annotation

Playwright supports tags and annotations that are displayed in the test report.
You can add your own tags and annotations at any moment, but Playwright comes with a few built-in ones:

Playwright Annotations: 
---> only, fail, skip, slow, fixme
PW Annotations are used to control the test run
*/

//noraml test case
test("test1",async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//addd test.only to try only this testcase to be executed when you run the test
//(frequently used in projects)
test("test2 to try only",async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//This testcase will be skipped when you run the test (frequently used in projects)
//test.skip() marks the test as irrelevant. Playwright does not run such a test. 
// Use this annotation when the test is not applicable in some configuration.
test.skip("test3 to try skip ",async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//skip on a specific condition
test("test4 to skip on condition inside",async ({page, browserName})=>{
    // test.skip(browserName==='chromium',"this test is webkit specific, cant run on Chromium")
    test.skip(browserName==='firefox',"this test is webkit specific, cant run on Chromium")
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//to intenstionally fail the test without checking anything inside, use this annotation
//test.fail() marks the test as failing. Playwright will run this test and ensure it does indeed fail. 
// If the test does not fail, Playwright will complain.
test.fail("test5 to try fail",async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//test.fixme() marks the test as failing. Playwright will not run this test, as opposed to the fail annotation. 
// Use fixme when running the test is slow or crashes.
test.fixme("test6 to try fixme",async ({page})=>{
    //say you are working on a project, you partially implemented this test 
    // and you want to test other functionality, so at runtime you keep this test in .fixme state
    // and test other testcases and later on come back and fix/complete this test
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")

   // more test steps to be implemented ...........
})

// slow down the test execution, which trpple the defalut time --> 30sec X 3 -> 90sec
test("test7 to try slow",async ({page})=>{
    test.slow();
    await page.goto("https://www.google.com")
    //intentionally giving wrong title so that it PW waits for element
    await expect(page).toHaveTitle("wrong title")
})

//we can apply the pw annotations on groups also