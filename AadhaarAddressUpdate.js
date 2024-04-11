import { Builder, By, Key, until } from "selenium-webdriver";
import {Select} from "selenium-webdriver";
// const fs = require('fs');
// const https = require('https');
// const assert = require("assert");

// const solveCaptchaFromFile = require("./anticaptcha");
// const sendEmails = require("./sendemails");
// const downloadImageFromPage = require("./utils");

// Switch to send Email or not
const sendEmail = true;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function vehicleStatus() {

    try {
        const aadhaarNumber = "614883977851";
        const careOf = "Rana Baul";
        const houseBuilding = "Baul Niwas";
        const streetRoad = "Rajib Nagar, Old Hasimara";
        const areaLocality = "Hasimara";
        const landmark = "Green View Lodge";
        const pincode = "735215";
        const gardenName = "Madhu Tea Garden"; // Option to select
        const validDoc = "Indian Passport"; // Option to select
        const docPath = "/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/aadhaar.JPG";
        // const aadhaarNumber = "419095541370";

        let noStatus = false;

        do {
            // launch the browser
            let driver = await new Builder().forBrowser("chrome").build();

            //navigate to Aadhaar updates status page
            if (driver.getCurrentUrl() != "https://myaadhaar.uidai.gov.in/") {
                await driver.get("https://myaadhaar.uidai.gov.in/");
            }

            //  
            await sleep(2000);
            const loginButton = await driver.findElement(By.xpath('//*[@id="root"]/div/section/div[1]/div[2]/div/button'));
            // Create an Actions object

            const loginActions = driver.actions({ bridge: true });
            // Hover the mouse over the button
            await loginActions.move({ duration: 1000, origin: loginButton }).perform();
            // Click on the button
            await loginButton.click();

            if (driver.getCurrentUrl() != "https://tathya.uidai.gov.in/access/login?role=resident") {
                await driver.get("https://tathya.uidai.gov.in/access/login?role=resident");
            }
            //Now find the status check element and enter the reference number 
            const aadhaarNumberField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/div[1]/div/div[1]/div/input'));
            aadhaarNumberField.sendKeys(aadhaarNumber);
            await sleep(1000);
            // Define the XPath of the image element
            const loginCaptapath = '//*[@id="root"]/div/div[2]/form/div/div[2]/div[2]/div[1]/img';

            // Specify the destination path where the image will be saved
            const destinationPath = './captchas/captcha.png';

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

            await sleep(6000);
            // Use XPath to locate the button by its text content
            const submitButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/div[3]/div/button'));
            // Create an Actions object

            const actions = driver.actions({ bridge: true });
            // Hover the mouse over the button
            await actions.move({ duration: 1000, origin: submitButton }).perform();
            // Click on the button
            await submitButton.click();

            console.log("Try ke pehele")
            try {
                await sleep(15000);
                const otpElement = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/div[3]/div[2]/div/div/div/input'));
                if (otpElement) {
                    noStatus = false;
                    const otpLoginButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/div[4]/div/button'));
                    // const otpLoginButton = await driver.findElement(By.name('#root > div > div.login-section__card > form > div > div.form-section__button-container > div > button'));
                    // Create an Actions object
                    const actions = driver.actions({ bridge: true });
                    // Hover the mouse over the button
                    await actions.move({ duration: 2000, origin: otpLoginButton }).perform();
                    // Click on the button
                    await otpLoginButton.click();

                    console.log("Otp Tak")
                    await sleep(15000);

                    let elementToHoverOver = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/div/section/div[3]/div[4]/div')));

                    console.log("hover tak!")
                    // Perform the hover action
                    await driver.actions({ bridge: true }).move({ duration: 2000, origin: elementToHoverOver }).perform();
                    // const updateAddressButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div/section/div[3]/div[4]/div/div[1]/div[2]'));
                    const clickableElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/div/section/div[3]/div[4]/div/div[1]/div[2]')), 10000);
                    await clickableElement.click();
                    // Hover the mouse over the button
                    // //*[@id="root"]/div/div[3]/div/div/section/div[3]/div[4]/div/div[2]/img arrow
                    // await actions.move({ duration: 1000, origin: updateAddressButton }).perform();
                    // Click on the button
                    // await updateAddressButton.click();

                    await sleep(5000);
                    let elementToHoverOver2 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div[2]/div[1]/div/div[1]'));

                    console.log("hover tak!")
                    // Perform the hover action
                    await driver.actions({ bridge: true }).move({ duration: 2000, origin: elementToHoverOver2 }).perform();
                    // const updateAddressButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div/section/div[3]/div[4]/div/div[1]/div[2]'));
                    const clickableElement2 = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/div[2]/div[1]/div/div[1]/div[2]/div[2]')), 10000);
                    await clickableElement2.click();
                    // const aadhaarOnlineButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]'));// //*[@id="root"]/div/div[3]/div/div[2]/div[1]/div
                    // // Hover the mouse over the button
                    // await actions.move({ duration: 1000, origin: aadhaarOnlineButton }).perform();
                    // // Click on the button
                    // await aadhaarOnlineButton.click();

                    await sleep(2000);

                    const proccedUpdateButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/section/div[2]/a/div/button'));

                    await proccedUpdateButton.click();

                    await sleep(2000);

                    const selectAddressButton = await driver.findElement(By.xpath('//*[@id="address"]'));

                    // Click on the button
                    await selectAddressButton.click();

                    await sleep(1000);
                    const proceed = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div/div[1]/div/div/div[4]/div/button'));
                    await proceed.click();

                    await sleep(5000);

                    const careOfField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[1]/div/div/input'));
                    careOfField.sendKeys(careOf);

                    // Fill House/Building
                    const houseBuildingField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[3]/div/div/input'));
                    houseBuildingField.sendKeys(houseBuilding);

                    // Fill Street/Road
                    const streetRoadField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[5]/div/div/input'));
                    streetRoadField.sendKeys(streetRoad);

                    // Fill Area/Locality
                    const areaLocalityField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[7]/div/div/input'));
                    areaLocalityField.sendKeys(areaLocality);

                    // Fill Landmark
                    const landmarkField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[9]/div/div/input'));
                    landmarkField.sendKeys(landmark);

                    // Fill Pincode
                    const pincodeField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[11]/div/div/input'));
                    pincodeField.sendKeys(pincode);

                    // const dropdownName = '//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[16]/div/div/select';
                    // // Wait for the dropdown to be present (you might need to adjust the timeout)
                    // const dropdownLocator = By.xpath(dropdownName);
                    // const dropdown = await driver.wait(until.elementLocated(dropdownLocator), 10000);

                    // // Create a Select instance based on the dropdown element
                    // const objSelect = await new Select(dropdown);
                    // // Wait for the option to be present in the dropdown (adjust the XPath accordingly)
                    // // Select the option by visible text
                    // await objSelect.selectByVisibleText(gardenName);
                    // // Perform a click on the dropdown (optional, depending on your use case)
                    // await dropdown.click();

                    await sleep(10000);
                    console.log("NANANA")

                    // await driver.executeScript("arguments[0].style.display = 'block';", driver.findElement(By.NAME, "vtc"));

                    // // Locate the dropdown element by its name attribute
                    // // let dropdown = await driver.findElement(By.NAME, "vtc");
            
                    // // Select an option by visible text
                    // await dropdown.findElement(By.xpath("//option[normalize-space(text()) = 'Madhu Tea Garden']")).click();
            
                    // console.log("Option selected successfully!");

                    // // const villageClick = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[16]/div[1]/div')));
                    // // await villageClick.click();
                    // await sleep(5000);
                    const villageselect = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[18]/div/div/select')));
                    // await villageselect.click();

                    // Create a Select object
                    let dropdown = await new Select(villageselect);
                    villageselect.sendKeys("Parmalangi")
                    dropdown.selectByVisibleText("Parmalangi")
                   
                    console.log("Abhi tak theek!");

                    // const menu2 = new Select(villageselect);
                    // menu2.selectByVisibleText("Madhu Tea Garden")
                    // villageselect.sendKeys("Madhu Tea Garden");
                    await sleep(5000)

                    console.log("Abhi bhi")

                    const test = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[19]'));
                    await test.click()


                    // const villagediv = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[18]/div/div'));

                    // const villageElement = await villagediv.findElement(By.xpath('./select'));

                    // // Select the desired option by its value
                    // const optionValue = "Madhu Tea Garden"; // Replace with the value you want to select
                    // await villageElement.sendKeys(optionValue);

                    // const gardenNameField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[16]/div/div/select'));
                    // gardenNameField.sendKeys(gardenName);



                    // Select Valid Document
                    const validdocdiv = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[21]/div/div[1]/div'));

                    const validdocElement = await validdocdiv.findElement(By.xpath('./select'));
                    // Replace with the value you want to select
                    await validdocElement.sendKeys(validDoc);
                    // const validDocField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[21]/div/div/div/select'));
                    // validDocField.sendKeys(validDoc);

                    const okayField = await driver.wait(until.elementLocated(By.xpath('//*[@id="html"]/body/div[3]/div[3]/div/div/div[6]/div')));
                    await okayField.click();

                    // // Upload Document Pic
                    const docPicField = await driver.findElement(By.xpath('//*[@id="doc_component"]'));
                    docPicField.sendKeys(docPath);
                    await sleep(2000);

                    // Click on Next Button
                    const nextButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[2]/div/div[2]/button'));
                    await nextButton.click();

                    // Click on Checkbox
                    const checkboxField = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div/div[1]/div/div/div[4]/div/label/div/svg'));
                    await checkboxField.click();

                    // Click on Next Button
                    const nextButton2 = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div/div[2]/div/div[2]/button'));
                    await nextButton2.click();
                    // //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[1]/div/div/input care of 
                    // //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[3]/div/div/input house building
                    // //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[16]/div[1]/div/select/option[1] options to select city



                    //         console.log("Status of reference number: " + refNo);
                    //         emailBody += "\r\n\r\nStatus of reference number: " + refNo + "\r\n";

                    //         const statusLabelIds = ['/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[1]', '/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[2]', '/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[3]', '/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[4]'];
                    //         const statusValueIds = ['/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[1]', '/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[2]', '/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[3]', '/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[4]'];
                    //         for (statusId in statusValueIds) {

                    //             // Read the label of the status
                    //             const statusLabel = await driver.findElement(By.xpath(statusLabelIds[statusId]));
                    //             const statusLabelText = await statusLabel.getText();

                    //             // Read the value of the status
                    //             const statusElement = await driver.findElement(By.xpath(statusValueIds[statusId]));
                    //             const statusText = await statusElement.getText();

                    //             console.log(statusLabelText + ": " + statusText);
                    //             emailBody += "\r\n" + statusLabelText + ": " + statusText;
                    //         }

                    await driver.quit();
                } else {
                    noStatus = true;
                    console.log("Retry");
                }
            } catch (error) {
                console.log("error hua " + error)
                await sleep(6000000);
                await driver.quit();
                driver = await new Builder().forBrowser("chrome").build();
                console.log(error);
                noStatus = true;
            }
        } while (noStatus);
        // Send email
        // if (sendEmail) {
        //     sendEmails("Vehicle RTO status update.", emailBody);
        // }
    } finally {
        console.log('Quitting');
    }
}

