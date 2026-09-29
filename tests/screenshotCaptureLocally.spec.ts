import {test} from '@playwright/test'


/* 
There are 2 ways to capture the screenshots, 
1. Locally (within the test), 
    here, screenshot is not attached with the html report

2. Globally(playwright.config.ts)
    screenshot: 'off' --> it wont take any screenshot - it is default
    screenshot: 'on' --> everytime you run the test, it takes the screenshot
    screenshot: 'on-first-failure' --> it is used for flaky test
    screenshot: 'only-on-failure' --> it takes screenshot only on failure (mostly this option is used)

    here, the screenshot is also attached in the html report
*/

test("screenshot demo", async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/")
    
    //this code takes the screenshot of the visible area on the browser
    //the screenshot is saved in screenshot folder in the project directory with name: homePage.png
    //if you run the same code multiple times, everytime it gets replaced
    await page.screenshot({path:'screenshots/homePage.png'})

    //if you want to keep track of previous screenshots as well, then lets add a timestamp to the filename
    const timestamp=Date.now();
    await page.screenshot({path:'screenshots/'+'homePage'+timestamp+'.png'});

    //to capture FUll-Page screenshot (top to bottom)
    await page.screenshot({path:'screenshots/'+'fullPage'+timestamp+'.png', fullPage:true})

    //to capture a specific locator / element screenshot
    const logo= page.getByAltText("Tricentis Demo Web Shop");
    // const logo=page.locator("img[alt='Tricentis Demo Web Shop']");
    await logo.screenshot({path:'screenshots/'+'ElementLogo'+timestamp+'.png'}) 
    // await page.getByAltText("Tricentis Demo Web Shop").screenshot({path:'screenshot/'+'ElementLogo'+timestamp+'.png'}) 

    //capture a specific section of the page, like featured products
    //just locate the area with locator and use same method
    const specificAreaFeaturedProducts=page.locator('.product-grid');
    await specificAreaFeaturedProducts.screenshot({path:'screenshots/'+'FeaturedElement'+timestamp+'.png'}) 
})