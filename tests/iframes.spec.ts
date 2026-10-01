import {test, expect, Locator, FrameLocator, Frame} from '@playwright/test'

//iframe means an inlineFram, is a html element that allows you to embed another html document within the current document
//iframes are commonly used to embed content such as videos/maps/other web-pages into a web-page within the parent document

test("iframes Demo",async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');

//Appraoch - 1: page.frame() : locate frames using name or url

    //frames() - to get total no.of frames attached present on the webpage, returns an array of frames
    const frames=page.frames();  //to use Frame interface we need to import some pakages, lets dive deeper into it later 
    console.log("Number of Frames on this Page: ",frames.length)

    const frame1=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1'})

    /*  we cannot use the below life directly in Typescript (allowed in Javascript), it should be used by checking the availability of the frame
        frame1=page.frame returns - const frame1: Frame | null , so here the frame may be avaialable or sometimes it may be null 
        Typescript follows strictly-typed language, while Javascript is dynamically-typed language
    */
     // await frame1.locator("[name='mytext1']").fill("Hello Sreekanth");

     //but alternatively we can use the below syntax, when return Frame|null --> but one with if-else is preferred
      await frame1?.locator("[name='mytext1']").fill("Hello Sreekanth - you are in frame3, out side if-else"); 

    // if(frame1){
    //         //can use any of the below syntax. first one is preferred
    //         await frame1.locator("[name='mytext1']").fill("Hello Sreekanth - You are in Frame1");
    //     // await frame1.fill("[name='mytext1']",'Hello.. Sreekanth');
    //     // await frame1.getByRole('textbox',{name:'mytext1'}).fill("Hello Sreekanth")
    // }else{
    //     console.log("Frame is not available")
    // }

//Approach - 2 : page.frameLocator() : locate frames using any other available attributes than url
    // page.frameLocator("[src='frame_2.html']").locator("[name='mytext1']").fill("Hello Sreekanth")
    const inputBoxOnFrame2=page.frameLocator("[src='frame_2.html']").locator("[name='mytext2']")
    await inputBoxOnFrame2.fill('Hello Sreekanth - You are in Frame2')

    await page.waitForTimeout(3000)
})

test("inner/child frames Demo",async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame3:Frame|null= page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3'});       //retruns Frame|null
    // await frame3?.locator("[name='mytext3']").fill("Hello Sreekanth - You are in Frame3 textbox")
    if(frame3){
        await frame3.locator("[name='mytext3']").fill("Hello Sreekanth - You are in Frame3 textbox")
    }else{
        console.log("Frame3 is not available")
    }

    //lets findout the child frames inside the frame3  -- still prefer if-else approach
    //const childFrameinFrame3= frame3?.childFrames();        //returns an array of child-frames
    //console.log("Chile Frames inside Frame3 : ", childFrameinFrame3?.length);   //here, only 1 child frame is available

    if(frame3){
        const childFramesInFrame3= frame3.childFrames();        //returns an array of child-frames
        console.log("Chile Frames inside Frame3 : ", childFramesInFrame3.length);
        const radioBox=childFramesInFrame3[0].getByLabel("I am a human")   //access the first child-frame with array index
        await radioBox.check();      //this selects radio inside child frame in frame3
        await expect(radioBox).toBeChecked()

        const checkBox=childFramesInFrame3[0].getByLabel('General Web Automation');
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }

    await page.waitForTimeout(3000)
})

test("frames renders a web-page",async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame5:FrameLocator=page.frameLocator("[src='frame_5.html']");        //returns a FrameLocator type
    await frame5.locator("[name='mytext5']").fill("Hi Sreekanth - You are in Frame5")

    // await frame5.getByRole('link',{name:'https://a9t9.com/'}).click()
    await frame5.locator(`a[href="https://a9t9.com"]`).click();
    await page.waitForTimeout(3000)

    const logo=frame5.getByAltText("Ui.Vision by a9t9 software - Image-Driven Automation");
    await expect(logo).toBeVisible();       //asserion

    //below syntax waits for the state of element to be visible
    await frame5.getByAltText("Ui.Vision by a9t9 software - Image-Driven Automation").waitFor({state:'visible'})    


})