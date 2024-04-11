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

async function vehicleStatus() {
  let emailBody = "Latest Vehicle RTO Status is below:" + "\r\n";

  try {
    const refNumbers = ["KA23111534666572", "KA23111524641879"];

    for (let i = 0; i < refNumbers.length; i++) {
      const refNo = refNumbers[i];

      let noStatus = false;

      do{
        // launch the browser
        let driver = await new Builder().forBrowser("chrome").build();

        //navigate to Aadhaar updates status page
        if (driver.getCurrentUrl() != "https://vahan.parivahan.gov.in/vahanservice/vahan/ui/appl_status/form_Know_Appl_Status.xhtml") {
          await driver.get("https://vahan.parivahan.gov.in/vahanservice/vahan/ui/appl_status/form_Know_Appl_Status.xhtml");
        }
        
        await sleep(2000);

        //Now find the status check element and enter the reference number 
        const statusField = await driver.findElement(By.xpath('/html/body/form/div[1]/div[3]/div/div[3]/div[1]/div[2]/input'));
        statusField.sendKeys(refNo);

        // Define the XPath of the image element
        const xpath = '//*[@id="vhn_cap:ref_captcha"]';

        // Specify the destination path where the image will be saved
        const destinationPath = './captchas/captcha.png';

        // Download the image
        await downloadImageFromPage(driver, xpath, destinationPath);

        // Solve and enter the captcha
        const captchaText = await solveCaptchaFromFile(destinationPath);
        if (typeof captchaText === 'string') {
          console.log('Captcha solution:', captchaText);
          // Here, you can safely use the solution variable as a string
          // For example, you can submit the captcha text to a form
        } else {
          console.error('Error: Captcha solution is undefined or not a string.');
        }

        //Enter the solved captcha
        await driver.findElement(By.name("vhn_cap:CaptchaID")).sendKeys(captchaText);

        await sleep(3000);

        // Use XPath to locate the button by its text content
        const submitButton = await driver.findElement(By.xpath('//*[@id="btn_submit"]'));
        // Create an Actions object
        const actions = driver.actions({ bridge: true });
        // Hover the mouse over the button
        await actions.move({ duration: 1000, origin: submitButton }).perform();
        // Click on the button
        await submitButton.click();
        
        await sleep(5000);

        try{
          const statusElement = await driver.findElement(By.xpath('/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[1]'));
          if (statusElement) {
            noStatus = false;

            console.log("Status of reference number: " + refNo);
            emailBody += "\r\n\r\nStatus of reference number: " + refNo + "\r\n";

            const statusLabelIds = ['/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[1]','/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[2]','/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[3]','/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/thead/tr/th[4]'];
            const statusValueIds = ['/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[1]','/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[2]','/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[3]','/html/body/form/div[1]/div[5]/div/div/div[2]/div[2]/div[1]/table/tbody/tr/td[4]'];
            for (statusId in statusValueIds) {
      
              // Read the label of the status
              const statusLabel = await driver.findElement(By.xpath(statusLabelIds[statusId]));
              const statusLabelText = await statusLabel.getText();
      
              // Read the value of the status
              const statusElement = await driver.findElement(By.xpath(statusValueIds[statusId]));
              const statusText = await statusElement.getText();
              
              console.log(statusLabelText + ": " + statusText);
              emailBody += "\r\n" + statusLabelText + ": " + statusText;
            }

            await driver.quit();
          } else {
            noStatus = true;
            console.log("Retry");
          }  
        } catch(error){
          await driver.quit();
          driver = await new Builder().forBrowser("chrome").build();
          console.log(error);
          noStatus = true;
        }
      } while(noStatus);
    }
    // Send email
    if (sendEmail){
      sendEmails("Vehicle RTO status update.",emailBody);
    }    
  } finally {
      console.log('Quitting');
  }
}

vehicleStatus();
