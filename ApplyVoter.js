// import { Voter } from "./DataTypes/Voter";

import { Builder, By, Key, Select, until } from "selenium-webdriver";
import fs from 'fs';
// const https = require('https');
// const assert = require("assert");

// const solveCaptchaFromFile = require("./anticaptcha");
// const sendEmails = require("./sendemails");
// const downloadImageFromPage = require("./utils");
// import {Voter} from './DataTypes/Voter';
// Switch to send Email or not
const sendEmail = true;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


function saveBase64ImageToFile(base64String, filePath) {
    // Remove the header (data:image/png;base64,) from the base64 string
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

    // Convert base64 string to a buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Write buffer to file
    fs.writeFile(filePath, buffer, (error) => {
        if (error) {
            console.error('Error saving image:', error);
        } else {
            console.log('Image saved successfully!');
        }
    });
}

export const ApplyVoter = async (formData) => {
    // let emailBody = "Latest Vehicle RTO Status is below:" + "\r\n";

    console.log("formDara"+formData);

    try{
    // console.log("in server"+JSON.stringify(await formData));
    const aadhaarImage = formData.aadhaarPhoto; // Assuming the image is sent in the request body
    const aadhaarPath = '/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/aadhaar.JPG'; // Set the path where you want to save the image

    // const aadhaarbuffer = Buffer.from(aadhaarImage, 'base64');
    //  fs.writeFileSync(aadhaarPath, aadhaarbuffer, (err) => {
    //     if (err) {
    //         console.error('Error saving image:', err);
    //         res.status(500).send('Error saving image');
    //     } else {
    //         console.log('Image saved successfully:', aadhaarPath);
    //         res.status(200).send('Image saved successfully');
    //     }
    // })

    const photographPath = '/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/Photograph.JPG';
    // const photographimage = formData.Photograph; // Assuming the image is sent in the request body
    
    // // Convert base64 image data to binary buffer
    // const buffer = Buffer.from(photographimage, 'base64');

    // // Write the buffer to a file
    // fs.writeFileSync(photographPath, buffer, (err) => {
    //     if (err) {
    //         console.error('Error saving image:', err);
    //         res.status(500).send('Error saving image');
    //     } else {
    //         console.log('Image saved successfully:', photographPath);
    //         res.status(200).send('Image saved successfully');
    //     }
    // })

    saveBase64ImageToFile(await formData.photograph,photographPath);
    saveBase64ImageToFile(await formData.aadhaarPhoto,aadhaarPath);
}
catch(error){
    console.log(error)
}

    try {
       

        
        const email = "rishibaul2001@gmail.com";
        const password = "Nirvanarishi@123"
        const state = "Karnataka";
        const district = "BANGALORE URBAN";
        const area = "Mahadevpura";
        const firstName = "Rishi";
        const lastName = "Baul"
        const Photograph = '/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/Pic.JPG';
        const contact = "Self";
        const contactNumber = "8944034390";
        const emailof = "Self";
        // const relative = "Father";
        const relativeFirstName = "Rana";
        const relativeLastName = "Baul";
        const aadhaarNumber = "614883977851";
        const dob = "30-11-2001";
        const docProofName = "Aadhaar Card";
        const aadhaarPhoto = "/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/Rishi baul_HOF_document-2.pdf";
        const house = "Baul Niwas";
        const areaLocality = "Rajib Nagar";
        const villageTown = "Hasimara";
        const post = "Old Hasimara";
        const pincode = "560037";
        const tehsil = "Unknown";
        const proofOfResidence = "Aadhaar Card";
        const birthVillage = "Mahadevpura";
        const birthState = "Karnataka";
        const birthDistrict = "BANGALORE URBAN";
        const livingSince = "11-2023";
        const placeOfSignature = "Bangalore";

        let noStatus = false;

        // do {
        // launch the browser
        let driver = await new Builder().forBrowser("chrome").build();

        //navigate to Aadhaar updates status page
        if (driver.getCurrentUrl() != "https://voters.eci.gov.in/login") {
            await driver.get("https://voters.eci.gov.in/login");
        }

        //  
        await sleep(2000);
        const emailField = driver.wait(until.elementLocated(By.xpath('//*[@id="loginId"]/div/div[2]/div[2]/div/form/div/div[3]/div[1]/div[2]/div/input')));
        emailField.sendKeys(formData.email);
        const passwordField = driver.wait(until.elementLocated(By.xpath('//*[@id="loginId"]/div/div[2]/div[2]/div/form/div/div[3]/div[2]/div[2]/div/input')));
        passwordField.sendKeys(formData.password);

        const requestOtpButton = driver.wait(until.elementLocated(By.xpath('//*[@id="loginId"]/div/div[2]/div[2]/div/form/div/div[3]/button')));
        // Create an Actions object

        const requestActions = driver.actions({ bridge: true });
        // Hover the mouse over the button
        await requestActions.move({ duration: 1000, origin: requestOtpButton }).perform();
        // Click on the button
        await requestOtpButton.click();
        await sleep(10000);

        // if (driver.getCurrentUrl() != "https://tathya.uidai.gov.in/access/login?role=resident") {
        //     await driver.get("https://tathya.uidai.gov.in/access/login?role=resident");
        // }
        await sleep(25000);
        // Define the XPath of the image element
        const loginCaptapath = '//*[@id="loginId"]/div/div[2]/div[2]/div/form/div/div[3]/div[4]/div/div[1]/div[1]/img';

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
        // await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div/div[2]/form/div/div[2]/div[1]/div/div/div/input`)).sendKeys(captchaText);
        try {
            if (await driver.getCurrentUrl() != "https://voters.eci.gov.in/Homepage")
                await driver.get("https://voters.eci.gov.in/Homepage")

            console.log(await driver.getCurrentUrl());
            const form6Button = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div/div[2]/div[3]/div[1]/div/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/button')));

            const formActions = driver.actions({ bridge: true });
            // Hover the mouse over the button
            await formActions.move({ duration: 1000, origin: form6Button }).perform();
            // Click on the button
            await form6Button.click();

            await sleep(12000);

            if (await driver.getCurrentUrl() != "https://voters.eci.gov.in/form6")
                await driver.get("https://voters.eci.gov.in/form6");

            console.log(await driver.getCurrentUrl());
            const stateField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[1]/div[2]/div[1]/div/div[2]/div/select')));
            stateField.sendKeys(formData.state);

            await sleep(2000);

            const districtField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[1]/div[2]/div[2]/div/div[2]/div/select')));
            districtField.sendKeys(formData.district);

            await sleep(2000);

            const areaField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[1]/div[4]/div[3]/div/select')));
            areaField.sendKeys(formData.area);
            await sleep(2000);

            const next1Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[1]/div[8]/button')));

            const next1Actions = driver.actions({ bridge: true });
            // Hover the mouse over the button
            await next1Actions.move({ duration: 1000, origin: next1Button }).perform();
            // Click on the button
            await next1Button.click();
            await sleep(2000);

            const firstNameField = await driver.wait(until.elementLocated(By.xpath('//*[@id="firstB"]')));
            firstNameField.sendKeys(formData.firstName);

            const lastNameField = await driver.wait(until.elementLocated(By.xpath('//*[@id="fNameR"]')));
            lastNameField.sendKeys(formData.lastName);

            const photographPath = '/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/Photograph.JPG';
            const photoField = await driver.wait(until.elementLocated(By.xpath('//*[@id="upload-image"]')));
            photoField.sendKeys(photographPath);
            await sleep(1000);

            const save1Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="customModal"]/div/div[2]/div/div[2]/button[1]')));
            await save1Button.click();
            await sleep(7000);

            const okButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="customModal"]/div/div[2]/button')));
            await okButton.click();
            await sleep(2000);

            const next2Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[2]/div[4]/button[2]')));
            const next2Actions = driver.actions({ bridge: true });
            await next2Actions.move({ duration: 1000, origin: next2Button }).perform();
            await next2Button.click();
            await sleep(2000);

            // Click on Relative Button
            const relativeButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="relatives"]')));
            await relativeButton.click();
            await sleep(2000);

            // Fill Relative's First Name
            const relativeFirstNameField = await driver.wait(until.elementLocated(By.xpath('//*[@id="fNameSur"]')));
            relativeFirstNameField.sendKeys(formData.relativeFirstName);

            // Fill Relative's Last Name
            const relativeLastNameField = await driver.wait(until.elementLocated(By.xpath('//*[@id="fNameSurname"]')));
            relativeLastNameField.sendKeys(formData.relativeLastName);
            await sleep(2000);

            // Click on Next 3 Button
            const next3Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[3]/div[3]/button[2]')));
            const next3Actions = driver.actions({ bridge: true });
            await next3Actions.move({ duration: 1000, origin: next3Button }).perform();
            await next3Button.click();
            await sleep(2000);

            // Fill Self/Relative Contact Details
            const contactselfButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[4]/div[2]/div[1]/div[1]/div/input')));
            await contactselfButton.click();
            await sleep(1000);

            // Fill Contact Number
            const contactNumberField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[4]/div[2]/div[1]/div[3]/div/div[2]/div/input')));
            contactNumberField.sendKeys(formData.contactNumber);

            const emailselfButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[4]/div[2]/div[2]/div[1]/div/input')));
            await emailselfButton.click();
            await sleep(1000);

            // Fill Confirm Email Address
            const enterEmailField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[4]/div[2]/div[2]/div[3]/div/div[2]/div/input')));
            enterEmailField.sendKeys(formData.email);
            await sleep(1000);

            // Click on Next 4 Button
            const next4Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[4]/div[3]/button[2]')));
            const next4Actions = driver.actions({ bridge: true });
            await next4Actions.move({ duration: 1000, origin: next4Button }).perform();
            await next4Button.click();
            await sleep(2000);

            // Click on Aadhaar Check
            const aadhaarCheckField = await driver.wait(until.elementLocated(By.xpath('//*[@id="aadhaarno"]')));
            await aadhaarCheckField.click();

            // Fill Aadhaar Number
            const aadhaarNumberField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[5]/div[2]/div/div[5]/div/div[2]/div/input')));
            aadhaarNumberField.sendKeys(formData.aadhaarNumber);
            await sleep(2000);

            // Click on Next 5 Button
            const next5Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[5]/div[3]/button[2]')));
            const next5Actions = driver.actions({ bridge: true });
            await next5Actions.move({ duration: 1000, origin: next5Button }).perform();
            await next5Button.click();
            await sleep(2000);

            // Click on Gender (Male)
            const genderMaleField = await driver.wait(until.elementLocated(By.xpath('//*[@id="gender"]')));
            await genderMaleField.click();
            await sleep(2000);

            // Click on Next 6 Button
            const next6Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[6]/div[3]/button[2]')));
            const next6Actions = driver.actions({ bridge: true });
            await next6Actions.move({ duration: 1000, origin: next6Button }).perform();
            await next6Button.click();
            await sleep(2000);

            // Fill Date of Birth
            const dobField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[7]/div[2]/div/div[2]/input')));
            dobField.sendKeys(formData.dob.split("-").reverse().join("-"));

            // Click on Document Proof Check
            const docProofField = await driver.wait(until.elementLocated(By.xpath('//*[@id="ageDocument"]')));
            await docProofField.click();

            // Select Document Proof Name (Aadhaar Card)
            const docProofNameField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[7]/div[3]/div[1]/div/div[2]/div/div[2]/div/select')));
            docProofNameField.sendKeys(formData.docProofName);

            // Upload Aadhaar Photo
            const aadhaarPath = '/Users/rishinirvana/Code/Docupro/docupro-submitter-svc/Photographs/aadhaar.JPG';
            const aadhaarPhotoField = await driver.wait(until.elementLocated(By.xpath('//*[@id="ageProof"]')));
            aadhaarPhotoField.sendKeys(aadhaarPath);
            await sleep(2000);

            // Click on Next 7 Button
            const next7Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[7]/div[5]/button[2]')));
            const next7Actions = driver.actions({ bridge: true });
            await next7Actions.move({ duration: 1000, origin: next7Button }).perform();
            await next7Button.click();
            await sleep(2000);

            // Fill Address Details
            const houseField = await driver.wait(until.elementLocated(By.xpath('//*[@id="doorD"]')));
            houseField.sendKeys(formData.house);

            // Fill Area/Locality
            const areaLocalityField = await driver.wait(until.elementLocated(By.xpath('//*[@id="areasD"]')));
            areaLocalityField.sendKeys(formData.areaLocality);

            // Fill Village/Town
            const villageTownField = await driver.wait(until.elementLocated(By.xpath('//*[@id="villageD"]')));
            villageTownField.sendKeys(formData.villageTown);

            // Fill Post
            const postField = await driver.wait(until.elementLocated(By.xpath('//*[@id="postH"]')));
            postField.sendKeys(formData.post);

            // Fill Pincode
            const pincodeField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[8]/div[2]/div[2]/div[2]/div/div[2]/div/input')));
            pincodeField.sendKeys(formData.pincode);

            // Fill Tehsil
            const tehsilField = await driver.wait(until.elementLocated(By.xpath('//*[@id="areasH"]')));
            tehsilField.sendKeys(formData.tehsil);
            await sleep(2000);

            const currenDistrict = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[8]/div[2]/div[3]/div[1]/div/div[2]/div/select')));
            currenDistrict.sendKeys(formData.district);
            await sleep(2000);

            // Click on Address Proof Document Check
            const addressProofDocField = await driver.wait(until.elementLocated(By.xpath('//*[@id="AddressProofDocument"]')));
            await addressProofDocField.click();

            // Select Proof of Residence (Aadhaar Card)
            const proofOfResidenceField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[8]/div[2]/div[5]/div[1]/div/div[2]/div/div[2]/div/select')));
            proofOfResidenceField.sendKeys(formData.proofOfResidence);
            await sleep(2000);
            const currentAddressProofField = await driver.wait(until.elementLocated(By.xpath('//*[@id="currentAddressProof"]')));
            currentAddressProofField.sendKeys(aadhaarPath);
            await sleep(2000);

            // Click on Next 8 Button
            const next8Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[8]/div[4]/button[2]')));
            const next8Actions = driver.actions({ bridge: true });
            await next8Actions.move({ duration: 1000, origin: next8Button }).perform();
            await next8Button.click();
            await sleep(2000);

            // Click on Next 9 Button
            const next9Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[9]/div[7]/button[2]')));
            const next9Actions = driver.actions({ bridge: true });
            await next9Actions.move({ duration: 1000, origin: next9Button }).perform();
            await next9Button.click();
            await sleep(2000);

            // Click on Next 10 Button
            const next10Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[10]/div[3]/button[2]')));
            const next10Actions = driver.actions({ bridge: true });
            await next10Actions.move({ duration: 1000, origin: next10Button }).perform();
            await next10Button.click();
            await sleep(2000);

            // Fill Birth Village
            const birthVillageField = await driver.wait(until.elementLocated(By.xpath('//*[@id="village"]')));
            birthVillageField.sendKeys(formData.birthVillage);

            // Select Birth State
            const birthStateField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[11]/div[2]/div[2]/div/div[2]/div/select')));
            birthStateField.sendKeys(formData.birthState);

            // Select Birth District
            const birthDistrictField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[11]/div[2]/div[3]/div/div[2]/div/select')));
            birthDistrictField.sendKeys(formData.birthDistrict);

            // Fill Living in Present Address Since
            const livingSinceField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[11]/div[3]/div/div/div/input')));
            livingSinceField.sendKeys(formData.livingSince);

            // Fill Place of Signature
            const placeOfSignatureField = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[11]/div[5]/div[1]/div/div[2]/div/input')));
            placeOfSignatureField.sendKeys(formData.placeOfSignature);
            await sleep(2000);

            // Click on Next 11 Button
            const next11Button = await driver.wait(until.elementLocated(By.xpath('//*[@id="form7main"]/div/form/div[11]/div[6]/button[2]')));
            const next11Actions = driver.actions({ bridge: true });
            await next11Actions.move({ duration: 1000, origin: next11Button }).perform();
            await next11Button.click();
            await sleep(2000);

            return "Website Ran Successfully";
        }
        catch (error) {
            await driver.quit();
            driver = await new Builder().forBrowser("chrome").build();
            console.log(error);
            noStatus = true;
            return error;
        }
        await sleep(6000);
    } finally {
        console.log('Quitting');
    }

}
// module.exports= ApplyVoter;

