import {test, expect, Locator} from '@playwright/test'

test("Array Map Demo", async({page})=>{
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const lengths:number[]=days.map(day=>day.length);
    
    console.log(days);
    console.log(lengths);
});