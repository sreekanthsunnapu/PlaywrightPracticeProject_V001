import {test, expect, Locator} from '@playwright/test'

test("Read all table Data from all Pages",async({page})=>{

    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    let hasMorePages=true;      //this we will use to check if they are more pages are exists or not
    
    //This code get all rows data from the first page  - Web Scrapping
    /*
    const allRows:Locator[]=await page.locator('#example tbody tr').all();
        for(let row of allRows){
            console.log(await row.innerText());
        }
    */
    while(hasMorePages){
        const allRows:Locator[]=await page.locator('#example tbody tr').all();
        console.log("***Printing a New Page Data")
        for(let row of allRows){
            console.log(await row.innerText());
        }
    
        await page.waitForTimeout(3000);

        //below are different locators to identify › next button 
        //await page.getByRole('link',{name:'Next'}).click();
        // page.locator("button[aria-label='Next']").click();
        // page.locator("button[aria-controls='example']:has-text('›')");  //symbol is zudo element, not ''greaterThan symbol'
        // page.getByText("›", {exact:true}).click();
        const nextButton:Locator=page.locator("button[aria-label='Next']");        
        const isDisabled=await nextButton.getAttribute('class');      //dt-paging-button disabled next
        
        if(isDisabled?.includes('disabled')) {      //if the value may have string|null then use ? symbol
            hasMorePages=false;
        } else{
            await nextButton.click();
        }

    }
})

test("Filter the rows and check the row count",async({page})=>{

    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");
    const dropDown:Locator=page.locator("#dt-length-0");
    
    await dropDown.selectOption({label:'25'});
    //dropDown.selectOption('25');      //we cam use this as well

    //Approach 1    : Locator[Array] ---> use .length
    const allRows1:Locator[]=await page.locator("#example tbody tr").all(); //array of Locators
    expect(allRows1).toHaveLength(25);
    expect(allRows1.length).toBe(25);        //This is another way
    console.log("allRows1 contains: ",allRows1)
    console.log("Number of rows in the table",allRows1.length);

    //Approach 2    : Locator  ---> use .count()
    const allRows2:Locator=page.locator("#example tbody tr");
    expect(allRows2).toHaveCount(25);
    console.log("allRows2 contains: ",allRows2)         //it now contains the locator reference
    console.log("No.of Rows in the table are: ", await allRows2.count());

    await page.waitForTimeout(3000)
});

test.only("Search for sepcific data in a table",async({page})=>{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    const searchBox:Locator=page.locator("#dt-search-0");
    //await page.locator("#dt-search-0").waitFor({state:'visible'});
    await expect(searchBox).toBeVisible();
    
    // const expectedText:string='Airi Satou';      //uncomment each to see the output
    // const expectedText:string='Krishna Kumar';
    const expectedText:string='Software Engineer';
    await searchBox.fill(expectedText);
    await page.waitForTimeout(3000);
    const allSearchRows:Locator[]=await page.locator("#example tbody tr").all();
    if(allSearchRows.length>=1){
        let macthFound:Boolean=false;
        for(let row of allSearchRows){
            const actualText=await row.innerText();
            // console.log("Text inside ActualText: ",actualText)
            if(actualText.includes(expectedText)){
                const searchResultRows:Locator[]=await page.locator("#example tbody tr").all();
                macthFound=true;
                console.log(`${searchResultRows.length} Matching Record(s) Found`);
                break;
            }else{
                console.log("Record Not Found!!")
            }
        }
        //expect(macthFound).toBe(true);    //both are same
        //expect(macthFound).toBeTruthy();    //we prefer this for boolean values
    }else{
        let searchResult=await page.locator('td.dt-empty').innerText();
        console.log(searchResult);
    }
})
//Assignments:1
//https://testautomationpractice.blogspot.com/
//Dynamic Table - work on it
//Pagination Table - 4 pages, read data from each page and check the checkbox in every row

//Assignment:2
//end-to-end test
// https://www.blazedemo.com/
//select Departure, Destination City>find Flights>Capture prices>find the lowest price flight
//>choose the flight>fill the booking details>purchase flight>assert Thank You Response