// ApplyVoter();

// https://voters.eci.gov.in/Homepage homepageurl
// //*[@id="textContent"]/div[1]/div[3]/div[1]/div/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/button form 6 button
// //*[@id="form7main"]/div/form/div[1]/div[2]/div[1]/div/div[2]/div/select select state
//  //*[@id="form7main"]/div/form/div[1]/div[2]/div[2]/div/div[2]/div/select select district
// //*[@id="form7main"]/div/form/div[1]/div[4]/div[3]/div/select select area
// //*[@id="form7main"]/div/form/div[1]/div[8]/button next1 button 

// //*[@id="firstB"] firstname with middlename
//  //*[@id="fNameR"]  lastname 

// //*[@id="upload-image"] image
// //*[@id="customModal"]/div/div[2]/div/div[2]/button[1] save button
// //*[@id="customModal"]/div/div[2]/button okbutton

// //*[@id="form7main"]/div/form/div[2]/div[4]/button[2] next2

// /html/body/div/div/div/div[3]/div/div[2]/div/div/form/div[3]/div[2]/div[1]/div[1]/div/input select relative check  
// //*[@id="fNameSur"] relative first name
// //*[@id="fNameSurname"] relative surname
// //*[@id="form7main"]/div/form/div[3]/div[3]/button[2] next 3

