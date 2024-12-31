import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: false, // Payment ID will be set after verification
  },
  razorpaySignature: {
    type: String,
    required: false, // Signature will be set after verification
  },
  paymentStatus: {
    type: String,
    default: "pending", // Can be 'pending', 'successful', or 'failed'
  },
  paymentMethod: {
    type: String,
    required: false, // Will store the payment method (e.g., "razorpay")
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
    required: false, // Date when payment is made
  },
});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
