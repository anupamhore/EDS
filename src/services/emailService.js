const sgMail = require('@sendgrid/mail');
const EmailRequest = require('../models/emailRequest');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (emailRequest) =>{

    const msg = {
        to: emailRequest.to,
        from: 'anupam.hore@yahoo.com',
        subject: emailRequest.subject,
        text: emailRequest.body
    };

    try {
        
        await sgMail.send(msg);
        await EmailRequest.findByIdAndUpdate(emailRequest._id, {status: "Sent"});
    } catch (error) {
        console.error("Error sending email:", error);
        await EmailRequest.findByIdAndUpdate(emailRequest._id, { status: "Failed"});
    }
}

module.exports = {sendEmail};