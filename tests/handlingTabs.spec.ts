import {test, expect, chromium} from '@playwright/test'

test("Handle TABS",async()=>{

    //difference between Tabs & Pop-us is, here we have to trigger page event

    const browser=await chromium.launch();      //create a browser
    const context=await browser.newContext()    //create a context
    const parentPage1=await context.newPage()         //create a page
    // const page2=await context.newPage()

    await parentPage1.goto('https://testautomationpractice.blogspot.com/')

    /*
    //below 2 statements should go parallely
    await parentPage1.locator("button:has-text('New Tab')").click();        //this tab opens a new Page
    context.waitForEvent('page');        //this is a page event

    when you click on this "New Tab" button, in the same browser context opens a new page, 
    now i want to capture these 2 tabs both of these tabs are on of the same page.  
    inorder to work with the new tab, we have to trigger an event -->context.waitForEvent('page')
    we have to trigger first and waitfor event to take place and so that it can handle it.
    this event returns a promise, that could be pending, fulfilled or rejected
    but there is a problem: 
    if we first click the tab and then trigger an event, the event may wait indefinitely as the action may already taken place by the time new tab opens
    if we trigger the event first then click on the button, the event may return rejected as there is not action pending 
    so to resolve this problem, we have to use Promise.all() to run both the promises parallelly 
    */

    //we have to capture the event properly before performing the action, so run them combinedly and wait for the result
    const [childPage]=await Promise.all([context.waitForEvent('page'), parentPage1.locator("button:has-text('New Tab')").click()])    
    //returns an array of promise - that could be a page or void --> [Promise<Page>, Promise<void>]
    //Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.

    //Now we have 2 pages: parentPage and childPage --> One page we created, the other created during the execution of the code
    // so how to work with them? 

    //Approach - 1 --> switch between pages and get titles
    //when we have many pages to work with, then use this appraoch
    const pages=context.pages();        //this returns the no.of pages created
    console.log("no.of pages created: ", pages.length)

    console.log("By using the Pages Array")
    console.log("Parent Page Title: ",await pages[0].title())
    console.log("Chile Page Title : ", await pages[1].title())
    // by leveraging the arrays access the pages, this is one approach

    //Appraoch - 2  - (use this when we have a few pages like 2 or 3,use this approach)
    console.log("By using the page names")
    console.log("Parent Page Title: ",await parentPage1.title())
    console.log("Chile Page Title : ", await childPage.title())
})