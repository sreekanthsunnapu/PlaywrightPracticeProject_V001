/**
 * pre-requisite:
 * install xlsx library to read data from excel files
 * CLI> npm install xlsx
 * 
 * and import below modules:
 * import fs from 'fs'
 * import * as xlsx from 'xlsx' 
 */

//info: it is good practice to used test-data in .json format, as JS/TS have built-in support for json data
//if you gava data in excel format, then try to convert that into json format and use it inside the code
// npm install xlsx

import {test, expect} from '@playwright/test'
import fs from 'fs'
import * as XLSX from 'xlsx' 


//loaded excel file
//file-->workbook-->sheet-->rows  & columns
const excelPath='test-data/userLoginData.xlsx';

const workbook=XLSX.readFile(excelPath);        //this returns a workbook of the excel file
const sheetNames=workbook.SheetNames[0];            //this returns all the sheet names from the sheets
const workSheet=workbook.Sheets[sheetNames];    //this returns the exact worksheet

//just to see which sheet it is reading - Sheet1
console.log("Sheet Names: ",sheetNames)

//convert worksheet into JSON
const loginData:any=XLSX.utils.sheet_to_json(workSheet)

console.log(loginData)

//we can also convert excel into various formats, XLSX.utils.sheet_to_csv, etc

test.describe("Login data driven test Excel to converted-JSON", async()=>{
    for(const {email, password, validity} of loginData){
        test(`Login Test for ${email} and ${password}`, async({page})=>{
                await page.goto("https://demowebshop.tricentis.com/");
                await page.getByRole('link',{name:'Log in'}).click();
                await page.getByRole('textbox', {name:/email/i}).fill(email);
                await page.locator("#Password").fill(password);
                await page.getByRole('button', {name:"Log in"}).click();
    
                //valid user  //Positive Testing
                if(validity.toLowerCase() ==='valid'){
                    const logoutLink=page.getByRole('link',{name:'Log out'});
                    await expect(logoutLink).toBeVisible({timeout:5000});
                    console.log("Login Successful")
                }
                //invalid user     //Nagative Testing
                else{
                    //assert that error text is visible
    
                    const errorMessage=page.locator(".validation-summary-errors span");
                    await expect(errorMessage).toBeVisible({timeout:5000});
                    
                    //assert that user is still on the login page
                    await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
                    console.log("Login Unsuccessful")
                }
        })
}
})
