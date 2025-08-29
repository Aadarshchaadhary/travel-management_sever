import nodemailer from "nodemailer";
import AppError from "../middlewares/error-handler.middlewares.js";
import { smtp_config } from "../config/config.js";

// * transporter
const transporter = nodemailer.createTransport({
  host: smtp_config.host,
  port: parseInt(smtp_config.port),
  secure: parseInt(smtp_config.port) === 465 ? true : false,
  service: smtp_config.user,
  auth: {
    user: smtp_config.user,
    pass: smtp_config.pass,
  },
});

// * send email
export const send_email = async (
  to,
  subject,
  html,
  cc = null,
  bcc = null,
  attachments = null
) => {
  try {
    const message_options = {
      from: `"Travel management"<adarshry869@gmail.com>`,
      to,
      subject,
      html,
    };
    if (cc) {
      message_options["cc"] = cc;
    }

    if (bcc) {
      message_options["bcc"] = bcc;
    }

    if (attachments) {
      message_options["attachments"] = attachments;
    }

    await transporter.sendMail(message_options);
  } catch (error) {
    console.log(error);
    throw new AppError("Email sending error", 500);
  }
};
