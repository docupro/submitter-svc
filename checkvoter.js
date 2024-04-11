import {Builder, By, Select, until } from "selenium-webdriver";
import fs from 'fs';
import assert from "assert";

// const solveCaptchaFromFile = require("./anticaptcha");
// const sendEmails = require("./sendemails");

// Switch to send Email or not
const sendEmail = true;


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const checkvoter = async(formData)=> {
  console.log(formData);
  // launch the browser
  console.log("New Driver")
  try {
  const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().headless(false)) // Enable GUI
  .usingServer('http://172.17.0.3:4444') // WebDriver server URL
  .build();

  console.log("Driver tak aya "+driver);
  let emailBody = "Latest EPIC Status Update is below:" + "\r\n";

  // try {
    //navigate to voters id page
    if (driver.getCurrentUrl() != "https://voters.eci.gov.in/login") {
            await driver.get("https://voters.eci.gov.in/login");
        }

    //Now login - wait till captcha and OTP are entered
    await driver.findElement(By.name("mobOrEpic")).sendKeys(formData.email);
    await driver.findElement(By.name("password")).sendKeys(formData.password);

    // Example usage
    const destinationPath = './captchas/captcha.jpeg'; // Path to save the captcha image locally

    // Find the image element by its XPath
    // Wait for the image element to become visible
    const imageElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="loginId"]/div/div[2]/div[2]/div/form/div/div[3]/div[4]/div/div[1]/div[1]/img')), 10000);
    // Get the Base64-encoded image data from the src attribute
    const imageSrc = await imageElement.getAttribute('src');
    // Extract the Base64 data from the src attribute
    const base64Data = imageSrc.split(';base64,').pop();
    // Convert the Base64 data to binary
    const imageData = Buffer.from(base64Data, 'base64');
    // Save the binary data to a file
    fs.writeFileSync(destinationPath, imageData);
    console.log('Image downloaded successfully!');

    // Solve and enter the captcha
    /*const captchaText = await solveCaptchaFromFile(destinationPath);
    if (typeof captchaText === 'string') {
      console.log('Captcha solution:', captchaText);
      // Here, you can safely use the solution variable as a string
      // For example, you can submit the captcha text to a form
    } else {
      console.error('Error: Captcha solution is undefined or not a string.');
    }

    //Enter the solved captcha
    await driver.findElement(By.name("captcha")).sendKeys(captchaText);*/

    // await sleep(30000);

    // Use XPath to locate the button by its text content
    const requestOTPButtonXPath = "//*[text()='Request OTP']";
    const requestOTPButton = await driver.findElement(By.xpath(requestOTPButtonXPath));
    // Click on the button
    await requestOTPButton.click();
    
    // Manually enter Captcha and OTP
    await driver.wait(until.titleIs("Home Page"), 600000);

    // Use XPath to locate the button by its text content
    const applicationStatusButtonXPath = "//*[text()='Track Application Status']";
    const applicationStatusButton = await driver.findElement(By.xpath(applicationStatusButtonXPath));
     // Click on the button
    await applicationStatusButton.click();

    await driver.wait(until.titleIs("Track Application Status"), 600000);

    // const refNumbers = ["S10175O6N1301241200033","S10157O8C0901241200028","S10157O8C0901241200030","S10175O8O1101241200002", "S10175O6N0901241200031","S10156O8R2201241200001","S10176O6N2801241200221","S10176O8O0502241200095"];

    const refNumbers = formData.refNumbers;
    for (let i = 0; i < refNumbers.length; i++) {
      const refNo = refNumbers[i];
      //Now login - wait till captcha and OTP are entered
      await driver.findElement(By.name("refNo")).clear();
      await driver.findElement(By.name("refNo")).sendKeys(refNo);
  
      // Replace 'state' with the actual name attribute of your dropdown
      const dropdownName = 'state';
      // Wait for the dropdown to be present (you might need to adjust the timeout)
      const dropdownLocator = By.name(dropdownName);
      const dropdown = await driver.wait(until.elementLocated(dropdownLocator), 10000);
  
      // Create a Select instance based on the dropdown element
      const objSelect = await new Select(dropdown);
      // Wait for the option to be present in the dropdown (adjust the XPath accordingly)
      const optionLocator = By.xpath('//option[normalize-space(text())="Karnataka"]');
      const option = await driver.wait(until.elementLocated(optionLocator), 5000);
  
      // Select the option by visible text
      await objSelect.selectByVisibleText(formData.state);
      // Perform a click on the dropdown (optional, depending on your use case)
      await dropdown.click();
  
      // Replace 'yourButtonClass' with the actual class name of your button
      const buttonClass = 'btn btn-primary generic-btn';
      // Wait for the button to be present (you might need to adjust the timeout)
      const buttonLocator = By.className(buttonClass);
      await driver.wait(until.elementLocated(buttonLocator), 10000);
      // Find the button element
      const button = await driver.findElement(buttonLocator);
      // Click the button
      await button.click();
  
      await sleep(3000);

      try {
        // Replace 'yourTableId' with the actual ID of your table
        const tableId = 'genericTable';

        // Wait for the table to be present (you might need to adjust the timeout)
        const tableLocator = By.id(tableId);
        const table = await driver.wait(until.elementLocated(tableLocator), 5000);

        // Find the header row
        const headerRowLocator = By.tagName('tr');
        const headerRow = await table.findElement(headerRowLocator);

        // Find all header cells in the header row
        const headerCellLocator = By.tagName('th'); // Adjust if your header cells use a different tag
        const headerCells = await headerRow.findElements(headerCellLocator);

        // Extract header names dynamically
        const headerNames = await Promise.all(headerCells.map(cell => cell.getText()));

        // Initialize an array to store JSON objects representing each row
        const tableData = [];

        // Replace 'AppHistory' with the actual ID of your table row
        const rowId = 'AppHistory';
    
        // Wait for the table row to be present (you might need to adjust the timeout)
        const rowLocator = By.id(rowId);
        const row = await driver.wait(until.elementLocated(rowLocator), 2000);
    
        // Read the content of the table row
        const rowData = await row.getText();
    
        // If the table row contains multiple columns, you might want to get the text of specific cells
        const cellLocator = By.tagName('td');
        const cells = await row.findElements(cellLocator);
        
        for (let j=0; j < headerNames.length;j++){
          const cellText = await cells[j].getText().catch(() => ''); // Handle undefined cells
          rowData[headerNames[j]] = cellText;
          emailBody = emailBody + headerNames[j] + ':' + cellText + '\n';
          console.log(headerNames[j] + ':', cellText);
        }
        emailBody += '\n';
        // Add the JSON object to the array
        tableData.push(rowData);
      } catch (error){
        console.log("Error for reference number: " + refNo);
        emailBody = emailBody + refNo + " - error";
        emailBody += '\n';
      }
    }

    // if (sendEmail){
    //   // Send email
    //   sendEmails("EPIC status update.",emailBody);
    // }

    await driver.wait(until.titleIs("Rags"), 60000);

  } finally {
    await driver.quit();
    console.log('Quitting');
  }
}
