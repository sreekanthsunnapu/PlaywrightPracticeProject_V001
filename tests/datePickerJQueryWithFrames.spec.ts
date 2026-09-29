import {test,expect, Locator, Page} from '@playwright/test'

test("JQuery Date Picker Demo with iframes", async({page})=>{

        await page.goto("https://jqueryui.com/datepicker/")
        /*
        page.frame      : for Named Frames
        page.frames     : Get all frames
        page.mainFrame  : Get main frame
        page.frameLocator  : Get frame by Selector
        */
        const frameElement=page.frameLocator(".demo-frame");
        //const frameElement=await page.frameLocator(".demo-frame").locator('#datepicker').click();
        
        await expect(frameElement.locator('#datepicker')).toBeVisible();
        await frameElement.locator("#datepicker").click();

        let day='26', month='June', year='2027';
        
        // await expect(frameElement.getByRole('link',{name:'Next'})).toBeVisible();
        await expect(frameElement.getByText('Next')).toBeVisible();
        const nextButton=frameElement.getByText('Next');
        const previousButton=frameElement.getByText('Prev');
        
        //Past Date: DOB Picker, etc
        // while(true){
        //     const currentMonth=await frameElement.locator('.ui-datepicker-month').innerText();
        //     const currentYear=await frameElement.locator('.ui-datepicker-year').innerText();
            
        //     if(month===currentMonth && year===currentYear){
        //         break;
        //     }
        //     await previousButton.click();
        // }

        //Future Date Selection     : Travel Plans. Check-In, Check-out applications
        while(true){
            const currentMonth=await frameElement.locator('.ui-datepicker-month').innerText();
            const currentYear=await frameElement.locator('.ui-datepicker-year').innerText();
            
            if(month===currentMonth && year===currentYear){
                break;
            }
            await nextButton.click();
        
        }

        // const days=frameElement.locator('.ui-datepicker-calendar tbody tr td');
        // for(let d=0;d<await days.count();d++){
        //     const date=await days.nth(d).innerText();
        //     if(date===day){
        //         await days.nth(d).click();
        //         await page.waitForTimeout(2000)
        //     }
        // }

        const daysLocators:Locator[]=await frameElement.locator('.ui-datepicker-calendar tbody tr td').all();
        for(let d of daysLocators){
            let date=await d.innerText();
            // console.log("date extracted: ",date)
            if(date===day){
                await d.click();
                break;
            }
        }
        console.log("Input Date :",await frameElement.locator("#datepicker").inputValue());
})