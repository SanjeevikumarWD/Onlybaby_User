import express from "express";
import { forgotPassword, login, logOut, resetPassword, signUp, verifyEmail } from "../controllers/user.controller.js";


const router = express.Router();


router.post("/signup",signUp);
router.post("/login",login);
router.post("/logout",logOut);
router.post("/verifyEmail",verifyEmail);

router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword/:token",resetPassword);

export default router;