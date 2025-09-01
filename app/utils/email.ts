import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});

export const sendOTP = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Note App',
    text: `Your OTP is: ${otp}`,
  };
  
  await transporter.sendMail(mailOptions);
};