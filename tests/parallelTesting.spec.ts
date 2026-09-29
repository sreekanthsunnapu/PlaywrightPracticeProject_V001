import {test} from '@playwright/test'

/** 
 * Appraoch - 1
* from playwright.config.ts
* FullyParallel:true  ---> runs tests in parallel  -> allocates 1 worker per test by default
* FullyParallel:false  ---> runs tests in sequential
*
* workers: process.env.CI? 1 : undefined   ---> use this to allocate the workers to tests
* workers: feature works only when fullyParallel:true  -> uses max workers as specified here when running test
* workers: Maxinum no.of workers here depends on no.of tests in the file/project.
* even if we mention more workers than no.of tests, still PW takes those many workers as that of tests

*/
/**
 * All tests run in worker processes. These processes are OS processes, running independently, 
 * orchestrated by the test runner. All workers have identical environments and each starts 
 * its own browser. 
 * 
 * You can't communicate between the workers. Playwright Test reuses a single worker 
 * as much as it can to make testing faster, so multiple test files are usually run 
 * in a single worker one after another.
 * 
 * Workers are always shutdown after a test failure to guarantee pristine environment 
 * for following tests.
 */
//Approach -2
//change the configuration at test-level
// test.describe.configure({mode:'serial'})     //in serial, by default workers are always 1
// test.describe.configure({mode:"default"})    //default is: serial, worker:1
// test.describe.configure({mode:"parallel"})


//Approach-3
//we can also configure parallel testing specific to a browser, set below configuration
//parallel true on chromiun, false on firefox 
/** 
 * projects: [
     {
       name: 'chromium',
       use: { ...devices['Desktop Chrome'] },
       fullyParallel:true,
     },
     {
       name: 'firefox',
       use: { ...devices['Desktop firefox'] },
       fullyParallel:false,
     },
*/

//Approach-4
//we can also configure no.of workers at the runtime in CLI
//CLI> npx playwright test parallelTesting.spec.ts --workers 4. this overrides the playwright.config.ts settings

test("Test1",async ()=>{
    console.log("This is Test1")
})

test("Test2",async ()=>{
    console.log("This is Test2")
})

test("Test3",async ()=>{
    console.log("This is Test3")
})

test("Test4",async ()=>{
    console.log("This is Test4")
})
test("Test5",async ()=>{
    console.log("This is Test5")
})
