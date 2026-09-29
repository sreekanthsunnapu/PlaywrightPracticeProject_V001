import {test, expect} from '@playwright/test'

test("Handling Authnticated Popup windows", async ({browser})=>{

    const context=await browser.newContext();

    const page=await context.newPage();

    //one approach to handle authenticated popups is to pass username & password along with the link
    //that approach we follow in selenium - that also works with playwright as well

    //url: https://the-internet.herokuapp.com/basic_auth
    //syntax: https://username:password@the-internet.herokuapp.com/basic_auth

    //Approach - 1
    await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");

    //we also have a different approach to handle this in playwright (refer Approach -2)

    await page.waitForLoadState()       //this waits for the page to load completely

    // await expect(page.getByRole('heading', {name:"Basic Auth"})).toBeVisible();
    expect(await page.title()).toBe("The Internet");
    //await page.waitForTimeout(3000)

    //Approach -2, pass the login credentials along with the browser context

})

test("Handle Auth popups - with Browser Context", async ({browser})=>{
    
    //Approach 2 : preferred in playwright
    const context=await browser.newContext({httpCredentials:{username:"admin", password:"admin"}});
    const page=await context.newPage()

    await page.goto("http://the-internet.herokuapp.com/basic_auth")
    
    let title=await page.title();
    expect(title).toBe("The Internet");
    console.log("Title is: ",title)
    page.waitForTimeout(3000)
})