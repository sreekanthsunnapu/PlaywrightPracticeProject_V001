import {test,expect} from '@playwright/test'

const searchItems:string[]=['computer', 'laptop','Gift Card', 'monitor'];

/** 
test("Parameterisation test : Search One item ", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill("computer");
    await page.getByRole('button', {name:'Search'}).click();
    await expect.soft(page.locator(".product-grid h2 a").nth(0)).toContainText("computer", {ignoreCase:true});
})
*/

//using for...of loop       : This loop works with mutli-dimentional arrays
/** 
for(const item of searchItems){

    test(`Parameterisation test : Search for ${item}`, async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");    
    await page.locator("#small-searchterms").fill(item);
    await page.getByRole('button', {name:'Search'}).click();
    await expect.soft(page.locator(".product-grid h2 a").nth(0)).toContainText(item, {ignoreCase:true});
})
}
*/
//using for...each function     : This loop only works with single dimentional arrays
searchItems.forEach(item=>{
    test(`Parameterisation test : Search for ${item}`, async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");    
    await page.locator("#small-searchterms").fill(item);
    await page.getByRole('button', {name:'Search'}).click();
    await expect.soft(page.locator(".product-grid h2 a").nth(0)).toContainText(item, {ignoreCase:true});
    });
});

//as PW test running the above test for 4 times, means treating them as 4 different tests
//so, lets keep it in a describe block to group them
test.describe("Searching Item,",async()=>{   
    searchItems.forEach(item=>{
        test(`Parameterisation test : Search for ${item}`, async({page})=>{
            await page.goto("https://demowebshop.tricentis.com/");    
            await page.locator("#small-searchterms").fill(item);
            await page.getByRole('button', {name:'Search'}).click();
            await expect.soft(page.locator(".product-grid h2 a").nth(0)).toContainText(item, {ignoreCase:true});
        });
    });
})