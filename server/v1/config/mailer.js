import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY
  })
);

const sendEmail = {
  async sendEmail(from, to, subject, html) {
    const sMail = await transport.sendMail({
      from, to, subject, html
    });
    return sMail;
  },
};

export default sendEmail;
