import{test,expect} from '@playwright/test'

test("Assertions Demo", async({page})=>{

    // const response=await page.request.get("");   //work on this later

    //1. Auto-Retrying assertion (auto retries untill passes or reached timeout)
    await page.goto('https://demowebshop.tricentis.com/')


    //Auto retrying : waits for the element to be visible and to have url
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");     //waits for correc url
    await expect(page.locator('text=Welcome to our store')).toBeVisible();
    
    //2. Non-Retrying assrtion (executes immediately, on the value, no retry)
    const title=await page.title();
    expect(title.includes("Demo Web Shop")).toBeTruthy();       //no auto retry

    const welcomeText= await page.locator('text=Welcome to our store').textContent();
    expect(welcomeText).toContain("Welcome");       //non-retryig

    //3. Nagating matcher (applicable on both Auto-Retrying and Non-Retrying assertions)
    await expect(page.locator("text=Welcome to --- store")).not.toBeVisible() ; //auto-retry
    expect(welcomeText).not.toContain("Hello Customers");   //no auto-retry

    await page.waitForTimeout(3000)

})