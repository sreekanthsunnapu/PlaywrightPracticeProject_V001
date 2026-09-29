import{test, expect} from '@playwright/test';
import fs from 'fs';        //fs is File System Module - a built-in module in JS/TS 

//reading data from JSON file
//info: it is good practice to used test-data in .json format, as JS/TS have built-in support for json data
//if you gava data in excel format, then try to convert that into json format and use it inside the code

const jsonPath="test-data/data.json";
const data= fs.readFileSync(jsonPath, "utf-8")  //utf- unicode transformation format
const loginTestData:any=JSON.parse(data);        //type is any because, the data inside json file may be a single/multi-dim array with different types of data

for(const {email,password,validity} of loginTestData){
    test.describe("Login data driven test from JSON", async()=>{
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
    })
}





/** 
//below is a shortcut to access the data of every array of multi-dimentional array
test.describe("Login Data Driver Test", async()=>{
    for(const [email,password,validity] of loginTestData){
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
*/