import { test, expect, Locator, selectors } from "@playwright/test"

test("Single Select Dropdown Demo", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //these are static dropdowns - (other type are dynamic dropdowns or auto-suggest dynamic dropdowns)
    //we also have bootstrap dropdowns - which do not have the select tag associated, hence cannot leverage the selectOption() method - will work on it

    //there are many approaches to select an option from the dropdown(typically 4 ways)
    //when working with the multiple/group of elements, prefer css or xpath over playwright locators
    await page.locator("#country").selectOption('India');  //by using the visible text

    await page.locator('#country').selectOption({ value: 'usa' });    //by using value attribute, if value is present with the tag

    await page.locator('#country').selectOption({ label: 'Canada' });  //by using label -similar to visibleText

    await page.locator('#country').selectOption({ index: 3 }); //by using the index- starts from 0

    //validations on dropdowns
    //2. check no.of options in the dropdown
    const dropdownOptions: Locator = page.locator('#country>option');  //this css returns all options
    await expect(dropdownOptions).toHaveCount(10);  // here you know the no.of options upfront from the DOM Structure

    //3.check for a specific option in the dropdown
    const countryOptions: string[] = await dropdownOptions.allTextContents();
    console.log("Country Names as it is: ", countryOptions);    // we get all the contents including \n, spaces, special chars. so trim them
    const countryNames: string[] = countryOptions.map(option => option.trim());
    console.log("Country names after applying trim: ", countryNames);  //this contains only country names

    //same can be written in a single line.
    const allCountryOptions: string[] = (await dropdownOptions.allTextContents()).map(countryOption => countryOption.trim());
    console.log("Country names after trim: ", allCountryOptions);

    //now put a validation/assertion
    expect(allCountryOptions).toContain('India'); //check if the array contains the given option

    //4. Printing options from the dropdown using a for...of loop
    for (const countryOpt of allCountryOptions) {
        console.log(countryOpt);
    }
})

test("mutliSelect Dropdown Demo", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //1.here also there are 4 different approaches 
    await page.locator("#colors").selectOption(['Red', 'Blue', 'Yellow']);  //select by visible text //multiple options in an array form

    await page.locator('#colors').selectOption([{ value: 'red' }, { value: 'blue' }, { value: 'yellow' }]); // select by value - only if value attrib is available
    await page.locator('#colors').selectOption(['red', 'blue', 'yellow']);  //both are same. 

    await page.locator('#colors').selectOption([{ label: 'Red' }, { label: 'Green' }, { label: 'White' }]); //select by Label - similar to selectByText

    await page.locator('#colors').selectOption([{ index: 1 }, { index: 3 }, { index: 5 }]); //selectByIndex

    //2. check the no.of options
    const dropdownColorOptions: Locator = page.locator('#colors');
    expect(dropdownColorOptions).toHaveCount(7);

    //3. check if a specific color-option is available in the dropdown - apply map only if array return content with special chars
    const colors: string[] = (await page.locator('#colors').allTextContents()).map(color => color.trim());
    expect(colors).toContain('White');

    //4. Print the options
    for (const color of colors) {
        console.log(color);
    }
})

