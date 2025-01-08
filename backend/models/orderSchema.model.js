import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orders: [
      {
        orderItems: [
          {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            image: [String],
            color: String,
            quantity: {
              type: Number,
              required: true,
            },
            discount: {
              type: Number,
              default: 0,
            },
          },
        ],
        shippingAddress: {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          streetAddress: {
            type: String,
            required: true,
          },
          apartment: String,
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          postcode: {
            type: String,
            required: true,
          },
          phone: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
        },
        totalPrice: {
          type: Number,
          required: true,
          default: 0,
        },
        isDraft: {
          type: Boolean,
          default: true,
        },
        draftExpiresAt: {
          type: Date,
          default: () => new Date(Date.now() + 1 * 60 * 1000), // Expiry set to 1 minute from now
        },
        isDelivered: {
          type: Boolean,
          default: false,
        },
        deliveredAt: Date,
        payment: {
          razorpayOrderId: String,
          razorpayPaymentId: String,
          razorpaySignature: String,
          isPaid: {
            type: Boolean,
            default: false,
          },
          paidAt: Date,
          paymentMethod: {
            type: String,
            default: "razorpay",
          },
          paymentStatus: {
            type: String,
            enum: ["pending", "successful", "failed"],
            default: "pending",
          },
          transactionId: String,
          paymentMessage: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create TTL index for automatic deletion
orderSchema.index({ draftExpiresAt: 1 }, { expireAfterSeconds: 0 });

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

export default Order;
