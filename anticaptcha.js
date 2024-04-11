const axios = require('axios');
const fs = require('fs');

// Anti-captcha API Key
const antiCaptchaAPIKey = "99da272315c150aa5d7d7e161155bb51"; //rishibaul123@gmail.com

// This function takes a file which contains a captcha and returns the solved catpcha string 
async function solveCaptchaFromFile(imagePath) {
  try {
    // Read image file as base64
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

    // Create task
    const response = await axios.post('http://api.anti-captcha.com/createTask', {
      clientKey: antiCaptchaAPIKey,
      task: {
        type: 'ImageToTextTask',
        body: imageBase64,
        phrase: false,
        case: false,
        numeric: 0,
        math: 0,
        minLength: 0,
        maxLength: 0,
      },
    });

    if (response.data && response.data.errorId) {
      console.error('Error:', response.data.errorDescription);
      return null;
    }

    const taskId = response.data.taskId;
    console.log('Captcha task created. Task ID:', taskId);

    // Poll for solution
    let solution = null;
    while (!solution) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before polling again

      const solutionResponse = await axios.post('http://api.anti-captcha.com/getTaskResult', {
        clientKey: antiCaptchaAPIKey,
        taskId: taskId,
      });

      if (solutionResponse.data && solutionResponse.data.status === 'ready') {
        solution = solutionResponse.data.solution.text;
      } else if (solutionResponse.data && solutionResponse.data.status === 'processing') {
        console.log('Captcha still processing. Retrying...');
      } else {
        console.error('Error solving captcha:', solutionResponse.data && solutionResponse.data.errorDescription);
        return null;
      }
    }

    console.log('Captcha solved:', solution);
    return solution;
  } catch (error) {
    console.error('Error solving captcha:', error.message);
    return null;
  }
}

module.exports = solveCaptchaFromFile;