import {test} from '@playwright/test'

//by default playwright executes all the tests in parallel mode 
// --> this configuration you can observe from paywright.config.ts > fullyParallel:true

//To run tests sequentially, set this----> paywright.config.ts > fullyParallel:false

// Approach - 1: test.describe("GroupName", ()=>{ test("test1",()=>{}) test("test2",()=>{})}) can be used to define groups
// Approach - 2: test("GroupName - TestName", async({})=>{})

//to run a specific group of tests --> CLI> npx playwright test groupingTest.spec.ts --grep Group1
//grep (regular expression) is a UNIX/LINUX command , same is introduced in playwright

test.describe('Group1',async()=>{

    test("Test1", ()=>{
    console.log("This is Test 1")

    })

    test("Test2", ()=>{
        console.log("This is Test 2")
    })
})
test.describe("Group2",()=>{
    
    test("Test3", ()=>{
        console.log("This is Test 3")
    })

    test("Test4", ()=>{
        console.log("This is Test 4")
    })
})

test.describe("Group3",()=>{
    
    test("Test5", ()=>{
        console.log("This is Test 5")
    })

    test("Test6", ()=>{
        console.log("This is Test 6")
    })
})

test.describe("@Group1,@Group3",()=>{
    
    test("Test5", ()=>{
        console.log("This is Test 9")
    })

    test("Test6", ()=>{
        console.log("This is Test 10")
    })
})

//--grep or -g have same meaning
//CLI> npx playwright test groupingTest.spec.ts --grep Group1  ---> to run a specific group
//CLI> npx playwright test groupingTest.spec.ts --g "Group1|Group3"  ---> to run Group1,Group3

//--grep-invert or -G have same meaning
//CLI> npx playwright test groupingTest.spec.ts --grep-invert Group3  ---> except Group3, runs all the groups
//CLI> npx playwright test groupingTest.spec.ts -G "Group1|Group7"

//This --grep "Group1|Group3" is shortly be writte as -g "Group1|Group3"  ---> runs Group1, Group3
//this is we executed earlier, that run a test with its title, so this is the same
// CLI> npx playwright test groupingTest.spec.ts -g "title of the test"

//That means you can also group the test without using test.describe(), see the following....
test("Group7 - Test7", ()=>{
    console.log("This is Test 7")
})

test("Group8 - Test8",async({page})=>{
    console.log("This is Test 8")
})


//Now run this CLI> npx playwright test groupingTest.spec.ts -g "Group1|Group7"
