const { Builder, By, Key, Select, until } = require("selenium-webdriver");
const fs = require('fs');
const https = require('https');
const assert = require("assert");

const solveCaptchaFromFile = require("./anticaptcha");
const sendEmails = require("./sendemails");
const downloadImageFromPage = require("./utils");

// Switch to send Email or not
const sendEmail = true;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function panAddressUpdate() {
    // let emailBody = "Latest Vehicle RTO Status is below:" + "\r\n";

    try {

        const panNo = "EYEPB0604P";
        const aadhaarNo = "614883977851";
        const mobileNo = "8944034390";
        const emailId = "rishibaul2001@gmail.com";
        // const gstinNo = "Your GSTIN Number";
        const addressUpdateSource = "Aadhaar base eKYC Address update"; //  or DigiLocker Address update
        const captcha = "/path/to/captcha/image.jpg"; // Path to your captcha image
        const agreeButtonCheck = true; // Boolean value for agreeing to terms
        

        // do {
        // launch the browser
        let driver = await new Builder().forBrowser("chrome").build();

        //navigate to Aadhaar updates status page
        if (driver.getCurrentUrl() != "https://www.pan.utiitsl.com/PAN_ONLINE/homeaddresschange") {
            await driver.get("https://www.pan.utiitsl.com/PAN_ONLINE/homeaddresschange");
        }

        //  
        await sleep(2000);
        
        // await downloadImageFromPage(driver, loginCaptapath, destinationPath);

        // Solve and enter the captcha
        // const captchaText = await solveCaptchaFromFile(destinationPath);
        // if (typeof captchaText === 'string') {
        //     console.log('Captcha solution:', captchaText);
        //     // Here, you can safely use the solution variable as a string
        //     // For example, you can submit the captcha text to a form
        // } else {
        //     console.error('Error: Captcha solution is undefined or not a string.');
        // }


        //Enter the solved captcha
        // await driver.findElement(By.xpath(`//*[@id="root"]/div/div[2]/form/div/div[2]/div[1]/div/div/div/input`)).sendKeys(captchaText);
       try{
        // Fill PAN Number
const panNoField = await driver.findElement(By.xpath('//*[@id="panNo"]'));
panNoField.sendKeys(panNo);

// Fill Aadhaar Number
const aadhaarNoField = await driver.findElement(By.xpath('//*[@id="aadhar"]'));
aadhaarNoField.sendKeys(aadhaarNo);

// Fill Mobile Number
const mobileNoField = await driver.findElement(By.xpath('//*[@id="mobileNo"]'));
mobileNoField.sendKeys(mobileNo);

// Fill Email ID
const emailIdField = await driver.findElement(By.xpath('//*[@id="emailId"]'));
emailIdField.sendKeys(emailId);

// Fill GSTIN Number
// const gstinNoField = await driver.findElement(By.xpath('//*[@id="gstinNo"]'));
// gstinNoField.sendKeys(gstinNo);

// Fill Address Update Source
const addressUpdateSourceField = await driver.findElement(By.xpath('//*[@id="addressUpdateSource"]'));
addressUpdateSourceField.sendKeys(addressUpdateSource);
await sleep(2000);
 
const captchaField = await driver.findElement(By.xpath('//*[@id="j_captcha_response"]'));
await captchaField.click();
await sleep(1000);
const alert = await driver.switchTo().alert()
console.log("alert text:"+await alert.getText());
await alert.accept();
// Upload Captcha

// const captchaField = await driver.findElement(By.xpath('//*[@id="captchaImg"]'));
captchaField.sendKeys("Abc");
await sleep(20000);

// Click on Agree Button
if (agreeButtonCheck) {
    const agreeButtonField = await driver.findElement(By.xpath('//*[@id="userConsent"]'));
    await agreeButtonField.click();
}

// Click on Submit Button
const submitButton = await driver.findElement(By.xpath('//*[@id="addchange_0"]'));
await submitButton.click();


       }
        catch (error) {
            await driver.quit();
            driver = await new Builder().forBrowser("chrome").build();
            console.log(error);
            noStatus = true;
        }
        await sleep(6000);
    } finally {
        console.log('Quitting');
    }

}

panAddressUpdate();



// https://www.pan.utiitsl.com/PAN_ONLINE/homeaddresschange url
// //*[@id="panNo"] pan no
// //*[@id="aadhar"] aadhaar number
// //*[@id="mobileNo"]
// //*[@id="emailId"]
// //*[@id="gstinNo"]
// //*[@id="addressUpdateSource"] // Aadhaar base eKYC Address update or DigiLocker Address update

// //*[@id="captchaImg"] captcha
// //*[@id="j_captcha_response"] captcha text

// //*[@id="userConsent"] agree button check 

// //*[@id="addchange_0"] submit button