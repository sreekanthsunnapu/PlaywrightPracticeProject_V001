import {test, expect, Locator} from '@playwright/test';


test("Static Web Table Assignment", async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table:Locator=page.locator("table[name='BookTable'] tbody");  //tabel locator
    const rows:Locator=table.locator("tr");
    const columns:Locator=table.locator('th');

    const rowCount=await rows.count();
    const columnCount=await columns.count();

    //read colun headers
    console.log("column headings", await columns.allInnerTexts());
    await expect(columns).toHaveText([ 'BookName', 'Author', 'Subject', 'Price' ]);

    //read data of a specific row
    console.log("read data of a specific row")
    console.log(await rows.first().locator('td').allInnerTexts());  //this is header row, no data in it
    console.log(await rows.nth(1).locator('td').allInnerTexts());
    console.log(await rows.last().locator('td').allInnerTexts());
        
    //read all the data using all(); 
    console.log("read all the data using all()")
    const allRowLocators:Locator[]=await rows.all();
    for(const row of allRowLocators.slice(1)){
       console.log(await row.locator('td').allInnerTexts());
    }

    //read all the data using traditional for loop
    console.log("read all the data using traditional for loop")
    for(let i=1;i<rowCount;i++){
        console.log(await rows.nth(i).locator('td').allInnerTexts())
    }

    //read data column wise
    console.log("\nColumn wise read Data\n")
    for(let j=0;j<columnCount;j++){
        for(let i=1;i<rowCount;i++){
            const rowCells:Locator=rows.nth(i).locator('td');
            // console.log(await rowCells.first().innerText());
            console.log(await rowCells.nth(j).innerText());    
        }
         console.log('\n');
    }

    //read data on a condition
    //let authorName:string='Animesh';
    let authorBookPrice:number=0;
    let totalBooksPrice:number=0;
    let authorBookList:string[]=[];
    for(const row of allRowLocators.slice(1)){
        const cells:string[]=await row.locator('td').allInnerTexts();
        const bookName=cells[0];
        const authorName=cells[1];
        let bookPrice=cells[3];
        totalBooksPrice+=Number(bookPrice);
        if(authorName==='Amit'){
            authorBookList.push(bookName);
            authorBookPrice+=parseInt(bookPrice);
        }
    }

    console.log(`Author wrote ${authorBookList.length} Books : `, authorBookList);
    console.log(`Author written books cost is:`,authorBookPrice);
    console.log(`Total books cost in the store: `,totalBooksPrice);
})