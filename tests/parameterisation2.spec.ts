import {test, expect} from '@playwright/test'

const loginTestData:string[][]=[
    ["laura.taylor1234@example.com","test123","valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com","testxyz", "invalid"],
    ["", "", "invalid"],
];
/** 
 * //this is independent Test
test("Login Test", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole('link',{name:'Log in'}).click();
    await page.getByRole('textbox', {name:/email/i}).fill("laura.taylor1234@example.com");
    await page.locator("#Password").fill('test123');
    await page.getByRole('button', {name:"Log in"}).click();

    //valid login
    const logoutLink=page.getByRole('link',{name:'Log out'});
    await expect(logoutLink).toBeVisible({timeout:5000});
    
    //invalid user
    const errorMessage=page.locator(".validation-summary-errors span");
    await expect(errorMessage).toBeVisible({timeout:5000});

    await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
})
*/

//below is a shortcut to access the data of every array of multi-dimentional array
for(const [email,password,validity] of loginTestData){
    test.describe("Login Data Driven Test", async()=>{
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


