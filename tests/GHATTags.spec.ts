// Sometimes you want to tag your tests as @fast or @slow, @sanity, @regression,
//  and then filter by tag in the test report. Or you might want to only run tests that have a certain tag.

// To tag a test, either provide an additional details object when declaring a test, 
// or add @-token to the test title. Note that tags must start with @ symbol.

import {expect, test} from '@playwright/test'

//keep @anyTagName in the test title
test("@sanity test1",async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//one test may belong to different groups - same way @sanity @regression
test("test2 @sanity @regression",async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//Preferred Appraoch :adding single tag---> {tag:@smoke} 
test(" test3",{tag:'@smoke'},async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//Preferred Appraoch :adding multple tags---> keep then in an array {tag:['@smoke','@sanity']}
test("test4",{tag:['@smoke','@functional']},async ({page})=>{
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google")
})

//CLI Commands to run the test, use --grep or -g
//CLI> npx playwright test GHATTags.spec.ts --grep @smoke       ---> run all smoke testcases
//CLI> npx playwright test GHATTags.spec.ts --grep "@smoke|@sanity"   --> works as OR operator: Run both smoke and sanity
//CLI> npx playwright test GHATTags.spec.ts --grep-invert @functional  ---> works as NOT operator: Except functional, run all testcases
//CLI> npx playwright test GHATTags.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"  ---> works as AND operator, testcases which belong to both @sanity AND @regression executes
//CLI> npx playwright test GHATTags.spec.ts --grep "@sanity" --grep-invert "@regression"   ---> runs only sanity, which are not regression


//we can also configure the tags in playwright.config.ts
/*
grep: /@sanity/,
grepInvert: /@regression/,
*/