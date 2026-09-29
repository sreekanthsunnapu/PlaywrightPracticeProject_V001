import { test, expect, Locator} from '@playwright/test';

/*
Locator - identifies the element on the page with built-in auto-wait and retry-ability
DOM - Document Object Model
DOM is an API provided by the Browser, the browser created this DOM when the page is loaded

1) page.getByAltText()  -- to locate an element, usually an image, by its alternative text (alt attribute)
2) page.getByText() -- to locate an element by Text (usually, non-interactive elements)
3) page.getByRole() -- to locate by explicit and implicit ARIA Roles, accessibility attributes (role is not an attibute for some element, role is defined based on the element type)
4) page.getByLabel() -- to locate a form control by associated label's text
5) page.getByPlaceholder() -- to locate an input by placeholder
6) page.getByTitle() -- to locate an element by its title attribute
7) page.ByTestId() --    to locate an element based on its data-testid attribute
*/


test("Built-in Locators",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
    
    //getByAltText()  -- for images
    const imageLocator:Locator= page.getByAltText('logo image');
    await expect(imageLocator).toBeVisible();

    //getByText()  - for non-interactive elements
    await expect(page.getByText('For Selenium, Cypress & Playwright')).toBeVisible();
    await expect(page.getByText('Cypress & Playwright')).toBeVisible();
    await expect(page.getByText('For Selenium, Cypress & Playwright',{exact:false})).toBeVisible();
    await expect(page.getByText(/For SELENIUM,\s+Cypress\s+&\s+Playwright/i)).toBeVisible();
    await expect(page.getByText(/Cypress\s+&+\sPlaywright/i)).toBeVisible();

    await expect(page.getByText('Another paragraph with colored text for demonstration.')).toBeVisible();
    console.log("trying to print getByText Value: ",await page.getByText('Another paragraph with colored text for demonstration.').textContent());
    
    page.getByText('Submit Form').click();
    //getByRole()
    await expect(page.getByRole('button',{name:'Primary Action'})).toBeVisible();
    await expect(page.getByRole('button',{name:/primary action/i})).toBeVisible();
    await page.getByText('Primary Action', {exact:true}).click();

    const toggleButtonText=await page.getByRole('button',{name:'Toggle Button'}).textContent();
    console.log(toggleButtonText);

    await expect(page.getByRole('button',{name:'Div with button role'})).toBeVisible();

    await expect(page.getByRole('heading',{name:'Form Elements'})).toBeVisible();

    await page.getByRole('textbox',{name:'Username'}).fill('Sreekanth');
    const acceptTerms:Locator=page.getByRole('checkbox',{name:'Accept terms'});
    await acceptTerms.check();
    expect(acceptTerms.isChecked).toBeTruthy();
    await acceptTerms.uncheck();
    expect(acceptTerms.isChecked).toBeTruthy();


    await page.getByRole('menuitem',{name:'Home'}).click();
    let menuitem=await page.getByRole('menuitem',{name:'Products'}).textContent();
    console.log(menuitem);
    await page.getByRole('menuitem',{name:'Contact'}).click();

    const alertLocator:Locator=page.getByRole('alert',{name:/important alert message/});
    // let alertText=alertLocator.textContent();
   // await expect(alertLocator.textContent().toContain('important alert'));
    // expect(alertText);

    //getByLabel()
    await page.getByLabel('Email Address:').fill('testemail@gmail.com');
    await page.getByLabel('Password:').fill('secret password');
    await page.waitForTimeout(4000);
    await page.getByLabel('Email Address:').clear();
    await page.waitForTimeout(10000);
    await page.getByLabel('Your Age:').fill('28');
    await page.waitForTimeout(4000);
    await page.getByLabel(' Express').check();
    //await page.getByRole('radio',{name:'shipping'}).check();
    await page.waitForTimeout(4000);

    //getByPlaceholder()
    await page.getByPlaceholder('Enter your full name').fill('Sreekanth Sunnapu');
    await page.getByPlaceholder('Phone number (xxx-xxx-xxxx)').fill('1234567890');
    await page.getByPlaceholder('Type your message here...').fill('using palceholder attribute to fill the data in this textbox');
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Search products...').fill('mobile phone');
    await page.getByRole('button',{name:'Search'}).click();

    //getByTitle()
    page.getByTitle('Home page link').click();
    const link:Locator =page.getByTitle('HyperText Markup Language');
    await expect(link).toHaveText('HTM');
    await expect(page.getByTitle('Tooltip text')).toHaveText('tooltip');
    await page.getByTitle('Click to save your changes').click();

    //getByTeatId()
    await expect(page.getByTestId('user-profile-card')).toBeVisible();
    await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
    await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
    await expect(page.getByTestId('edit-profile-btn')).toHaveText('Edit Profile');

    console.log(await page.locator(".grid[data-testid='product-grid']>[data-testid='product-card-1']").textContent());
    //console.log(await page.locator(".grid[data-testid='product-grid']").allTextContents());
    const products=await page.locator(".grid[data-testid='product-grid']").allTextContents();

    for(const product of products){
        console.log(product);
    }
});

/*
//alt is an attribute of an element like img
test("Verify getByAltText Locator",async ({page})=>{
    // await page.goto('http://demo.nopcommerce.com/');
//    page.waitForTimeout(5000);
    //getByAltText()
    // await expect(page.getByAltText('nopCommerce demo store')).toBeVisible();

    // const welcomeTextLocator:Locator=page.getByText('Welcome to our store');
    // let welcomeText=await welcomeTextLocator.textContent();
    // await expect(welcomeText).toContainEqual(/welcome to our store/i);
    // await expect(page.getByText('Welcome to our store')).toBeVisible();
    
    //getByText()
   // await expect(page.getByText('Welcome to our store')).toBeVisible();

    //getByRole()
    // await page.getByRole('link',{name:'Register'}).click();
    // await expect(page.getByRole('heading',{name:'Register'})).toBeVisible();
    // await page.getByRole('radio',{name:'male'}).check();

    //getByLabel()
    // await page.getByLabel('First name:').fill('sreekanth');
    // await page.getByLabel('Last name:').fill('Sunnapu');
    // await page.getByRole('textbox',{name:'Email'}).fill('1234@gmail.com');


});
*/
// test("Verify getByText Locator",({page})=>{
//     page.goto('https://demo.nopcommerce.com/');
// });

