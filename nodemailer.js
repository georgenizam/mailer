const nodemailer = require('nodemailer');

// const defaultConfig = "smtp://nodemailer123test@gmail.com:nodemailer@smtp.gmail.com";

const transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 8,
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // if port 465  - true
  auth: {
      user: 'nodemailer123test@gmail.com',
      pass: 'nodemailer'
  }
  // defaultConfig
});

transporter.verify((error, success) => {
  error ? console.log(error): console.log('Server is ready: ', success);
})

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email send: ', info);
  });
}

module.exports = mailer;