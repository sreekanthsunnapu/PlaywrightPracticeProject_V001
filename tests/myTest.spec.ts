import {test, expect } from "@playwright/test";

test("Verify Page Title", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com");
    console.log("Verify Page Title Test in myTest")
    let pageTitle:string= await page.title();
    console.log("Page title is: ",pageTitle);
    
    await expect(page).toHaveTitle("Automation Testing Practice");

});

test("Verify Page URL",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com");

    console.log("Assresting to have Page URL in myTest")
    await expect(page).toHaveURL(/automation/);
});