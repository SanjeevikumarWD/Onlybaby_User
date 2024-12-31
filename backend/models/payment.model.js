import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        razorpayOrderId: {
            type: String, // Razorpay order ID to track payment
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
