import {test, expect, Locator} from '@playwright/test'

//alert(), confirm(), prompt() --- we call then dialogs in playwright/JavaScript Alerts
//Pop-Ups are different from alerts, they are not alerts
//By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. 
// However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.

test("simple dialog demo",async({page})=>{

   await page.goto('https://testautomationpractice.blogspot.com/')
  
   await page.locator('#alertBtn').click();  // this opens a dialog
  
   //here this alert dialog is automatically handeled by the playwright - (Auto-Dismissed)
   // the alerts wont interrupt any execution flow in playwright unlike selenium
   // await page.waitForTimeout(3000)

   //so. in order to handle this dialog or do anything on this dialog
   // that we have to do before triggering this event, 
   // let us once again click the alert button, but before clicking,let us handle it
   
   //----->
   page.on('dialog', (dialog)=>{dialog.accept()})  // this on simply accepting the alert
   //it takes 2 parameters, One is 'dialog' event, Other is '(dialog)=>{dialog.accept()}' - an arrow function
   await page.locator('#alertBtn').click();
   //check One-Time Handling dialog scenario at the end   
})

test("alert dialog",async({page})=>{

   await page.goto('https://testautomationpractice.blogspot.com/')
  
   //----->
   //let us do more on this dialog
   page.on('dialog', (dialog)=>{
      console.log(dialog.type());      //this returns the type of the dialog - i.e., alert, prompt, or confirm
      expect(dialog.type()).toContain('confirm')  //adding assertion based on code logic
      
      console.log(dialog.message());   //this returns the actual message on the dialog
      expect(dialog.message()).toContain('I am an alert box!') //adding assertion based on code logic

      dialog.accept();
   })
     // await page.waitForTimeout(3000)
   await page.locator('#confirmBtn').click();

})

test("confirm dialog",async({page})=>{

   await page.goto('https://testautomationpractice.blogspot.com/')
  
   //Confirm dialog have 2 options, Ok, Cancel
   //by default, playwright dismisses the confirm
   //if we cant to accept it, handle it with dialog listener

   page.on('dialog', (dialog)=>{
      console.log("dialog type is: ",dialog.type());      //this returns the type of the dialog - i.e., alert, prompt, or confirmation
      expect(dialog.type()).toContain('confirm')  //adding assertion based on code logic
      
      console.log("dialog text: ",dialog.message());   //this returns the actual message on the dialog
      expect(dialog.message()).toContain('Press a button!') //adding assertion based on code logic

      // dialog.accept();     //we can either accept
      dialog.dismiss();    //or dismiss
   })
   await page.locator('#confirmBtn').click();

   //add assertions outside the dialog listener
   const responseText=await page.locator('#demo').innerText();
   // expect(responseText).toContain(/Cancel/i)
   console.log("What did I Press? :", responseText)
   await expect(page.locator('#demo')).toHaveText("You pressed Cancel!")   //when cancelled
   // await expect(page.locator('#demo')).toHaveText("You pressed OK!")    //when accepted
})

test("prompt dialog",async({page})=>{

   await page.goto('https://testautomationpractice.blogspot.com/')
  
   //Prompt dialog have 3 options - input TextBox, Ok, Cancel
   //by default, playwright dismisses
   //if we cant to accept it, handle it with dialog listener

   page.on('dialog', (dialog)=>{
      console.log("dialog type is: ",dialog.type());      //this returns the type of the dialog - i.e., alert, prompt, or confirmation
      expect(dialog.type()).toContain('prompt')  //adding assertion based on code logic
      
      console.log("dialog text: ",dialog.message());   //this returns the actual message on the dialog
      expect(dialog.message()).toContain('Please enter your name:') //adding assertion based on code logic

      //to capture the default value inside the prompt use --> dialog.defaultValue()
      expect(dialog.defaultValue()).toContain('Harry Potter');

      //inorder to pass some value to this prompt dialog, that is only possible when accpeting the promt
      //cannot pass any text to the prompt when dismissing
      
      // dialog.accept();     //we can either simply accept
      dialog.accept("Send Value to the Prompt") //accpet while passing some value
      // dialog.dismiss();    //or dismiss
   })
   await page.locator('#promptBtn').click();

   //add assertions outside the dialog listener
   const responseText:string=await page.locator('#demo').innerText();
   console.log("What did I Press? :", responseText)
   //await expect(page.locator('#demo')).toHaveText("User cancelled the prompt")   //when cancelled
   // await expect(page.locator('#demo')).toHaveText("Hello Harry Potter! How are you today?")    //when accepted
   await expect(page.locator('#demo')).toHaveText("Hello Send Value to the Prompt! How are you today?")
})

test.only("One-Time Handling dialog",async({page})=>{

   await page.goto('https://testautomationpractice.blogspot.com/')

   page.once('dialog',(dialog)=>{dialog.accept()})
  
   await page.locator('#alertBtn').click();
})