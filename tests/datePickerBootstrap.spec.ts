import {test, expect,Locator} from '@playwright/test'

//the locators on this page are not stable, so the code may fail sometimes
//will work on it later

test("Bootstrap Date Picker",async({page})=>{
    await page.goto("https://www.booking.com/");
    
    const selectDatesElement=page.getByTestId("searchbox-dates-container")
    await expect(selectDatesElement).toBeVisible()
    await selectDatesElement.click()

    // await expect(page.locator(`div[class='d7bd90e008'] h3`)).toBeVisible();
    await expect(page.locator('div.c37f87f9d2').locator('div').nth(0)).toBeVisible();
    // page.locator('div.c37f87f9d2').locator('div').nth(0)

    const checkInYear:string="2026"
    const checkInMonth:string="November"
    const checkInDate:string="14"

    const nextMonthButton=page.locator(`button[aria-label='Next month']`);

    let flag:boolean=true;
    while(flag){
        const checkInMonthYear=await page.locator('div.c37f87f9d2').locator('div').nth(0).innerText();
        const currentMonth=checkInMonthYear.split(' ')[0];
        const currentYear=checkInMonthYear.split(' ')[1];

        console.log("Current Month: ",currentMonth)
        console.log("Current Year: ",currentYear)

        if(currentMonth===checkInMonth && currentYear===checkInYear){
            break;
        }
        nextMonthButton.click();
        //flag=false;
    }
    const monthTable=page.locator('table.b8fcb0c66a');
    const checkInDays=await monthTable.first().locator('tbody tr td').all()

    let checkInDateSelected:Boolean=false;

    for(const day of checkInDays){
        let dateText=await day.innerText();
        if(dateText===checkInDate){
            await day.click();
            checkInDateSelected=true;
            break;
        }
    }
    expect(checkInDateSelected).toBeTruthy()
    
    //check-out Date Code
    const checkOutYear:string="2026"
    const checkOutMonth:string="October"
    const checkOutDate:string="10"

    //const nextMonthButton=page.locator(`button[aria-label='Next month']`);

    //let flag:boolean=true;
    while(true){
        const checkOutMonthYear=await page.locator('div.c37f87f9d2').locator('div').nth(0).innerText();
        const currentMonth=checkOutMonthYear.split(' ')[0];
        const currentYear=checkOutMonthYear.split(' ')[1];

        console.log("Current Month: ",currentMonth)
        console.log("Current Year: ",currentYear)

        if(currentMonth===checkOutMonth && currentYear===checkOutYear){
            break;
        }
        nextMonthButton.click();
        //flag=false;
    }
    //const monthTable=page.locator('table.b8fcb0c66a');
    const checkOutDays=await monthTable.first().locator('tbody tr td').all()
    
    let checkOutDateSelected:Boolean=false;

    for(const day of checkOutDays){
        let dateText=await day.innerText();
        if(dateText===checkOutDate){
            await day.click();
            checkOutDateSelected=true;
            break;
        }
    }
    expect(checkOutDateSelected).toBeTruthy();
    await page.waitForTimeout(3000)
})

test("Bootstrap Date Picker - Debug Test",async({page})=>{
    await page.goto("https://www.booking.com/");
    
    const selectDatesElement=page.getByTestId("searchbox-dates-container")
    await expect(selectDatesElement).toBeVisible()
    await selectDatesElement.click()

    const monthTable=await page.locator('table.b8fcb0c66a tbody').nth(0).locator('tr td').all();
    // const checkOutDays=await monthTable.nth(0).locator('tbody tr td').all()
    console.log(monthTable)
    
    for(const day of monthTable){
        let dateText=await day.innerText();
        console.log(dateText)
    }

})

