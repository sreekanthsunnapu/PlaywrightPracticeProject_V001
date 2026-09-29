import {test, expect} from '@playwright/test'

//Take some notes from https://playwright.dev/docs/actionability'
test("Autowaiting and forcing",async({page})=>{
    
    await page.goto('https://demowebshop.tricentis.com/')

    //Assertions - Autowait works - default time - 5 seconds
    //Playwright perform actionalbility checks on assertions, 
    // like checks for: element visible, stable, receive events, enabled, editable 
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/")
    await expect(page.locator('text=Welcome to our store')).toBeVisible()

    //Actions - Autowait works - default time - 30 seconds 
    //playwright performs actionability checks on actions, then only main action takesplace   
    await page.locator("#small-searchterms").fill("Laptop")    //search box - force action

    //if you dont want playwright to perform actionability checks then, you can do so by setting force option to true 
    // provided the element support force action, which is optinal field, bydefault force is false
    await page.locator(".button-1.search-box-button").click({force:true})   //No actionability checks here

    // here we dont need to bother about synchronisation problems, 
    // by default playwright will follow asynchronous nature, and auto-wait will solve the waiting problem 
    await page.waitForTimeout(3000)
    /*
    Autowaits are useful to reduce the falky tests
    Makes the tests more stable and reliable
    Improves readbility and maintainability
    */
})

test("TimeOut Test-Level, Expect-Level",async({page})=>{
    //https://playwright.dev/docs/test-timeouts

    /*
    Timeouts are used iin PW to define how long the framwork should wait before failing a test or assertion
    PW provides flexible ways to manage timeouts locally and globally   
    */
    
    /*
    There are two Types of Timeouts: 
    1. Test timeout (Timeout for each test)
    2. Expect timeout (Timeout for each assertion)

    There are two ways that we can set the timeout
    1 --> within the test  --> (Locally)
        Test timeout  --> test.setTimeout(120_000)
        Expect timeout --> expect(locator).toBeVisible({timeout:10_000})

    2 --> set the timeout in playwright.config.ts file --> (Globally) 
        Test timeout  --> {timeout:60_000}
        Expect timeout --> {expect:{timeout:120_000}}
    
    when we set timeout, locally ang globally, Local Timeout overrides global timeout 
    */

    //test-level timeout
    //test.setTimeout(60_000)     //this timeout is applicable to entire test life, Override in test
    await page.goto('https://demowebshop.tricentis.com/')
    
    //there is another method to set the timeout at the test-level ---> test.slow
    // test.slow();     //default is 30 sec, slow() tripples the timeout - i.e.90 sec

    //assertion-level timeout for a particular expect statement
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/")
    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10_000})      //applicable only for this assertion

    await page.locator("#small-searchterms").fill("Laptop")
    await page.locator(".button-1.search-box-button").click({force:true})
})