vehicleStatus();

// //*[@id="root"]/div/div[3]/div/div/section/div[3]/div[1]/div/div[1] card for update click
// //*[@id="root"]/div/div[3]/div/div[2]/div[1]/div/div[1] click
// //*[@id="root"]/div/div[3]/div/section/div[2]/a/div/button next click
// //*[@id="address"] click
// //*[@id="root"]/div/div[3]/div/div/div[1]/div/div/div[4]/div/button proceed click
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[1]/div/div/input care of 
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[3]/div/div/input house/building
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[5]/div/div/input street road 
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[7]/div/div/input area locality
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[9]/div/div/input landmark
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[11]/div/div/input pincode
//*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[16]/div[1]/div/select (Madhu Tea garden)
// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[21]/div/div[1]/div/select valid doc(Indian Passport)
// //*[@id="html"]/body/div[3]/div[3]/div/div/div[6]/div click ok
// //*[@id="doc_component"] document pic 
// //*[@id="root"]/div/div[3]/div[2]/div[2]/div/div[2]/button next
// //*[@id="root"]/div/div[3]/div[2]/div/div[1]/div/div/div[4]/div/label/div/svg click
// //*[@id="root"]/div/div[3]/div[2]/div/div[2]/div/div[2]/button click



// //*[@id="root"]/div/div[3]/div/div/section/div[3]/div[4]/div/div[1] hover




// //*[@id="root"]/div/div[3]/div[2]/div[1]/section[2]/form/div[21]/div/div[1]/div/select options

// //*[@id="html"]/body/div[3]/div[3]/div/div/div[6]/div okay click