// //html/body/div/div/div/div[3]/div/div[2]/div/div/form/div[4]/div[2]/div[1]/div[1]/div/input self/relative contact details check
// //*[@id="form7main"]/div/form/div[4]/div[2]/div[1]/div[3]/div/div[2]/div/input number
// /html/body/div/div/div/div[3]/div/div[2]/div/div/form/div[4]/div[2]/div[2]/div[1]/div/input check
// //*[@id="form7main"]/div/form/div[4]/div[2]/div[2]/div[3]/div/div[2]/div/input email
// //*[@id="form7main"]/div/form/div[4]/div[3]/button[2] next 4

// //*[@id="aadhaarno"] aadhaar check
// //*[@id="form7main"]/div/form/div[5]/div[2]/div/div[5]/div/div[2]/div/input aadhaar number
// //*[@id="form7main"]/div/form/div[5]/div[3]/button[2] next 5

// //*[@id="gender"] gender male check
// //*[@id="form7main"]/div/form/div[6]/div[3]/button[2] next 6


// //*[@id="form7main"]/div/form/div[7]/div[2]/div/div[2]/input dob in yyyy-mm-dd
// //*[@id="ageDocument"] doc proof check
// //*[@id="form7main"]/div/form/div[7]/div[3]/div[1]/div/div[2]/div/div[2]/div/select doc proof name select (Aadhaar Card)
// //*[@id="ageProof"] aadhaar photo
// //*[@id="form7main"]/div/form/div[7]/div[5]/button[2] next 7

