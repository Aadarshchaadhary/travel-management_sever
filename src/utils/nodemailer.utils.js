import nodemailer from "nodemailer";
import AppError from "../middlewares/error-handler.middlewares.js";
//  transporter
const transporter = nodemailer.createTransport({
  host: "stmp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "adarshry869@gmail.com",
    pass: "ispq jano hphb mzjs",
  },
});

// * send email
export const send_email = async () => {
  try {
    await transporter.sendMail({
      from: `"Travel management"<adarshry869@gmail.com>`,
      to: "chaudharyaadarsh003@gmail.com",
      subject: "testing Email",
      html: `<body>style:'background-color:Blue',
            <h1 style='color:red'>Email testing sucess🙀👍🏻 </h1>
            </body>
            `,
    });
  } catch (error) {
    console.log(error);
    throw new AppError("Email sending error", 500);
  }
};
