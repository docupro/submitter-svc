const nodemailer = require('nodemailer');

// Email options
const mailOptions = {
  from: 'rishibaul123@gmail.com',
//   to: ['dj@docupro.in','rags@docupro.in'],
to: 'rishibaul2001@gmail.com',
  subject: '',
  text: ''
};

async function sendEmails(subject, emailBody){
  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ragsdabbling@gmail.com',
      pass: 'lgrb dnck rhxr gpzx' // App password for Gmail
    }
  });

  mailOptions.subject = subject;
  mailOptions.text = emailBody;
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  return;
}

module.exports = sendEmails;