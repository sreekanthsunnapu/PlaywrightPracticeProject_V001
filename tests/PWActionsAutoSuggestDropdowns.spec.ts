//Bootstrap dropdown are those where we dont find a <select> tag for selections
/*
Static Dropdown: <select> tag is available 

Dynamic / Auto-Suggest Dropdown: Dont have <select> tag, options keep changing everytime
Dynamic/auto-suggest DD is also called as bootstrap DD

Hidden Drop Down: Options are static, but cannot inspect/locate the options.
These are also comes under the bootstrap DD 
*/

import {test, expect, Locator} from '@playwright/test'

test("Auto Suggest DropDowns",async ({page})=>{
    await page.goto('https://www.flipkart.com/');
    //await page.locator(`input[name='q']`).fill('smart');    //search textbox
    await page.locator('input.nw1UBF.v1zwn26:visible').fill('smart');
    await page.waitForTimeout(6000);    //here, after fill the text, the auto-suggest option have to come from the server, so needd sometime, hence auot-wait wont wor, use hard coded wait
    //get all the suggested options -->  Ctrl+Shift+P on DOM --> type command 'emulate a focused page'
    const options:Locator=page.locator('ul>li');
    const countOptions=await options.count();
    console.log("Numbers of Auto-Suggest Options: ", countOptions);

    // console.log("5th auto-suggest Options ",await options.nth(5).innerText());
    console.log("****Printing auto-suggestion options****")
    for(let i=0;i<countOptions;i++ ){
        // console.log(await options.nth(i).innerText());  //both working, check accordingly
        //sometimes textContent() give us spaces, special chars, in that case check and use the appropriate one
        console.log(await options.nth(i).textContent());
    }
    //select / click on the smart phone option
    //here the order of the suggestion is not same always.
    for(let i=0;i<countOptions;i++){
        const text=await options.nth(i).innerText();
        if(text==='smartphone'){
            //await page.waitForTimeout(2000);
            options.nth(i).click();
            break;
        }
    }
})

test("Flipkart Auto Suggest Dropdown", async ({page})=>{
    
    await page.goto('https://www.flipkart.com/');

    await page.locator('input.nw1UBF.v1zwn26:visible').fill('smart');
    await page.waitForTimeout(6000);

    const options:Locator=page.locator('ul>li');
    const optinsCount=await options.count();
    console.log("Number of Auto-Suggestions: ",optinsCount);

    const optionsText:string[]=await options.allTextContents();
    for(const option of optionsText){
        console.log(option);
    }
    await page.waitForTimeout(2000);
    for(let i=0;i<optinsCount;i++){
        if(await options.nth(i).textContent()==='smartphone'){
            options.nth(i).click();
            break;
        }
    }


})