import {test, chromium, firefox, webkit,} from '@playwright/test'

//Browser  ----> Context(s) ----> Page(s)

//Browser  --> chromium, firefox, webkit

//context --> we can have multiple contexts for multiple users/apps for the same browser
            //provide a way to operate multiple independent browser sessions

//Page  --> page can be a Tab/Window/pop-up window


test("Here Passing page fixture-->", async({page})=>{

    console.log("Here passing the page fixture directly")
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

//here we can pass browser, context, page
// as we are directly passing a page, from which browser this page will be launched>
// which context will be created?
// so, when passing a page directly, 
// Browser: by default page will be launched from browser(s) that we configured in playwright.config.ts
// context: there will a default context for every page, that context will be used

//what if we dont want to directly pass the page fixture, if I want to create my own broswer, or my own context ?
// ---> follow like below:

})

test("Here passing context fixture-->", async({context})=>{

    console.log("here we are passing the context fixture")
// in this case, we can create a page under this context likw below
    const page= await context.newPage();
//with this page we can launch any url, or use this page
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html") 

//what about the Browser? ---> it takes default browser from playwright.config.ts
})

test("Here we are passing the browser fixture-->", async({browser})=>{
    console.log("here we are passing the browser fixture")
    //now we have to create a context for this browser
    const context=await browser.newContext();       //returns Promise<BrowserContext>
    const page= await context.newPage()             // returns Promise<Page>
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")

    //what about the Browser? ---> again it takes default browser configured in playwright.config.ts
})


test("Here we are not passing any fixture -->",async({})=>{
//if we want to launch a browser of our own choice, that that of configured in playwright.config.ts
    console.log("here we are not passing any fixture")
    
    //uncomment any of the below browser and import the same at the top and start using it
    // const browser=await chromium.launch();
    const browser=await firefox.launch();
    // const browser=await webkit.launch();

    //now we have to create a context for this browser
    const context=await browser.newContext();       //returns Promise<BrowserContext>
    const page= await context.newPage()             // returns Promise<Page>
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")

})

test.only("We can create any number of pages associated with a context",async({})=>{

    console.log("here we are not passing any fixture")
    
    //uncomment any of the below browser and import the same at the top and start using it
    const browser=await chromium.launch();
    // const browser=await firefox.launch();
    // const browser=await webkit.launch();

    const context=await browser.newContext();      
   
    const page1= await context.newPage()            
    
    const page2=await context.newPage();
    

    console.log("No.of pages created with a context :", context.pages().length)    //this returns an array of pages

    await page1.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")
    console.log("Page Title: ", await page1.title())
    

    await page2.goto("https://playwright.dev/docs/browsers#run-tests-on-different-browsers")
    console.log("Page Title : ", await page2.title());

    await page2.waitForTimeout(3000)
    await page1.waitForTimeout(3000)

    //what is the advantage of creating multiple pages with a context?
    //we can work with multiple applications parallely
    //we can configure the cookies
    //we can enable or diable the extensions of browsers ., many more..

})