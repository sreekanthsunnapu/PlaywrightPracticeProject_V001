import {test, expect,Locator} from '@playwright/test'

test("Dynamic Web Table Demo", async ({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table:Locator=page.locator('table.table tbody');
    //const tableHeader:Locator=table.locator('thead th');
    //const tableBody:Locator=table.locator("tbody");
    await expect(table).toBeVisible();
    const tableRows:Locator=table.locator('tr');

    const rowCount=await tableRows.count();

    const allRowLocators:Locator[]=await tableRows.all();
    //Capture the Chrome CPU Load
    let testProcessName='Chrome';
    let cpuLoad='';
    for(const row of allRowLocators){
        const processName:string=await row.locator('td').first().innerText();
        if(processName===testProcessName){
            console.log(processName);
            //cpuLoad=await row.locator('td:has-Text("%")').innerText();        //or
            cpuLoad=await row.locator('td',{hasText:'%'}).innerText();
            console.log("Chrome CPU: ",cpuLoad);
            break;
        }
    }
    
    //step2: Compare the value witt value in yello label on webPage
    let yelloBoxText:string=await page.locator('#chrome-cpu').innerText();
    console.log("Chrome CPU load from the yellow box :", yelloBoxText);

    if(yelloBoxText.includes(cpuLoad)){         //includes() - is a string method
        console.log("Chrome CPU Load is Matching");
    }else
        console.log("Chrome CPU Load is Not Matching");

    expect(yelloBoxText).toContain(cpuLoad);    //here, toContain() - is the assertion method

    // Network Speed of Firefox process: 
    let networkSpeed='';
    let testProcessName2='Firefox';
    for(const row of allRowLocators){
        const processName=await row.locator('td').first().innerText();
        if(processName===testProcessName2){
            networkSpeed=await row.locator('td',{hasText:'Mbps'}).innerText();
            console.log("Network  Speed of Firefox process: ",networkSpeed);
            break;
        }
    }

})