const { Builder, By, Key, Select, until } = require("selenium-webdriver");
const fs = require('fs');
const https = require('https');
const assert = require("assert");

async function downloadImage(driver, xpath, destinationPath) {
  try {
      // Find the image element by its XPath
      const imageElement = await driver.findElement(By.xpath(xpath));
      
      // Get the src attribute of the image
      const imageSrc = await imageElement.getAttribute('src');
      console.log('Image source:', imageSrc);

      // Download the image
      const imageData = await new Promise((resolve, reject) => {
        https.get(imageSrc, (res) => {
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        });
    });
    // Write the image data to a file
    fs.writeFileSync(destinationPath, imageData);
    console.log('Image downloaded successfully!');
} catch (error) {
      console.error('Error downloading image:', error);
  }
}

async function downloadImageFromPage(driver, xpath, destinationPath) {
try {
      // Find the captcha element by its locator
      const captchaElement = await driver.findElement(By.xpath(xpath));

      // Take a screenshot of the captcha element
      const screenshot = await captchaElement.takeScreenshot();

      // Write the screenshot data to a file
      fs.writeFileSync(destinationPath, screenshot, 'base64');
      console.log('Captcha image captured successfully!');
} catch (error) {
    console.error('Error downloading image:', error);
}
}

module.exports = downloadImageFromPage;
