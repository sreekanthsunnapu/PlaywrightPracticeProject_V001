import {test, expect, Locator} from '@playwright/test'

test("Bootstrap Hidden Dropdown", async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator(`[name='username']`).fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name:'Login'}).click();
    
    //click on the PIM
    await page.getByRole('link',{name:'PIM'}).click();
    //after clicking on this dropdown, it is sending an AJAX call to the server to get the available option, so it takes a while to load the option, hence lets give some timeout
    await page.waitForTimeout(3000);
    //Click on Job Title dropdown
    await page.locator('form i').nth(2).click();

    //here, in the browser, click on the dropdown-->in DevTools Ctrl+Shift+P --> in the Run>command "Emulate a focused page"
    //so that, the options list gets freeze, you can now inspect the DOM Structure and extract the options locators
    //after that, in the same way, do --> Run>Command "Do not emulate a focused page"
    const optionsList:Locator= page.locator(`div[role='listbox'] span`);
    const count=await optionsList.count();
    console.log("Total No.of Options: ", count);

    //print all the options using allTextContents() or allInnerText()
    //const allOptions:string[]=await optionsList.allTextContents();
    const allOptions:string[]=await optionsList.allInnerTexts();
    console.log(allOptions);

    for(let i=0; i<count;i++){
        // console.log(await optionsList.nth(i).innerText());
        console.log(await optionsList.nth(i).textContent());
    }

    //select an option
    for(let i=0;i<count;i++){
        const text=await optionsList.nth(i).textContent();
        if(text==='Automaton Tester'){
            await optionsList.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(3000);
})