import { test, expect, Locator } from '@playwright/test'

test('TextBox Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    //https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php

    //textbox / input box
    const nameTextBox: Locator = page.locator("#name");
    await expect(nameTextBox).toBeVisible();
    await expect(nameTextBox).toBeEnabled();
    const maxLength: string | null = await nameTextBox.getAttribute('maxlength');
    expect(maxLength).toBe('15');  //here, 15 is a string, so keep it in quptes

    await nameTextBox.fill("sreekanth");
    const enteredValue: string = await nameTextBox.inputValue();
    console.log("Text content of the filled textbox :", enteredValue); // this wont retrun anything
    //for that we have to use inputValue()
    console.log("Text content of the filled textbox :", await nameTextBox.inputValue()); // this retruns the input value of textbox
    expect(enteredValue).toBe("sreekanth");

    // await page.waitForTimeout(1000);
});

//only is the annotation in playwright that allows to run the specified test with only annotation
//test.only("Radio buttons Actions Demo",async({page})=>{
test("Radio buttons Actions Demo", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadio = page.locator("#male");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    // if(await maleRadio.isChecked())
    //await expect(maleRadio).toBeChecked();
    expect(await maleRadio.isChecked()).toBe(false);  // means radio is unchecked
    await maleRadio.check();  // this will select the radio
    expect(await maleRadio.isChecked()).toBe(true);     //means radio is checked
    await expect(maleRadio).toBeChecked();  //prefer to use: here we are not comparing, making a validation in single step 
});

test.only("Check Boxes Actions Demo", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // *** Select a Single Checkbox*** 
    const sundayCheckBox: Locator = page.getByLabel(/sunday/i); //regular expression - i for ignore the case
    await sundayCheckBox.check();
    expect(sundayCheckBox).toBeChecked();       //verify that checkbox is checked
    //let us select multiple check boxes: here are different ways to do it

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // *** Select Mutliple checkboxes*** 

    // *** 1.select with simple for...of loop***

    for (let day of days) {
        await page.getByLabel(day).check();
        // await expect(day).toBeChecked();
    }

    /* *** 2.select with Locator Array and for...of loop*** */
    /* this is the syntax we learned in arrow function 
     * where arrow function is passed as an argument to the map() method
     * that transforms the array of strings into an array of values/indices (in this case)
     * const checkBoxes:Locator[] : is the Locator array here with locators of all the checkboxes 
    */
    const checkBoxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkBoxes.length).toBe(7);  //here await is not required as we are comparing a value not a webElement

    for (const checkbox of checkBoxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    // *** 3.select with Locator Array, for...of loop and slice()***
    /* This is another way of check/uncheck the multiple checkboxes
    *  use th slice(): 
    *  i. single Parameter (2)- first two elements.
    *  ii. range of parameters (slice(2,5): from 2nd to 5th. index starts from 0 
    *  iii. slice(-3): pass a -ve number (-3 which returns last 3 elements) 
    **/
    for (const checkbox of checkBoxes.slice(-3)) {        // this slice takes days from the last
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();   //use 'not' for any assertion for a -ve condition
    }
    await page.waitForTimeout(5000);

    //checking how slice(4,6) is working. (index starts from 0-6 here in this case)
    for (const checkbox of checkBoxes.slice(4, 6)) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(5000);

    // *** 4.Toggle checkboxes: uncheck - if checked. check if unchecked***
    for (const checkbox of checkBoxes) {
        //execute the below lines only if checked
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            //execute the below lines only if not-checked
            await checkbox.check();
            await expect(checkbox).toBeChecked();

        }
    }
    await page.waitForTimeout(3000);


    // *** 5.Randomly select the checkboxes: hint: select checkboxes by index(1,4,6) and assert***
    const indices: number[] = [1, 3, 6];
    for (const i of indices) {
        await checkBoxes[i].check();
        await expect(checkBoxes[i]).toBeChecked();
    }

    // ***6.select the checkbox based on the label, which is passed as an input value***
    const weekName: string = 'Friday';
    for (const label of days) {
        if (label.toLowerCase() === weekName.toLowerCase()) {
            const inputCheckbox:Locator = page.getByLabel(label);
            await inputCheckbox.check();
            await expect(inputCheckbox).toBeChecked();
        }
    }
    await page.waitForTimeout(5000)
});