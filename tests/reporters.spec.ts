import {test,expect,Page} from '@playwright/test'


let page:Page;

test.beforeAll("",async({browser})=>{
    page=await browser.newPage();
})

test.beforeEach("",async()=>{
    await page.goto('https://demowebshop.tricentis.com');
})

test("logo test",async()=>{
    await expect(page.getByAltText("Tricentis Demo Web Shop")).toBeVisible();
})

test("title test",async()=>{
    await expect(page).toHaveTitle("Demo Web Shop");
})

test("search test",async()=>{
    await page.locator("#small-searchterms").fill("laptop");
    await page.getByRole('button',{name:'Search'}).click();
    //intenionally failing this assertion to see the failure results in report
    await expect(page.locator(".details h2 a").nth(0)).toContainText("laptooop",{ignoreCase:true});
})

//for more notes on reporters ref: https://playwright.dev/docs/test-reporters
/**
 * list reporter
 * CLI> npx playwright test reporters.spec.ts --reporter=list
 * config.ts> reporter:[['list']],
 * 
 * config options:
 * reporter: [['list', { printSteps: true }]],
 * reporter: [['list', { printFailuresInline: true }]],
 * reporter: [['list', { omitTags: true }]],
 * 
 * list report open open anywhere, simply prints on the console
 * we can only see the execution steps on the console
 * 
 */

/**
 * line reporter
 * CLI>npx playwright test reporters.spec.ts --reporter=list
 * config.ts> reporter: [['line']],
 * 
 * this reporter shows execution steps only on the console
 */

/**
 * dot reporter
 * CLI>npx playwright test reporters.spec.ts --reporter=dot
 * config.ts> reporter: [['dot']],
 * 
 * this reporter shows execution steps only on the console in the format-->(..F..T..x...)
 */

/**
 * junit reporter
 * CLI>npx playwright test reporters.spec.ts --reporter=junit
 * config.ts> reporter: [['junit',{outputFile='test-reports/results.xml'}]],
 * 
 * this reporter shows execution steps on the console, and an outputFile.xml can be configured
 */

/**
 * json reporter
 * CLI>npx playwright test reporters.spec.ts --reporter=json
 * config.ts> reporter: [['json',{outputFile='test-reports/results.json'}]],
 * 
 * this reporter shows execution steps on the console, and an outputFile.json can be configured
 */

/**
 * Allure-Reporter
 * install: CLI>npm install -D allure-playwright
 * 
 * run tests: CLI> npx playwright test reporters.spec.ts --reporter=allure-playwright
 * same in config.ts> reporter:'allure-playwright'
 *
 *  results:
 * as a step 1, it generates a file at project/allure-results/ as a json file 
 * xxxx-xxxx-xxx-result.json
 * this result.json file is not the report, we need on more installation
 * CLI>npm install -g allure-commandline
 * check version: CLI>allure --version
 * 
 * 
 */