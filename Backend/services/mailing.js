import nodemailer from "nodemailer";
import "dotenv/config";
export const sendEmail = async ({ user, code }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emekachristian511@gmail.com",
        pass: process.env.PASS,
      },
    });
    transporter.sendMail(
      {
        from: "<emekachristian511@gmail.com>",
        to: user,
        subject: `Welcome `,
        text: "Copy your one-time passcode to verify your account ",
        html: `<!DOCTYPE> 
            <html>
              <body>
              <div>
                 <div style="text-align: center">
                 <h1 style="font-size: 30px; font-weight: 800; text-align: center">Welcome to tipme</h1>
                 </div>
                 <div>
                 <p style="text-align: center; font-weight: 500">Your Authentication code </p>
                 <h1 style="text-align: center;font-size: 50px; font-weight: 700">${code}</h1>
                 </div>
              </div>
              </body>
            </html>`,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  } catch (error) {
    return {
      error: true,
      message: "cannot send email",
  



  }
}};
