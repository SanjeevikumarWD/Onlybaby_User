import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import crypto from "crypto";
import { sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../Mail/mail.js";
export const signUp = async(req,res) => {
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const verificationToken = Math.floor(100000+Math.random()*900000).toString();


        const user = await User.create({
            name : username,
            email,
            password : hashedPassword,
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000
        })

        await user.save();

        generateTokenAndSetCookie(res,user._id);
        
        await sendVerificationEmail(user.email,user.username,verificationToken);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user : {
                ...user._doc,
                password:undefined
            },
        })
    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const verifyEmail = async(req,res) => {
    try{
        const {code} = req.body;
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt : {$gt : Date.now()}
        });
        console.log(user);
        if(!user){
            return res.status(400).json({success:false,message:"Invalid verification token"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({success:true,message:"Email verified successfully",
            user : {
                ...user._doc,
                password:undefined
            }
        });

    }catch(error){
        console.log("Error in verifyEmail controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false,messge : "All fields are required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false,message : "Invalid credentials"});
        }

        const isPasswordMatch = await bcryptjs.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({success:false,message : "Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin = Date.now();

        await user.save();

        res.status(200).json({
            success:true,
            message : "User logged in successfully",
            user : {
                ...user._doc,
                password : undefined,
            }
        });
    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const forgotPassword = async(req,res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success:false,message : "Email is required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message : "User not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 10*60*1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendResetPasswordEmail(user.email,`${process.env.CLIENT_URL}/resetPassword/${resetToken}`);

        res.status(200).json({success:true,message : "Password reset link sent to your email"});
    }catch(error){
        console.log("Error in forgot password controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const resetPassword = async(req,res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiresAt : {$gt : Date.now()}
        });

        if(!user){
            return res.status(400).json({success:false,message : "Invalid token"});
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:true,message : "Password reset successfully"});
    }catch(error){
        console.log("Error in reset password controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const logOut = async(req,res) => {
    res.clearCookie("token");
    res.status(200).json({success:true,message : "User logged out successfully"});
}