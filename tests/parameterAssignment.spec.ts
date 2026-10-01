import {test, expect} from '@playwright/test'
import * as XLSX from 'xlsx'

const excelFilePath='test-data/LoginDataForBlazedemo.xlsx';

const workbook=XLSX.readFile(excelFilePath);
const sheetNames=workbook.SheetNames[0];
const workSheet=workbook.Sheets[sheetNames];

const testData:any=XLSX.utils.sheet_to_json(workSheet);

for(const {username, password} of testData){
    test.describe("Login Test on Blazedemo", async()=>{
        test(`Login Test for ${username} and ${password}: `, async({page})=>{
          await page.goto("https://demoblaze.com/index.html");
          await page.getByRole("link",{name:'Log in'}).click();
          await page.locator("#loginusername").fill(username);
          await page.locator("#loginpassword").fill(password);

          let dialogMessage='';

          page.on('dialog', async (dialog)=>{
            dialogMessage=dialog.message();
            console.log(`Dialog Message: ${dialog.message()}`);
            await dialog.dismiss().catch(()=>{})
          })
          await page.getByRole('button',{name:'Log in'}).click();

          await page.waitForTimeout(3000);

          if(dialogMessage){      //here im trying to resolve the dialogMessage to true, with its content, if empty: false, else:true
            console.log("Login Failed... Invalid User")
          }
          else{
            await expect(page.getByRole("link",{name:'Log out'})).toBeVisible();
            await expect(page.locator("#nameofuser")).toBeVisible();
            console.log("Login Successful, Welcome!")
          }
      })
  })
}


/** 
 //This is to read data from CSV file
import {test, expect} from '@playwright/test'
import fs from 'fs'
import {parse} from 'csv-parse/sync'

const csvFilePath='test-data/LoginDataForBlazedemo.csv';
const fileContent=fs.readFileSync(csvFilePath,'utf-8');

interface LoginDataForBlazedemo{
  username:string;
  password:string;
}
const testData=parse<LoginDataForBlazedemo>(fileContent,{columns:true, skip_empty_lines:true});

for(const {username, password} of testData){
    test.describe("Login Test on Blazedemo", async()=>{
        test(`Login Test for ${username} and ${password}: `, async({page})=>{
          await page.goto("https://demoblaze.com/index.html");
          await page.getByRole("link",{name:'Log in'}).click();
          await page.locator("#loginusername").fill(username);
          await page.locator("#loginpassword").fill(password);

          let dialogMessage='';

          page.on('dialog', async (dialog)=>{
            dialogMessage=dialog.message();
            console.log(`Dialog Message: ${dialog.message()}`);
            await dialog.dismiss().catch(()=>{})
          })
          await page.getByRole('button',{name:'Log in'}).click();

          await page.waitForTimeout(3000);

          if(dialogMessage){      //here im trying to resolve the dialogMessage to true, with its content, if empty: false, else:true
            console.log("Login Failed... Invalid User")
          }
          else{
            await expect(page.getByRole("link",{name:'Log out'})).toBeVisible();
            await expect(page.locator("#nameofuser")).toBeVisible();
            console.log("Login Successful, Welcome!")
          }
      })
  })
}
*/

/**
 //This if to read data from JSON file 
import { test, expect } from '@playwright/test';
import fs from 'fs'

const jsonFilePath='test-data/LoginDataForBlazedemo.json'
const fileContent=fs.readFileSync(jsonFilePath, 'utf-8');
const testData=JSON.parse(fileContent);

for(const {username, password} of testData){
    test.describe("Login Test on Blazedemo", async()=>{
        test(`Login Test for ${username} and ${password}: `, async({page})=>{
          await page.goto("https://demoblaze.com/index.html");
          await page.getByRole("link",{name:'Log in'}).click();
          await page.locator("#loginusername").fill(username);
          await page.locator("#loginpassword").fill(password);

          let dialogMessage='';

          page.on('dialog', async (dialog)=>{
            dialogMessage=dialog.message();
            console.log(`Dialog Message: ${dialog.message()}`);
            await dialog.dismiss().catch(()=>{})
          })
          await page.getByRole('button',{name:'Log in'}).click();

          await page.waitForTimeout(3000);

          if(dialogMessage){      //here im trying to resolve the dialogMessage to true, with its content, if empty: false, else:true
            console.log("Login Failed... Invalid User")
          }
          else{
            await expect(page.getByRole("link",{name:'Log out'})).toBeVisible();
            await expect(page.locator("#nameofuser")).toBeVisible();
            console.log("Login Successful, Welcome!")
          }
      })
  })
}
*/


/**
import { test, expect } from '@playwright/test';

const testdata:string[][]=[
  ['admin','admin123'],
  ['admin','admin']
];

for(const [username, password] of testdata){
    test.describe("Login Test on Blazedemo", async()=>{
        test(`Login Test for ${username} and ${password}: `, async({page})=>{
          await page.goto("https://demoblaze.com/index.html");
          await page.getByRole("link",{name:'Log in'}).click();
          await page.locator("#loginusername").fill(username);
          await page.locator("#loginpassword").fill(password);

          let dialogMessage='';

          page.on('dialog', async (dialog)=>{
            dialogMessage=dialog.message();
            console.log(`Dialog Message: ${dialog.message()}`);
            await dialog.dismiss().catch(()=>{})
          })
          await page.getByRole('button',{name:'Log in'}).click();

          await page.waitForTimeout(2000);

          if(dialogMessage){      //here im trying to resolve the dialogMessage to true, with its content, if empty: false, else:true
            console.log("Login Failed... Invalid User")
          }
          else{
            await expect(page.getByRole("link",{name:'Log out'})).toBeVisible();
            await expect(page.locator("#nameofuser")).toBeVisible();
            console.log("Login Successful, Welcome!")
          }
      })
  })
}
*/

/**
import { test, expect } from '@playwright/test';

test("Login Test with out permission column", async({page})=>{
  await page.goto("https://demoblaze.com/index.html");
  await page.getByRole("link",{name:'Log in'}).click();
  await page.locator("#loginusername").fill("admin");
  await page.locator("#loginpassword").fill("admin123");

  let dialogMessage='';

  page.on('dialog', async (dialog)=>{
    dialogMessage=dialog.message();
    console.log(`Dialog Message: ${dialog.message()}`);
    await dialog.dismiss().catch(()=>{})
  })
  await page.getByRole('button',{name:'Log in'}).click();

  await page.waitForTimeout(2000);

  if(dialogMessage){      //here im trying to resolve the dialogMessage to true, with its content, if empty: false, else:true
    console.log("Login Failed... Invalid User")
  }
  else{
    await expect(page.getByRole("link",{name:'Log out'})).toBeVisible();
    await expect(page.locator("#nameofuser")).toBeVisible();
    console.log("Login Successful, Welcome!")
  }
})
*/

/**
import { test, expect } from '@playwright/test';

const testdata:string[][]=[
  ['admin','admin123','granted'],
  ['admin','admin','denied']
]; 

for(const [username, password, access] of testdata){

  test(`Login Test For ${username} and ${password}`, async ({ page }) => {
    await page.goto('https://demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);

    if(access.toLowerCase()==='granted'){
      await page.getByRole('button', { name: 'Log in' }).click();
      await expect(page.getByRole('link',{name:'Log out'})).toBeVisible();
      await expect(page.locator('#nameofuser')).toBeVisible();
      console.log("Login Successful")
    }
    else if(access.toLowerCase()==='denied'){
      page.on('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      if(dialog.message().includes('Wrong password.')) console.log("Invalid User -- Login Failed")
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000)

    }
    
  });

}
*/