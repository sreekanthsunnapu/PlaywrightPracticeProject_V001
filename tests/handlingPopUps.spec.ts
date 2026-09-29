import{expect, test} from '@playwright/test'

test("Handling Pop-Ups", async({browser})=>{        //passing a browser, so no need to create it inside

    //difference between  Pop-us & Tabs is, here we have to trigger popup event

    const context=await browser.newContext();

    const parentPage=await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    //trigger popup event
    await Promise.all([parentPage.waitForEvent("popup"), parentPage.locator("#PopUp").click()])
    //const [childPage2]=await Promise.all([parentPage.waitForEvent("popup"), parentPage.locator("#PopUp").click()])
    
    await parentPage.waitForTimeout(5000)
    const allPopupWindows=context.pages();
    console.log("No.of Pages/windows are : ",allPopupWindows.length);

    console.log("Parent Page URL is : ",  allPopupWindows[0].url())     //https://testautomationpractice.blogspot.com/
    console.log("Popup Window - 1 URL is :", allPopupWindows[1].url())  //https://www.selenium.dev/
    console.log("Popup window - 2 URL is :", allPopupWindows[2].url())  //https://playwright.dev/
    
    //now i want to close a specific or all the popup window
    // use array index to close specific pop-up Window
    //use for...of loop to work with the array f windows

    // await allPopupWindows[1].waitForTimeout(1000)
    // await allPopupWindows[2].waitForTimeout(1000);

    for(const pw of allPopupWindows){
        const title=await pw.title();
        console.log("Title is :", title)

        if(title.includes("Playwright")){
            //here we can perform any other actions
            await pw.locator(".getStarted_Sjon").click();
            //await pw.waitForTimeout(3000)
            console.log("redirected to url: ",pw.url())
            await pw.close();       //this will close the playwright pop-up window
        }
        
        if(title.includes("Selenium")){
            await pw.getByRole("link", {name: "Downloads"}).click()
            console.log("Selenium downloads URL is :", pw.url())
            expect(pw.url()).toBe("https://www.selenium.dev/downloads/");
           // pw.waitForTimeout(3000)
            await pw.close()
        } 

    }
    await parentPage.waitForTimeout(5000)
})