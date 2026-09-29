import {test, expect,Locator} from "@playwright/test";

test("Orange HRM Login Test", async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder('Username').fill('Admin');
    await page.locator("xpath=//input[@name='password']").fill('admin123');

    const locator:Locator=page.getByRole('button', {name:' Login '});
    //await locator.hover();
    await locator.click();

    console.log("Page Title is:",await page.title());

    await page.locator("//span[text()='Admin']").click();
    //await page.getByLabel('Username').fill('Dina.Pfeffer34');
    const searchButton:Locator=page.getByRole('button', {name:'Search'});
    await expect(searchButton).toBeVisible();
});