test("Verify for Sorted Dropdown", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //Animals Dropdown----> (Already Sorted on the Website)
    const animalsDropdown: Locator = page.locator("#animals>option");
    // const animalNames:string[]=(await animalsDropdown.allTextContents());
    const animalNames: string[] = (await animalsDropdown.allTextContents()).map(animal => animal.trim());
    console.log("Animals List after Trim", animalNames);

    const originalAnimalList = animalNames;
    const sortedAnimalList = animalNames.sort();

    console.log("Original Animal List: ", originalAnimalList);   //both are Same 
    console.log("Sorted Animal List", sortedAnimalList);         //both are Same


    //Colors Dropdown----> (unsorted list on the website)
    const colorsDropdown: Locator = page.locator("#colors>option");
    // const animalNames:string[]=(await colorsDropdown.allTextContents());
    const colorNames: string[] = (await colorsDropdown.allTextContents()).map(color => color.trim());
    console.log("Colors List after Trim", colorNames);

    //---->uncomment to see the difference
    // const originalColorList=colorNames;
    // const sortedColorList=colorNames.sort();        

    // console.log("Original Color List: ",originalColorList);     //both are same
    // console.log("Sorted Color List",sortedColorList);           //but both should be different as the colors list on the website is unsorted
    //Because here the sort() method is Mutable, so if we work on sorted array, the original array also gets impacted and it also get sorted 
    // to avoid this problem, use JavaScript Spread Operator (...), which is used to clone the array

    //Use of Spread Operator(...)
    const newOriginalColorList = [...colorNames];
    const newSortedColorList = [...colorNames].sort();

    //check the difference between the both
    console.log(" New Original List with use of Spread Operator ", newOriginalColorList);
    console.log(" New Sorted List with use of Spread Operator ", newSortedColorList);

    console.log("Check the Actual Colors List", colorNames)
    // expect(originalAnimalList).toEqual(sortedAnimalList);   //this assertion should fail - uncomment to see the effect
    expect(originalAnimalList).toEqual(sortedAnimalList);       //because both are sorted
    expect(newOriginalColorList).not.toEqual(newSortedColorList);//because both are different
})

test("Verify Duplicates in Dropdown", async ({ page }) => {
    //let us verify if the dropdowns have duplicate elements are not-
    //lets take colors list, as it contains duplicates
    await page.goto("https://testautomationpractice.blogspot.com/");

    const optionDropdown: Locator = page.locator("#colors>option");
    const optionNames: string[] = (await optionDropdown.allTextContents()).map(option => option.trim());

    //  Array - allows duplicates in array
    //  Tupple - allows duplicates
    //  Set - do not allow duplicates ---> so we can use the Set {}

    const mySet = new Set<string>();  //Set- duplicates not Allowed; //you can store any type of data, you can also specify the type of data explicitly that you want to store
    const duplicatesArray: string[] = [];  //Arrasy - Duplicates Allowes; //an empty array

    for (const option of optionNames) {
        //chech of the Set contain the option, if yes add element to the array, else add it to Set
        if (mySet.has(option)) {
            duplicatesArray.push(option);
        } else {
            mySet.add(option);
        }

    }
    //let us leverage the object literals concept here
    console.log(`Array- Contains ${duplicatesArray.length} Duplicate items: ", ${duplicatesArray}`);
    // const noDuplicates=[...mySet];
    const noDuplicates = Array.from(mySet);  //use any, both has same effect
    console.log(`Set - Contains: ${mySet.size} items, No  duplicates: ", ${noDuplicates} `);

    //let us keep it in assertion form, because, in testing assertions are important, not printing on console
    // expect(duplicatesArray.length).toBe(0); //fails if there are duplicates, so comment it accordingly
    expect(duplicatesArray.length).not.toBe(0);

    //same can be achieved with conditional statements
    if (duplicatesArray.length > 0) {
        console.log("Duplicate options found :", duplicatesArray);
    } else console.log("No Duplicate items found");

});

