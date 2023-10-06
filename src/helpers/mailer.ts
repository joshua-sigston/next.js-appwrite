import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
  console.log(email, emailType, userId)
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log('hashedToken complete')
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        console.log('if statement complete')
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3fd364695517df",
              pass: "7383d58fd399cf"
              //TODO: add these credentials to .env file
            }
          });
          console.log('transport complete')

        const mailOptions = {
            from: 'joshua.sigston@outlook.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        console.log('mailOptions complete')

        const mailresponse = await transporter.sendMail(mailOptions);
        console.log(mailresponse)
        console.log('mailresponse complete')
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}