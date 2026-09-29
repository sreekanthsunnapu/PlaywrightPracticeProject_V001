/**
 * pre-requisite:
 * install csv-parse module to read data from csv files
 * CLI> npm install csv-parse
 * 
 * and import below modules:
 * import fs from 'fs'
 * import {parse} from 'csv-parse/sync
 */

import {test, expect} from '@playwright/test'
import fs from 'fs'
import {parse} from 'csv-parse/sync'

//reading data from csv file
const csvPath='test-data/userData.csv';
const fileContent=fs.readFileSync(csvPath, 'utf-8');

interface userData{
    email:string;
    password:string;
    validity:string;
}

const records=parse<userData>(fileContent,{columns:true, skip_empty_lines:true})

test.describe("Login data driven test from CSV", async()=>{
    for(const data of records){
        test(`Login Test for ${data.email} and ${data.password}`, async({page})=>{
                await page.goto("https://demowebshop.tricentis.com/");
                await page.getByRole('link',{name:'Log in'}).click();
                await page.getByRole('textbox', {name:/email/i}).fill(data.email);
                await page.locator("#Password").fill(data.password);
                await page.getByRole('button', {name:"Log in"}).click();
    
                //valid user  //Positive Testing
                if(data.validity.toLowerCase() ==='valid'){
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
