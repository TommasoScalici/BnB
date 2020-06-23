const nodemailer = require('nodemailer');

module.exports = function(to, subject, text, html, attachments) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'bnb.webandmobile@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        to: to,
        subject: subject,
        text: text,
        html: html,
        attachments : attachments
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            return console.log(`nodemailer error: ${error.message}`);
        console.log(`nodemailer e-mail sent: ${info.messageId} ${info.envelope}`);
    });
}