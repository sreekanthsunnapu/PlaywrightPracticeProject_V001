import {test, expect, Locator} from '@playwright/test'

//use the below block of code to maximize the browser, for this specific test /project only
//this wont change the configuration globally for all the tests/project
//if you want to change it globally, goto-->playwright.config.ts-->add the same code under 'export default defineConfig({'
test.use({
viewport:{width:1920, height:1080},
launchOptions:{
    args:['--start-maximzed']
}
});

test("pagination Tables",async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    const table:Locator=page.locator('#productTable tbody');
    // const tableRows:Locator[]=await table.locator('tr').all();

    console.log("** Printing Table Data **")
    // for(let row of tableRows){
    //     console.log(await row.innerText());
    // }
    const pageIndex=page.locator("#pagination li a");
    let pageCount=await pageIndex.count()

    for(let p=0;p<pageCount;){

        const tableRows:Locator[]=await table.locator('tr').all();
        const rowsInPage=tableRows.length;
        expect(rowsInPage).toBe(5);
        expect(tableRows).toHaveLength(5)
        for(let row of tableRows){
        console.log(await row.innerText());
        row.locator('td input').click();
        await page.waitForTimeout(500)
        }
        p++;
        if(p===pageCount){
            break;
        }
        pageIndex.nth(p).click();
        await page.waitForTimeout(3000)
    }
})

test("Flight Ticket Booking", async({page})=>{
    await page.goto('https://www.blazedemo.com/')

    await expect(page.getByRole('heading', {name:/Welcome to the Simple Travel Agency/i})).toBeVisible();
    await page.locator(`select[name='fromPort']`).waitFor({state:'visible'})
    await page.locator(`select[name='fromPort']`).selectOption({value:'Paris'});

    await expect(page.locator(`select[name='toPort']`)).toBeVisible();
    await page.locator(`select[name='toPort']`).selectOption({value:'London'});

    await page.getByRole('button',{name:/find flights/i}).click();

    // await page.getByRole('heading', {name:/Flights from Paris to Berlin/i}).waitFor({state:'visible'})

    const flightsList:Locator[]=await page.locator('.table tbody tr').all();

    // await page.locator('.table tbody tr td input').first().click();
    // await page.waitForTimeout(5000)

    console.log("**Available Flights**");
    let flightFare:string[]=[];
    let numericSortedFlightFares:number[]=[];
  
    for(let flight of flightsList){
        console.log(await flight.innerText());
        let fare=await flight.locator('td').last().innerText();
        flightFare.push(fare);
    }
//    console.log("Fare Range:", flightFare);


    for(let flight of flightsList){
        const flightInfo:string[]=(await flight.locator('td').allInnerTexts()).map(price=>price.replace(/[$,]/g,""));
        console.log("Flight Information: ",flightInfo)
    }

    //Approach-2 : Sort
    const sortedFares2=[...flightFare].sort((a,b)=>{
        const priceA=parseFloat(a.replace(/[$,]/g,""));
        const priceB=parseFloat(b.replace(/[$,]/g,""))
        return priceA-priceB;
    })
    console.log("sorted fares2: ",sortedFares2);
    // const numericFares=[...flightFare].map(fare=>parseFloat(fare.replace(/[$,]/g,"")))  //g:global-flag, replaces all matches 
    // const sortedFares3=[...numericFares].sort((a,b)=>a-b);
    // console.log("sortedFares3: ",sortedFares3)
    const minimumFare=sortedFares2[0];

    for(let flight of flightsList){
        const text=flight.locator('td').last();
        // console.log("Textttt", text);
        if((await text.innerText()).includes(minimumFare)){
            flight.locator('td input').click();
        }
    }
    /* Sorting Mapping Approaches*/
    //Approach-1 : Sort : Not Recommanded
    let fares:number[]=[];
    for(let fare of flightFare){
        let newFare=parseFloat(fare.slice(1,7));
        fares.push(newFare);
    }
    console.log(fares);
    const sortedFares1=[...fares].sort((a,b)=>{return a-b});    //[...fares] creates a copy, so that original array is not mutated
    console.log("sorted fares1: ",sortedFares1);
    
    // //Approach-2 : Sort
    // const sortedFares2=[...flightFare].sort((a,b)=>{
    //     const priceA=parseFloat(a.replace(/[$,]/g,""));
    //     const priceB=parseFloat(b.replace(/[$,]/g,""))
    //     return priceA-priceB;
    // })
    // console.log("sorted fares2: ",sortedFares2);

    //Approach-3 : Map
    // const numericFares=[...flightFare].map(fare=>parseFloat(fare.replace(/[$,]/g,"")))  //g:global-flag, replaces all matches 
    // const sortedFares3=[...numericFares].sort((a,b)=>a-b);
    // console.log("sortedFares3: ",sortedFares3)
})

test.only(" blazedemo Flight Ticket Booking", async({page})=>{
    await page.goto('https://www.blazedemo.com/')

    await expect(page.getByRole('heading', {name:/Welcome to the Simple Travel Agency/i})).toBeVisible();
    await page.locator(`select[name='fromPort']`).waitFor({state:'visible'})
    await page.locator(`select[name='fromPort']`).selectOption({value:'Paris'});

    await expect(page.locator(`select[name='toPort']`)).toBeVisible();
    await page.locator(`select[name='toPort']`).selectOption({value:'London'});

    await page.getByRole('button',{name:/find flights/i}).click();

    const availableFlights:Locator[]=await page.locator('.table tbody tr').all();
    
    //Flight Fares
    let flightFares:string[]=[]
    for(let flight of availableFlights){
        console.log(await flight.innerText());
        let fare=await flight.locator('td').last().innerText();
        flightFares.push(fare);
    }
    console.log("Flight Fares: ",flightFares)

    //Sorting the Flight Fares
    let sortedFlightFares=[...flightFares].sort((a,b)=>{
        const priceA=parseFloat(a.replace(/[$,]/g,""));
        const priceB=parseFloat(b.replace(/[$,]/g,""));
        return priceA-priceB;
    })
    console.log("sorted fares", sortedFlightFares)
    const minimumFare=sortedFlightFares[0];

    //Choose the mnimum fare flight
    for(let flight of availableFlights){
        const flightInfo=await flight.locator('td').allInnerTexts();
        if(flightInfo.includes(minimumFare)){
            console.log("Yes, This flightInfo have given fare")
            await flight.locator('td input').click();
        }
    }
    await page.waitForTimeout(3000)     // timeout for just to see the minimum fare flight selection

    //Fill tha Passenger Details
    await page.getByPlaceholder("First Last").fill('Sreekanth Sunnnapu')
    await page.getByLabel("Address").fill("123 main Street")
    await page.getByPlaceholder("Anytown").fill('Hyderabad')
    await page.getByRole('textbox',{name:/state/i}).fill("Telangana")
    await page.getByLabel('Zip Code').fill('500001')

    await page.locator('#cardType').selectOption({value:'visa'})
    await page.getByRole('textbox',{name:/Credit Card Number/i}).fill("1234567890123456")
    await page.getByRole('textbox',{name:'Month'}).clear();
    await page.getByRole('textbox',{name:'Month'}).fill('09');

    await page.getByRole('button', {name:'Purchase Flight'}).click();

    await expect(page.getByRole('heading', {name:'Thank you for your purchase today!'})).toBeVisible();

    console.log("Flight Purchase Completed!!! Happy Journey")

    await page.waitForTimeout(5000)



})