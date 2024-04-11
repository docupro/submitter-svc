import { Builder, By, Key } from "selenium-webdriver";
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
        if (driver.getCurrentUrl() != "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html") {
            await driver.get("https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html");
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
        try {
            // Fill PAN Number

            // //*[@id="registerForm"]/div[1]/div/div/div[1]/div/span/span[1]
            const changesdropdown = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div[3]/div/div/div/div/div/div/div/div/div[1]/form/div[1]/div/div/div[1]/div/span/span[1]/span/span[1]'))
            await changesdropdown.click();

            await sleep(2000)
            // const actions = new Actions(driver);
            for (let i = 0; i < 3; i++) {
               await changesdropdown.sendKeys(Key.ARROW_DOWN);
            }
        
            // Simulate pressing the enter key
            changesdropdown.sendKeys(Key.ENTER);
        
            // Perform the actions
            await changesdropdown.perform();

            await sleep(20000)

            // //*[@id="select2-type-results"] ul 

            // //*[@id="select2-type-result-ih7u-CR"] 3rd ul

            // const ulElement = await driver.wait(until.elementLocated(By.xpath('/html/body/span/span/span[2]/ul')), 10000);

            // // Click on the <ul> element to reveal the options
            // await ulElement.click();

            // // Now, you can interact with the revealed options, for example, selecting the 3rd option
            // const thirdOptionXPath = '/html/body/span/span/span[2]/ul/li[1]';
            // const thirdOption = await driver.wait(until.elementLocated(By.xpath(thirdOptionXPath)), 10000);
            // await thirdOption.click();

            // const selectchanges = await driver.wait(until.elementLocated(By.xpath('//*[@id="select2-type-result-pvmt-CR"]')),10000)
            // await selectchanges.click();
        }
        catch (error) {
            await driver.quit();
            driver = await new Builder().forBrowser("chrome").build();
            console.log(error)

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