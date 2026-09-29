import {test, expect} from '@playwright/test'
/*
3 ways to create trace file (.zip file)
1. Using playwright.config.ts  
    --> global configuration
    --> trace.zip is attached to the html report 
2. Using CLI: npx playwright test traceViewer.spec.ts --trace on   
    --> applicable to the testname specified in the CLI
    --> if test is not mentions, applicable to all the test in project
    --> trace.zip is attached to the html report
3. In Code (programatically)
        context.tracing.start({screenshots:true, snapshots:true})
        //----> test steps
        context.tracing.stop({path:'trace.zip'})
*/

/*
To View trace.zip file, 3 Approaches
1. From the html report
2. through CLI> npz playwright show-trace traceFilename.zip
3. using playwright utility: https://trace.playwright.dev/ --> upload the traceFilename.zip to view in online traceViewer
*/


/* 
we have 3 ways to get the trace of a test 
1.Globally in playwright.config.ts, 
import { defineConfig } from '@playwright/test';
export default defineConfig({
  retries: process.env.CI ? 2 : 0, // set to 2 when running on CI
  // ...
  use: {
    trace: 'on-first-retry', // record traces on first retry of each test
  },
});

2. get the trace for only a specific test - 
for this ---> run  > npx playwright test traceViewer.spec.ts --trace on
for all the test --> npx playwright traceViewer.spec.ts --trace on
the trace .zip file is saved in test-results folder
and the trace is attachedd with the html report

3. we can keep the trace in the test itself ---> pass the context fixture and
at the begining of the test: context.tracing.start({screenshots:true, snapshots:true})
at the end of the test:     context.tracing.stop({path:'/trace.zip'});
and after execution this trace file is not attached to the html report, 
because, we created and saved the trace in our wish location, playwright dont attach it to the html report

this trace.zip file is in our project location, then how to see this trace.zip?
we cannot unzip, this must be viewed in traceViewer only
so, we can open this file from command prompt > npx playwright show-trace trace.zip
this do not opens with html report, but opens directly on traceviewer
file name: it can be anything, trace.zip, testTrace.zip and meaninful name and can be saved anywhere

There is also another way to open this trace.zip throgh an online viewer
playwright provides a utility where you can open the trace.zip
goto> trace.playwright.dev > upload the zip file to open it and view
*/

test("Tracing Test ", async({page,context})=>{

  //here at the first step, we are starting the trace, with screeshots and snapshots
    context.tracing.start({screenshots:true, snapshots:true})

  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('admin');
  await page.locator('#loginpassword').fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome admin');
  await page.getByRole('link', { name: 'Log out' }).click();

  //after the test steps completed, we have to stop the trace and provide the path for .zip file to save
  context.tracing.stop({path:'trace.zip'});
})