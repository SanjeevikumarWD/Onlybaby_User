import express from "express";	
import { checkMembershipStatus, initiateMembershipPayment, verifyMembershipPayment } from "../controllers/membership.controller.js";


const router = express.Router();

router.post("/initiate", initiateMembershipPayment);
router.post("/verify", verifyMembershipPayment);
router.post("/fetch", checkMembershipStatus);


export default router;