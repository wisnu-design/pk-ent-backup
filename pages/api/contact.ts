import { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "wisnubl1995@gmail.com",
      pass: "kjbipyfpjhqgbfre",
    },
  });

  const recipients = [email, "wisnubl1995@gmail.com"];

  const info = await transporter.sendMail({
    from: `"noreply@pk-ent.com" <${email}>`,
    to: recipients.join(", "),
    subject: subject,
    text: message,
    html: `
    <h1>Thank you for contacting us!</h1>
    <p>Dear ${name},</p>
    <br />
    <p>Here's your detail</p>
    <p>Name: ${name}<br />Email: ${email}<br />Phone Number: ${phone}<br /></p>
    <p>Message: </p>
    <p>${message}</p>
    <br />
    <p>Please dont reply this message, our team will contact you as soon as possible, thank you!</p>
    `,
  });

  console.log("Message sent: %s", info.messageId);

  res.status(200).json({ success: true });
}