test.only("Assignment - www.bstackdemo.com", async ({ page }) => {
     await page.goto('https://www.bstackdemo.com/');
 
    // await expect(page.locator("//span[contains(text(),'OnePlus')]")).toBeVisible();
    // await page.locator("//span[contains(text(),'OnePlus')]").click();
     await expect(page.locator('.sort')).toBeVisible();
     await expect(page.locator('.sort')).toBeEnabled();
 
     await page.locator('.sort>select').selectOption('Lowest to highest');
     // const productNames:string[]=(await page.locator('.shelf-item>.shelf-item__title').allTextContents()).map(title=>title.trim());
     const productNames:string[]=(await page.locator('.shelf-container>.shelf-item>.shelf-item__title').allTextContents()).map(title=>title.trim());
     console.log("Product Names: ",productNames);
 
     const productPrices=(await page.locator('.shelf-container>.shelf-item>.shelf-item__price>.val>b').allTextContents());//.map(price=>price.trim());
     console.log("Product Prices: ",productPrices);
 
     expect(productNames.length).toEqual(productPrices.length);
 
 /*   
    //this is to work off-line without the web 
    let productNames: string[] = ['iPhone 12', 'iPhone 12 Mini',
        'iPhone 12 Pro Max', 'iPhone 12 Pro',
        'iPhone 11', 'iPhone 11 Pro',
        'iPhone XS', 'iPhone XR',
        'iPhone XS Max', 'Galaxy S20',
        'Galaxy S20+', 'Galaxy S20 Ultra',
        'Galaxy S10', 'Galaxy S9',
        'Galaxy Note 20', 'Galaxy Note 20 Ultra',
        'Pixel 4', 'Pixel 3',
        'Pixel 2', 'One Plus 8',
        'One Plus 8T', 'One Plus 8 Pro',
        'One Plus 7T', 'One Plus 7',
        'One Plus 6T'
    ];

    let productPrices: string[] = [
  '799', '699', '1099', '999',
  '599', '699', '549',  '499',
  '649', '999', '1199', '1399',
  '899', '699', '999',  '1299',
  '899', '599', '399',  '799',
  '899', '899', '599',  '499',
  '429'
];
    //  console.log(productNames);
    //  console.log(productPrices);
*/

 
    //print product and its price on the console
    console.log("Printing Products Detaisl using simple for loop");
    for (let i = 0; i < productNames.length; i++) {
        console.log(`${productNames[i]}: ${productPrices[i]}`);
    }


    //using forEach
    console.log("Using Array.forEach(callbackfn: (value: string, index: number))");
    productNames.forEach((name, i) => {
        console.log(`${name}: ${productPrices[i]}`);
    });

    //Map both the Arrays into an Object
    const products = productNames.map((name, i) => ({
        name,
        price: productPrices[i]
    }))

    console.log("Products : Name & Price (Unsorted)", products);

    /*
    //this is how compare function internally works, this shows the implementation,
    // later see the shortcuts using built-in arrow functions
    function compareBy(propertyName:any){
        return function(a:any,b:any){
            let x=a[propertyName],      //this is a computed property,where property name evalutes at runtime dynamically
                y=b[propertyName];
            if(x>y) return 1;
            else if(x<y) return -1;
            else return 0;
        };
    }
    let sortedNames=products.sort(compareBy('name'));
    console.log(sortedNames);

    let sortedPrices=products.sort(compareBy('price'));
    console.log(sortedPrices);
    */

    let sortByProductNames=products.sort((a,b)=>a.name.localeCompare(b.name));  //alpha order maintains,irrespective of the case 
    console.log("Sorted By Product Names",sortByProductNames);

    let sortAscByProductPrice=products.sort((a,b)=>Number(a.price)-Number(b.price));
    console.log("Sorted in Ascending Order By Product Price",sortAscByProductPrice);
    console.log("Cheapest Mobile is: ",sortAscByProductPrice[0]);

    let sortDescByProductPrice=products.sort((a,b)=>Number(b.price)-Number(a.price));
    console.log("Sorted in Descending Order By Product Price",sortDescByProductPrice);
    console.log("Costilest Mobile is: ",sortDescByProductPrice[0]);

    //convert the Products Object into Array Format - this shows index also 
    let arrayProducts=Object.entries(products);
    console.log("Products in Array Form",arrayProducts);

    //This converts the Array back into the Object - but with the index, work on it to how to remove the index from object
    let ObjectProducts=Object.fromEntries(arrayProducts);
    console.log("Products in object Form",ObjectProducts);

})