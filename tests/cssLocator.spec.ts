import {test, expect,Locator} from '@playwright/test'

test("CSS Locators Demo",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //tag#id
    const searchItems:Locator=page.locator("input#small-searchterms");
    await searchItems.fill('mobiles');

    //#id
    await expect(page.locator("#small-searchterms")).toBeVisible();
    await page.locator("#small-searchterms").fill('mobiles'); //tag is optional

    //#id[attribute='value']


    //tag.class


    //.class  -as tag is optional


    //.class[attribute='value']


    
    //tag[attribute='value']



    //[attribute='value']  - as the tag is optional


    
    



});