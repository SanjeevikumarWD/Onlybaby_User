import { emailTemplates } from "./emailTemplates.js";
import { sendMail, transporter } from "./mailGenerate.js";

export const sendVerificationEmail = async(email,name,verificationToken) => {
    try{
        const recipient = email;
        const mailOptions = {
            from : {
                name : "Toy Store",
                address:process.env.USER,
            },
            to : "keerthivasan0015@gmail.com",
            subject : "Verify your email address",
            html: emailTemplates.verifyEmail({
                name : name,
                otp: verificationToken,  
            })
        }
        await sendMail(transporter,mailOptions);  
    }catch(error){
        console.log("Error in sending verification email",error.message);
        throw new Error(error.message);
    }
}

export const sendWelcomeEmail = async(email,name) => {
    try{
        const recipient = email;
        const mailOptions = {
            from : {
                name : "Toy Store",
                address:process.env.USER,
            },
            to : email,
            subject : "Welcome to Toy Store",
            html: emailTemplates.welcome({
                name : name,
            })
        }
        await sendMail(transporter,mailOptions);
    }catch(error){
        console.log("Error in sending welcome email",error.message);
        throw new Error(error.message);
    }
}

export const sendResetPasswordEmail = async(email,resetURL) => {
    try{
        const recipient = email;
        const mailOptions ={
            from : {
                name : "Toy Store",
                address:process.env.USER,
            },
            to : email,
            subject : "Reset your password",
            html: emailTemplates.resetPasswordButton({
                name : "Keerthivasan",
                resetURL : resetURL,
            })
        }
        await sendMail(transporter,mailOptions);
    }catch(error){
        console.log("Error in sending reset password email",error.message);
        throw new Error(error.message);
    }
}


export const sendResetSuccessEmail = async(email) => {
    try{
        const recipient = email;
        const mailOptions = {
            from : {
                name : "Toy Store",
                address:process.env.USER,
            },
            to : email,
            subject : "Password Reset Successful",
            html: emailTemplates.resetSuccess({
                name : "Keerthivasan",
            })
        }
        await sendMail(transporter,mailOptions);
    }catch(error){
        console.log("Error in sending reset success email",error.message);
        throw new Error(error.message);
    }   
}