import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmail_user,
    pass: config.gmail_pass,
  },
});

export const sendEmail = async (email, attachments = []) => {
  await transporter.sendMail({
    from: "Ecommerce<ecommercecoderhouse@gmail.com>",
    to: email.to,
    subject: email.subject,
    html: email.html,
    attachments,
  });
};
