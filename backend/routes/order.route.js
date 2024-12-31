import express from "express";
import { saveOrUpdateDraftOrder, initiatePayment, verifyPayment, getOrderHistory } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/getOrderHistory", getOrderHistory);

router.post("/saveAddress", saveOrUpdateDraftOrder);

// Route to initiate payment
router.post("/initiate", initiatePayment);

// Route to verify payment
router.post("/verify", verifyPayment);


export default router;