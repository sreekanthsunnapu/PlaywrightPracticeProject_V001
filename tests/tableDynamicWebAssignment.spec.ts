import {test, expect, Locator} from '@playwright/test'

test("Dynamic Web Table Assignment worked",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const config='CPU';
    let process='Chrome';
    const table=page.locator("//table[@id='taskTable']");
    const rowPath:Locator=table.locator(`//tr/td[contains(text(),'${process}')]`);
    // const rowPath:Locator=table.locator(`//tr`); [contains(text(),'${process}')]
    const columnPath:Locator=table.locator(`//th[contains(text(),'${config}')]`);

    //console.log("Column Data", await columnPath.textContent());

    // console.log("Row Data", await rowPath.innerText());

    const rowData:string=await rowPath.innerText();
    console.log(rowData);

    const columnHeader:string=await columnPath.innerText()
    console.log(columnHeader);

    const columnPosition:number=await columnPath.locator("./preceding-sibling::th").count()+1;

    const cellpath:Locator=rowPath.locator(`td[${columnPosition}]`);
    const cellValue=await cellpath.innerText();
    console.log("Chrome CPU Load", cellValue);
});