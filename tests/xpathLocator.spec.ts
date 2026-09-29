import {test, expect,Locator} from '@playwright/test'

test("Xpath Locator Demo", async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');

    const logo:Locator=page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(logo).toBeVisible();   

    //xpath: contains()
    //for single or mutliple elements - we can use page.locator - which also returns the Locator
    const products:Locator=page.locator("//h2/a[contains(@href,'computer')]");
    console.log("Computer related products",await products.count());
    const productsCount:number=await products.count();
    expect(productsCount).toBeGreaterThan(2);

    //this line throws strict mode violation error, as there are 4 items in products and we are referring to a single item
    //console.log(await products.textContent());
    console.log("first product", await products.first().textContent() );
    console.log("last product", await products.last().textContent() );
    console.log("nth item", await products.nth(1).textContent());  //index starts from 0 (zero)

    //iterate using an Array
    let productNames:string[]=await products.allTextContents();
    console.log("Product Array Size: ",productNames.length)
    console.log("*Print the products list in array form* ", productNames);
    console.log("*Print the array items One by One*")
    for(let prod of productNames){
        console.log(prod);
    }

    //xpath: starts-with
    const buildingProducts:Locator= page.locator("//h2/a[starts-with(@href,'/build')]")
    const count:number=await buildingProducts.count();
    expect(count).toBeGreaterThan(0);

    //xpath:text()
    const registerLink:Locator=page.locator("//a[text()='Register']");
    await expect(registerLink).toBeVisible();

    //xpath: last() :example: //div[@class='column follow-us']//li[last()]
    const lastItem:Locator=page.locator("//div[@class='column follow-us']//li[last()]")
    expect(lastItem).toBeVisible();
    console.log("Last item in the followers is: ", await lastItem.textContent());

    //xpath: position: example: //div[@class='column follow-us']//li[position()=5] 
    const positionItem:Locator=page.locator("//div[@class='column follow-us']//li[position()=3]");
    expect(positionItem).toBeVisible();
    console.log("text content of position item",await positionItem.textContent());

    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    let dynamicElementStartStop:Locator=page.locator("//button[@name='start' or @name='stop']");
    // let dynamicElementStartStop:Locator=page.locator("//button[starts-with(@name,'st')]");
    // let dynamicElementStartStop:Locator=page.locator("//button[contains(@name,'st')]");
    // let dynamicElementStartStop:Locator=page.locator("//button[text()='START' or text()='STOP']");
    // alternate xpaths: uncomment to see the effect
    
    //same can be done with playwright specific locator
    await page.getByRole('button',{name:/START|STOP/}).click();

    await dynamicElementStartStop.click();
    let dynamicElementContent1=await dynamicElementStartStop.textContent();
    console.log("Dynamic Element Content : ", dynamicElementContent1);

    await dynamicElementStartStop.click();
    let dynamicElementContent2=await dynamicElementStartStop.textContent();
    console.log("Dynamic Element Content : ", dynamicElementContent2);
    await dynamicElementStartStop.click();
    await page.waitForTimeout(2000);
   

});