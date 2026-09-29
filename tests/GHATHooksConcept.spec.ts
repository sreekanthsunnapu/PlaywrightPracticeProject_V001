import {test} from '@playwright/test'

//Very important Topic, useful in framework design - similar to Annotations in TestNG
//used to manage HOW and WHEN test are executed
//example: lets say, for every test I want to launch a a url, 
// so that can be created in a test and re-use it whereever necessary

//There are multiple hooks methods provided by playwright - beforeEach, afterEach, beforeAll, afterAll

//step1
test.beforeEach("beforeEach Block",async()=>{
    //this block of code executes before running every test
    console.log("This is before Each block")
})
//step2
test.afterEach("beforeEach Block",async()=>{
    //this block of code executes before running every test
    console.log("This is after Each block")
})
test.beforeAll("Hooks Demo Test - beforeAll Block",async()=>{
    //this block of code executes before running every test
    console.log("This runs only once before starting tests")
})
test.afterAll("afterAll Block",async()=>{
    //this block of code executes before running every test
    console.log("This runs only once after completion of all the tests")
})


test("Test1",async ()=>{
    //step1  -- say Login
    console.log("Thihs is Test1")
    //step2  -- say Logout
})

test("Test2",async ()=>{
    //step1  -- say Login
    console.log("Thihs is Test2")
    //step2  -- say Logout
})

test("Test3",async ()=>{
   //step1  -- say Login
    console.log("Thihs is Test3")
    //step2  -- say Logout
})

test("Test4",async ()=>{
   //step1  -- say Login
    console.log("Thihs is Test3")
    //step2  -- say Logout
})

//real- usecases of the Hooks are used
//keep the Login/logout code that is required for every test before and after
//if certain settings like DB Connection, read data file, JSON file etc, they can keep in hooks