// //*[@id="doorD"] house/apartment
//  //*[@id="areasD"] area/locality
// //*[@id="villageD"] village/town
// //*[@id="postH"] post 
// //*[@id="form7main"]/div/form/div[8]/div[2]/div[2]/div[2]/div/div[2]/div/input pincode
// //*[@id="areasH"] tehsil
// //*[@id="form7main"]/div/form/div[8]/div[2]/div[3]/div[1]/div/div[2]/div/select district bangalore urban
// //*[@id="AddressProofDocument"] proof of residence check
// //*[@id="form7main"]/div/form/div[8]/div[2]/div[5]/div[1]/div/div[2]/div/div[2]/div/select (Aadhaar Card )
// //*[@id="currentAddressProof"] current address proof pic
// //*[@id="form7main"]/div/form/div[8]/div[4]/button[2] next 8

// //*[@id="form7main"]/div/form/div[9]/div[7]/button[2] next 9

// //*[@id="form7main"]/div/form/div[10]/div[3]/button[2] next 10
// //*[@id="village"] birth village
// //*[@id="form7main"]/div/form/div[11]/div[2]/div[2]/div/div[2]/div/select birth state
// //*[@id="form7main"]/div/form/div[11]/div[2]/div[3]/div/div[2]/div/select birth district
// //*[@id="form7main"]/div/form/div[11]/div[3]/div/div/div/input living in present address since
// //*[@id="form7main"]/div/form/div[11]/div[5]/div[1]/div/div[2]/div/input place of signature 

// //*[@id="form7main"]/div/form/div[11]/div[6]/button[2] next 11



//  https://www.pan.utiitsl.com/PAN_ONLINE/homeaddresschange.action // Pan Address Update



/*
    const image = req.body.image; // Assuming the image is sent in the request body
    const imagePath = 'path/to/save/image.jpg'; // Set the path where you want to save the image

    // Convert base64 image data to binary buffer
    const buffer = Buffer.from(image, 'base64');

    // Write the buffer to a file
    fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image');
        } else {
            console.log('Image saved successfully:', imagePath);
            res.status(200).send('Image saved successfully');
        }

*/