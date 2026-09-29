import {test, expect} from '@playwright/test'
import { escape } from 'node:querystring';

//Take some notes from https://playwright.dev/docs/actionability'
test("Hard Assertions",async({page})=>{
    
    await page.goto('https://demowebshop.tricentis.com/')

    //Hard Assertions : if any assertions fail, the test gets terminated
    //use hard assertions when single assertion is there in the test
    await expect(page).toHaveTitle("Demo Web Shop");
    // await expect(page).toHaveTitle("Wrong Title Demo Web Shop");        //here this failure stops the execution
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    
    await expect(page.getByAltText("Tricentis Demo Web Shop")).toBeVisible();       

    await page.waitForTimeout(3000)

})

test("Soft Assertions",async({page})=>{
    
    await page.goto('https://demowebshop.tricentis.com/')

    //Soft Assertions : if any assertions fail, the rest of the code will be executed
    //always prefer soft -assertions when multiple assertions are involved in the test
    await expect.soft(page).toHaveTitle("Demo Web Shop");
    
    await expect.soft(page).toHaveTitle("Wrong Title Demo Web Shop");        
    //here this failure wont terminate the test, continue to executes the rest of the code
    // but marks the test as failed
    
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");
    
    await expect.soft(page.getByAltText("Tricentis Demo Web Shop")).toBeVisible();       

    await page.waitForTimeout(3000)

})

test("Soft & Slow Assertions with expect.configure",async({page})=>{
    
    //This is just another syntax for the same soft assertion
    const softAssert=expect.configure({soft:true}); //usage of this calls soft assert

    //slow assertions are nothing but adding more timeout at the expect level
    const slowAssert=expect.configure({timeout:10_000}); 

    await page.goto('https://demowebshop.tricentis.com/')

    //Soft Assertions : if any assertions fail, the rest of the code will be executed
    //always prefer soft -assertions when multiple assertions are involved in the test
    await softAssert(page).toHaveTitle("Demo Web Shop");
   
    await softAssert(page).toHaveTitle("Wrong Title Demo Web Shop");        
    //here this failure wont terminate the test, continue to executes the rest of the code
    // but marks the test as failed
    
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");
    
    await slowAssert(page.getByAltText("Tricentis Demo Web Shop")).toBeVisible();       

    await page.waitForTimeout(3000)

})

test.only("expect.poll, expect.toPass",async({page})=>{

    //before running this test, goto---> cmd prompt> cd C:\Postman Practice\api >json-server Students.json 
   // our testing API is up and running, now send the HTTPRequest
    await expect.poll(async()=>{
        const response=await page.request.get("http://localhost:3000/students");
        console.log("API Response Code: ", response)
        return response.status();

    }).toBe(200);           //IIFC

    //expect.poll with Soft Assertions
    // You can combine expect.soft with expect.poll to perform soft assertions in polling logic. 
    // This allows the test to continue even if the assertion inside poll fails.
    const softAssert=expect.configure({soft:true})
    await softAssert.poll(async()=>{
        const response= await page.request.get("http://localhost:3000/students")    //this is HTTP
        return response.status()
    }).toBe(200);

    //another syntax to use soft assert
    await expect.soft.poll(async()=>{
        const response=await page.request.get("http://localhost:3000/students")
        return response.status()
    }).toBe(200);

    //You can retry blocks of code until they are passing successfully.
    await expect(async ()=>{
        const response=await page.request.get("http://localhost:3000/students");
        expect(response.status()).toBe(200);
    }).toPass();
})
