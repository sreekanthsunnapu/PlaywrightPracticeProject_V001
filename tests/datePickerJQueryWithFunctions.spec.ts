import {test, expect, Locator, Page} from '@playwright/test' 

//let us create a TypeScript function, with a reusable code
async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page, isFuture:Boolean){

    const nextButton=page.getByTitle('Next')
    const previousButton= page.getByTitle('Prev')

    while(true){
        const currentMonth=await page.locator('.ui-datepicker-month').innerText();
        const currentYear=await page.locator('.ui-datepicker-year').innerText();
        if(currentMonth===targetMonth && currentYear===targetYear){
            break;
        }
        if(isFuture){
            await nextButton.click()            // for Future Date
        }else{
             await previousButton.click()     // for Past Date
        }
    }

    const allDates:Locator[]=await page.locator('.ui-datepicker-calendar tbody tr td').all();
    for(const date of allDates){
        let day=await date.innerText();
        if(day===targetDate){
            await date.click();
            break;
        }        
    }
    // await page.waitForTimeout(2000)
}

test("JQuery Date Picker with Function", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    await expect(page.locator('#datepicker')).toBeVisible();
    const dateInput=page.locator('#datepicker');
    await dateInput.click();
    const setDay='26', setMonth='June', setYear1='2028', setYear2='2025'


    selectDate(setYear1,setMonth,setDay,page,true);
    const expectedDate1='06/26/2028'
    const actualDate1=await dateInput.inputValue();
    console.log("Date Extracted: ", actualDate1)
    await expect(dateInput).toHaveValue(expectedDate1);  //one approach - directly checking on webElement
    expect(expectedDate1).toMatch(actualDate1)      //another approach

    
    //Past Date Selection
    // selectDate(setYear2,setMonth,setDay,page,false);
    // const expectedDate2='06/26/2025'
    // const actualDate2=await dateInput.inputValue();
    // await expect(dateInput).toHaveValue(expectedDate2);  //one approach
    //expect(expectedDate2).toMatch(actualDate2); 
    
    console.log("Input Date is: ", await dateInput.inputValue());
})

test("JQuery Date Picker without Function", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    await expect(page.locator('#datepicker')).toBeVisible();
    await page.locator('#datepicker').click();
    const setDay='26', setMonth='June', setYear='2028'

    const nextButton=page.getByTitle('Next')
    const previousButton= page.getByTitle('Prev')

    //Future Date Selection
    while(true){
        const currentMonth=await page.locator('.ui-datepicker-month').innerText();
        const currentYear=await page.locator('.ui-datepicker-year').innerText();
        if(currentMonth===setMonth && currentYear===setYear){
            break;
        }
        await nextButton.click()            // for Future Date
        // await previousButton.click()     // for Past Date
    }

    const allDates:Locator[]=await page.locator('.ui-datepicker-calendar tbody tr td').all();
    for(const date of allDates){
        let day=await date.innerText();
        if(day===setDay){
            await date.click();
            break;
        }        
    }
    console.log("Input Date is: ", await page.locator('#datepicker').inputValue());
})