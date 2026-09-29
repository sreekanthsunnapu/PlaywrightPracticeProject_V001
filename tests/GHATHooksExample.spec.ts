import {test, Page, expect, Locator} from '@playwright/test'

/*
Open the Application  ---> beforeAll()

Login 
     > Find Products > 
Logout

Login 
    > Add to Cart >
Logout

Close the Application ---> afterAll()

*/
let page:Page;      //declaring page as a global variable, so that it can be used across the test

test.beforeAll("Open Application",async({browser})=>{
    page=await browser.newPage()
    await page.goto("https://demoblaze.com/index.html")
})

test.afterAll("Close the Application", async ()=>{
    await page.close()
})

test.beforeEach("Login to Application", async({})=>{

    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('admin');
    await page.locator('#loginpassword').fill('admin');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000)
})
test.afterEach("Logout from Applcation",async()=>{
    await page.getByRole('link', { name: 'Log out' }).click();
})

test("Find No.of Products",async()=>{
    // const products:Locator[]=await page.locator("#tbodyid .hrefch").all();
    const products=page.locator("#tbodyid .hrefch");
    const count=await products.count();
    console.log("Total No.of Products in Store",count);
    await expect(products).toHaveCount(9)
})

test("Add Products to Cart",async()=>{
    
    await page.getByRole("link",{name:"Samsung galaxy s6"}).click();

    //handle the alert before the click
    page.on('dialog', async(dialog)=>{
        console.log("dialog type: ",dialog.type())
        console.log("dialog message: ", dialog.message())
        expect(dialog.message()).toContain("Product added.")
        await dialog.accept();
    });
    await page.getByRole("link", {name:"Add to cart"}).click();

    await page.waitForTimeout(3000)
    
})
