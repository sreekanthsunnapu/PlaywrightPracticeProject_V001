import {test, expect, Locator} from '@playwright/test'


// Locator is an interface, not a fixture

test("Comparing Methods", async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator('.product-title');    //this locator captures 6 elements/produts
   //here products represents a group of locators

    const productsCount=await products.count();

    //1. innerText() vs textContent() - Demo
    
    //console.log(await products.nth(1).innerText());  //innerText() extract the exact visible text
    //console.log(await products.nth(3).textContent());     // whereas textContent() extracts the text with special char ans spaces
    //we also have .first  .last methods beside nth()

    console.log("*****Comparing innerText() vs textContent()*****")

    console.log("***product names captured by innerText()***");
    //we can leverage the traditional for..loop

    for(let i=0;i<productsCount;i++){
        const productNameIT:string= await products.nth(i).innerText();
        console.log(productNameIT); //here we get plain-text that is as visible as on the webpage , eleminates whitespaces, line breaks, etc
        //innerText() = returns only string
    }
    console.log("***product names captured by textContent()***");
    for(let i=0;i<productsCount;i++){
        const productNameTC:string|null= await products.nth(i).textContent();
        console.log(productNameTC);   //we get text with whitwspaces,line breaks, hidden chars
        //whereas textContent() returns null or string
    }
    console.log("***product names captured by textContent() after TRIMMIG***");
    for(let i=0;i<productsCount;i++){
        const productNameTC:string|null= await products.nth(i).textContent();
         //we can use trim() to remove spaces,etc- but as it is a single element, use the below syntax
        console.log(productNameTC?.trim()); // the ? comes here in the syntax, because the textContent in productNameTC may either have string/null values,
        // so ? here represents an optional paramater like a regular expression, like it can be a stirng or null        
    }   

    //2. allInnerTexts() vs allTextContents() - Demo

    console.log("*****Comparing allInnerTexts() vs allTextContents()*****")
    const allProductNameAIT:string[]=await products.allInnerTexts();
    console.log("product names captured by allInnerTexts() ", allProductNameAIT)

    const allProductNameATC:string[]=await products.allTextContents();
    console.log("product names captured by allTextContents() ", allProductNameATC);

    const allProductNameATCTrimmed:string[]=allProductNameATC.map(product => product.trim());
    console.log("product names captured by allTextContents() After TRIM ", allProductNameATCTrimmed);
    
    //here we can also use the for..in loop, for..of loop, or simple for loop to iterate over the array elements

    //3. all() - Demo
    console.log("***product Locators captured by all()***");
    const productLocators:Locator[]=await products.all();
    //all() - converts a Locator type --->  Locator type of Array
    //When the locator points to a list of elements, this returns an array of locators, pointing to their respective elements.
    console.log("now we havean array with locators of products ", productLocators);
    /*
    Output:
    locator('.product-title').first(),
    locator('.product-title').nth(1),
    locator('.product-title').nth(2),
    locator('.product-title').nth(3),
    locator('.product-title').nth(4),
    locator('.product-title').nth(5)
    */
    //here instead of a traditional for loop, we can use all kinds of for loops: for..of(value), for..in(index)
    console.log("***product names captured by all() -- for..of loop***");
    //this is a direct approach - get the locator>then innerText
    for(const locator of productLocators){
        console.log(await locator.innerText());
    }

    console.log("***product names captured by all() -- for..in loop***");
    //but this is indirect approach - first get the locator>then index>then the innerText
    for(const locator in productLocators){
        console.log(await productLocators[locator].innerText())
    }   

})