import {test, expect, Locator} from '@playwright/test'

test("Static Web Tables", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator=page.locator("table[name='BookTable'] tbody");  //table locator
    await expect(table).toBeVisible();

    //1) count the no.of rows in a table
    //const tableRows:Locator= page.locator("table[name='BookTable'] tbody tr");   //normal approach
    const tableRows:Locator=table.locator("tr");    //table row locator - this approach is called 'chaining of locators'
    await expect(tableRows).toHaveCount(7);  //one approach, assertion is on element, returns promise
    const tableRowCount= await tableRows.count();    //including the header row
    expect(tableRowCount).toBe(7)       //another approach, assertion is on value

    //2) count the no.of columns 
    //const columns:Locator=page.locator("table[name='BookTable'] tbody tr th"); //which returns all the columns
    const columns:Locator= tableRows.locator("th"); //instead of writng the complete css, we can reuse the existing locator and use chining locator concept
    await expect(columns).toHaveCount(4);   //we already know the column count, so just validating

    const columnCount:number=await columns.count();
    console.log("Number of columns/headers: ", columnCount);
    expect(columnCount).toBe(4);        //just another approach
    console.log(await columns.allInnerTexts())

    //3. Read all data from a specific row
    const secondRowCells:Locator= tableRows.nth(2).locator("td"); //now we have 2nd row cells locators avaible 
    const secondRowData:string[]=await secondRowCells.allInnerTexts();
    console.log("second row data ", secondRowData);     //[ 'Learn Java', 'Mukesh', 'Java', '500' ]

    await expect(secondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]); // we can keep the entire array in the assertion method
    
    //same action, using for...of loop
    for(let data of secondRowData){
        console.log(data);
    }

    // 4. print all the data from the table - this is also called as 'Web Scrapping'
    //one problem with this appraoch is that, when td in every row is not same, then this runs into getting empty data from missinf td cells
    console.log("**Complete Table Data**");
    for(let i=1;i<tableRowCount;i++){
        const allRowCells:Locator=tableRows.nth(i).locator('td'); //we have all rows locators here  
        //for(let j=0;j<await allRowCells.count();j++){
            console.log(await allRowCells.allInnerTexts())
        // }
    }

    //so the problem of getting td - cell from the unequal no.of rows data can be solved by the all() appraoch
    console.log("print all data using all()")
    console.log(await columns.allInnerTexts(),'\n')
    
    const allRowLocators:Locator[]=await tableRows.all();
    for(const row of allRowLocators.slice(1)){  //.slice(1) method here excludes the header row
       // console.log((await row.locator('td').allInnerTexts()));
        //instead of printing in an array format, print with a tab gap,- use join
        console.log((await row.locator('td').allInnerTexts()).join('\t'));

    }
    //5. print/read data column wise
    console.log("Print Data Column wise")
    for(let i=1;i<tableRowCount;i++){
        const allRowCells:Locator=tableRows.nth(i).locator('td'); //we have all rows locators here  
        //for(let j=0;j<await allRowCells.count();j++){
            console.log(await allRowCells.first().innerText())
        // }
    }
    const mukeshBooks:string[]=[];
    let totalPrice:number=0;
    //find out books written by Mukesh
    for(const row of allRowLocators.slice(1)){  //.slice(1) method here excludes the header row
       // console.log((await row.locator('td').allInnerTexts()));
        //instead of printing in an array format, print with a tab gap,- use join
        const cells:string[]=await row.locator('td').allInnerTexts();
        const authorName=cells[1];
        const bookName=cells[0];
        //const bookPrice=Number(cells[3]);
        const bookPrice=cells[3];
        if(authorName==='Mukesh'){
            console.log(`${authorName}  wrote the book ${bookName}`);
            mukeshBooks.push(bookName);
            //totalPrice+=bookPrice;        
            totalPrice+=parseInt(bookPrice);
        }
    }
    console.log("Number of Books written by Mukesh are", mukeshBooks.length);
    console.log("Price of the books written by Mukesh : ",totalPrice);
})