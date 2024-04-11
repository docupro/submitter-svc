import { Builder, By, Key, Select, until }  from  "selenium-webdriver";
// const fs = require('fs');
// const https = require('https');
// const assert = require("assert");

// const solveCaptchaFromFile = require("./anticaptcha");
// const sendEmails = require("./sendemails");
// const downloadImageFromPage = require("./utils");

// Switch to send Email or not
const sendEmail = true;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function panAdd() {
    // let emailBody = "Latest Vehicle RTO Status is below:" + "\r\n";

   

        const panNumber = "EYEPB0604P";
        const aadhaarNumber = "614883977851";
        const monthOfBirth = "November";
        const yearOfBirth = "2001";
        const agreeClick = true; // Boolean value for agreeing to terms
        const captchaClick = true; // Boolean value for clicking on the captcha

        let driver = await new Builder().forBrowser("chrome").build();

        //navigate to Aadhaar updates status page
        if (driver.getCurrentUrl() != "https://www.onlineservices.nsdl.com/paam/endUserAddressUpdate.html") {
            await driver.get("https://www.onlineservices.nsdl.com/paam/endUserAddressUpdate.html");
        }

        //  
        await sleep(2000);

        try {
        // Fill PAN Number
        const panNumberField = await driver.findElement(By.xpath('//*[@id="panNumber"]'));
        panNumberField.sendKeys(panNumber);

        // Fill Aadhaar Number
        const aadhaarNumberField = await driver.findElement(By.xpath('//*[@id="aadhaarNumber"]'));
        aadhaarNumberField.sendKeys(aadhaarNumber);

        const monthField = await driver.findElement(By.xpath('//*[@id="select2-month-container"]'));
        await monthField.click();
        await sleep(1000);

        // Fill Month of Birth
        const monthOfBirthField = await driver.findElement(By.xpath('/html/body/span/span/span[1]/input'));
        monthOfBirthField.sendKeys(monthOfBirth);
        await sleep(2000);

        const monthFieldSelect = await driver.findElement(By.xpath('//*[@id="select2-month-results"]'));
        await monthFieldSelect.click();
        await sleep(1000);

        // Fill Year of Birth
        const yearOfBirthField = await driver.findElement(By.xpath('//*[@id="year"]'));
        yearOfBirthField.sendKeys(yearOfBirth);

        // Click on Agree Button
        if (agreeClick) {
            const agreeButtonField = await driver.findElement(By.xpath('//*[@id="consent"]'));
            await agreeButtonField.click();
        // }

        await driver.switchTo().frame(await driver.findElement(By.xpath('//*[@id="addressUpdatePojo"]/div[6]/div[2]/div/div/div/iframe')));

        await sleep(2000)
        // Click on Captcha
        if (captchaClick) {
            const captchaField = await driver.findElement(By.xpath('//*[@id="recaptcha-anchor"]/div[1]'));
            await captchaField.click();
        }
        await sleep(6000);
    }

// // Click on Submit Button
// const submitButton = await driver.findElement(By.xpath('//*[@id="addressUpdateSubmit"]'));
// await submitButton.click();
    }
    catch (error) {
        await driver.quit();
        driver = await new Builder().forBrowser("chrome").build();
        console.log(error);
        noStatus = true;
    }
   
    finally {
        console.log('Quitting');
    }

}

panAdd();



// //*[@id="panNumber"] pan Number
// //*[@id="aadhaarNumber"] aadhaarNumber 

// //*[@id="month"] month of birth
// /html/body/span/span/span[1]/input
// //*[@id="select2-month-result-yul0-11"] select first result

// //*[@id="year"] year of birth
// //*[@id="consent"] agree click
// //*[@id="recaptcha-anchor"]/div[2] captcha click



//https://www.onlineservices.nsdl.com/paam/endUserAddressUpdate.html
