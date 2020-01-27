import * as dotenv from "dotenv";
import * as fs from 'fs';
import nodemailer from 'nodemailer';
import * as path from 'path';

dotenv.config();
const emailUser = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailSenderName = process.env.EMAIL_SENDER_NAME;

const emailConfirmationBodyPath = path.join(__dirname, '../../confirmEmail.html');

const sendVerificationMail = async (firstName: string, email: string, verificationLink: string) => {
    try {
        const emailBody = await prepareEmailBody(firstName, verificationLink);
        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPassword
            }
        });

        const mailOptions = {
            from: `"${emailSenderName}" <${emailUser}>`,
            to: email,
            subject: "Please Verify Your Email",
            text: emailBody,
            html: emailBody
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        throw error;
    }
};

const prepareEmailBody = async (firstName: string, verificationLink: string) => {
    try {
        let emailBody = await fs.readFileSync(emailConfirmationBodyPath, 'utf8');
        emailBody = emailBody.replace(/{{ firstName }}/g, firstName);
        emailBody = emailBody.replace(/{{ confirmationLink }}/g, verificationLink);
        return emailBody;
    } catch (error) {
        throw error;
    }
};

export { sendVerificationMail };
