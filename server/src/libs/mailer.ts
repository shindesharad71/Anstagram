import dotenv from "dotenv";
import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

dotenv.config();

const emailConfirmationBodyPath = path.join(__dirname, '../../confirmEmail.html');

const sendVerificationMail = async () => {
    try {

        const emailBody = await prepareEmailBody();
        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'shindesharad71@gmail.com', // list of receivers
            subject: "Hello ✔", // Subject line
            text: emailBody, // plain text body
            html: emailBody // html body
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        throw error;
    }
};

const prepareEmailBody = async () => {
    try {
        let emailBody = await fs.readFileSync(emailConfirmationBodyPath, 'utf8');
        emailBody = emailBody.replace(/{{ firstName }}/g, 'Sharad');
        return emailBody;
    } catch (error) {
        throw error;
    }
};

export { sendVerificationMail };
