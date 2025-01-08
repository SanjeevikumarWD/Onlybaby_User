import Order from "../models/orderSchema.model.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import twilio from "twilio";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Your Twilio WhatsApp number
const storeOwnerNumber = process.env.STORE_OWNER_WHATSAPP;
const client = twilio(accountSid, authToken);

// Save or Update Draft Order
export const saveOrUpdateDraftOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, itemsPrice } = req.body;
    const totalPrice = itemsPrice;

    // Find the user's order document
    let userOrder = await Order.findOne({ user });


    if (!userOrder) {
      // Create a new order document for the user if it doesn't exist
      userOrder = await Order.create({
        user,
        orders: [],
      });
    }

    console.log(" orders for shipping fee", userOrder)

    // Check if the user has a purchase history
    const hasPurchasedBefore = userOrder.orders.length > 0;

    console.log(" orders for shipping fee", userOrder.orders)


    // Determine the shipping fee
    const shippingFee = hasPurchasedBefore ? 50 : 0;

    // Check for an existing draft order
    const draftOrderIndex = userOrder.orders.findIndex(
      (order) => order.isDraft
    );

    const newOrder = {
      orderItems: orderItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        quantity: item.cartQuantity || item.quantity,
        discount: item.discount || 0,
      })),
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        country: shippingAddress.country || "India", // Default value
        streetAddress: shippingAddress.streetAddress,
        apartment: shippingAddress.apartment || "",
        city: shippingAddress.city,
        state: shippingAddress.state,
        postcode: shippingAddress.postcode,
        phone: shippingAddress.phone,
        email: shippingAddress.email,
      },
      totalPrice: totalPrice + shippingFee, // Include shipping fee in total price
      shippingFee, // Add shipping fee to the order object
      isDraft: true,
      draftExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
    };

    if (draftOrderIndex !== -1) {
      // Update existing draft order
      userOrder.orders[draftOrderIndex] = {
        ...userOrder.orders[draftOrderIndex],
        ...newOrder,
      };
    } else {
      // Add new draft order
      userOrder.orders.push(newOrder);
    }

    await userOrder.save();

    res.status(200).json({
      success: true,
      order: userOrder.orders[userOrder.orders.length - 1],
      shippingFee,
    });
  } catch (error) {
    console.error("Error in saveOrUpdateDraftOrder:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const initiatePayment = async (req, res) => {
 // check if user has previous order history if yes make
  try {
    const { user, itemsPrice, orderItems, addressId } = req.body;
    // Validate required fields
    if (!user || !itemsPrice || !orderItems || !addressId) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: user, itemsPrice, orderItems, addressId",
      });
    }


    // Check if orderItems is an array
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderItems format. It must be a non-empty array.",
      });
    }

    // Calculate total price
    const totalPrice = itemsPrice;

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order
    const options = {
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder || !razorpayOrder.id) {
      console.error("Failed to create Razorpay order.");
      return res.status(500).json({
        success: false,
        message: "Unable to create payment order. Please try again later.",
      });
    }

    // Find the user's order record
    let userOrder = await Order.findOne({ user });
    if (!userOrder) {
      console.log(
        "No existing order record found for user. Creating a new record."
      );
      userOrder = await Order.create({ user, orders: [] });
    }

    // Find the existing draft order
    const draftOrderIndex = userOrder.orders.findIndex(
      (order) => order.isDraft
    );

    if (draftOrderIndex !== -1) {
      // Update the existing draft order with payment details
      userOrder.orders[draftOrderIndex].payment = {
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: "pending",
      };

      userOrder.orders[draftOrderIndex].totalPrice = totalPrice; // Update price if needed
    } else {
      // No draft order found, create a new one
      const newOrder = {
        orderItems: orderItems.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          quantity: item.cartQuantity || item.quantity || 1,
          discount: item.discount || 0,
        })),
        shippingAddress: {
          firstName: addressId.firstName,
          lastName: addressId.lastName,
          country: addressId.country || "India",
          streetAddress: addressId.streetAddress,
          apartment: addressId.apartment || "",
          city: addressId.city,
          state: addressId.state,
          postcode: addressId.postcode,
          phone: addressId.phone,
          email: addressId.email,
        },
        totalPrice,
        isDraft: true,
        payment: {
          razorpayOrderId: razorpayOrder.id,
          paymentStatus: "pending",
        },
      };

      userOrder.orders.push(newOrder);
    }

    await userOrder.save();

    res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Error in initiatePayment:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


// export const verifyPayment = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

//     // Find the user's order that has the matching razorpayOrderId
//     const userOrder = await Order.findOne({
//       "orders.payment.razorpayOrderId": razorpayOrderId,
//     }).session(session);

//     if (!userOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Find the order in the user's order list
//     const orderIndex = userOrder.orders.findIndex(
//       (order) => order.payment.razorpayOrderId === razorpayOrderId
//     );

//     if (orderIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Draft order not found",
//       });
//     }

//     // Generate the payment signature and compare it with the received signature
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//       .digest("base64");

//     if (generatedSignature !== razorpaySignature) {
//       // Update payment status to failed if signatures do not match
//       userOrder.orders[orderIndex].payment = {
//         ...userOrder.orders[orderIndex].payment,
//         paymentStatus: "failed",
//         paymentMessage: "Invalid payment signature",
//       };
//       await userOrder.save();

//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     // Update the payment details and mark the order as paid
//     userOrder.orders[orderIndex].payment = {
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature,
//       isPaid: true,
//       paidAt: new Date(),
//       paymentStatus: "successful",
//       paymentMethod: "razorpay",
//     };

//     // Mark the order as no longer a draft
//     userOrder.orders[orderIndex].isDraft = false;

//     // Save the updated user order document
//     await userOrder.save();

//     const orderDetails = userOrder.orders[orderIndex];

//     // const orderDetails = userOrder.orders[orderIndex];
//     for (const item of orderDetails.orderItems) {
//       const product = await Product.findById(item._id).session(session);

//       if (!product || product.quantity < item.quantity) {
//         throw new Error(`Insufficient stock for product ${item.name}`);
//       }

//       await Product.findByIdAndUpdate(
//         item._id,
//         { $inc: { quantity: -item.quantity } },
//         { new: true, session }
//       );
//     }

//     // Save the updated user order document
//     await userOrder.save({ session });

//     const itemsList = orderDetails.orderItems
//       .map(
//         (item) => `${item.name} (x${item.quantity}): ₹${item.price.toFixed(2)}`
//       )
//       .join("\n");

//     // Debugging: log the parameters being sent
//     console.log({
//       razorpayOrderId,
//       orderDetails: orderDetails.shippingAddress,
//       itemsList,
//       totalPrice: `₹${orderDetails.totalPrice.toFixed(2)}`,
//       paidAt: new Date(orderDetails.payment.paidAt).toLocaleString(),
//     });

//     // Send the WhatsApp message using the approved template
//     await client.messages.create({
//       from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Twilio's WhatsApp-enabled number
//       to: `whatsapp:${process.env.STORE_OWNER_NUMBER}`, // Store owner's WhatsApp number
//       messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID, // Messaging service SID
//       contentSid: "HXd4103e91b4f8e046657ed37d945a35af", // Content template SID
//       template: {
//         name: "onlybaby", // Approved template name
//         language: { code: "en" }, // Template language
//         components: [
//           {
//             type: "body",
//             parameters: [
//               { type: "text", text: razorpayOrderId },  // {{1}} - Order ID
//               { type: "text", text: orderDetails.shippingAddress.firstName },  // {{2}} - First Name
//               { type: "text", text: orderDetails.shippingAddress.lastName },  // {{3}} - Last Name
//               { type: "text", text: orderDetails.shippingAddress.streetAddress },  // {{4}} - Address
//               { type: "text", text: orderDetails.shippingAddress.city },  // {{5}} - City
//               { type: "text", text: orderDetails.shippingAddress.state },  // {{6}} - State
//               { type: "text", text: orderDetails.shippingAddress.postcode },  // {{7}} - Postal Code
//               { type: "text", text: itemsList },  // {{8}} - Items List
//               { type: "text", text: orderDetails.shippingAddress.phone },  // {{9}} - Purchaser Number
//               { type: "text", text: `₹${orderDetails.totalPrice.toFixed(2)}` },  // {{10}} - Total Price
//               { type: "text", text: new Date(orderDetails.payment.paidAt).toLocaleString() },  // {{11}} - Paid At
//             ],
//           },
//         ],
//       },
//     });

//     await session.commitTransaction();
//     session.endSession();

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       order: userOrder.orders[orderIndex],
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.error("Error in verifyPayment:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const verifyPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;


    // Find the user's order that has the matching razorpayOrderId
    const userOrder = await Order.findOne({
      "orders.payment.razorpayOrderId": razorpayOrderId,
    }).session(session);

    if (!userOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Find the order in the user's order list
    const orderIndex = userOrder.orders.findIndex(
      (order) => order.payment.razorpayOrderId === razorpayOrderId
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Draft order not found",
      });
    }

    // Generate the payment signature and compare it with the received signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("base64");

   
   

    if (generatedSignature !== razorpaySignature) {
      // Update payment status to failed if signatures do not match
      userOrder.orders[orderIndex].payment = {
        ...userOrder.orders[orderIndex].payment,
        paymentStatus: "failed",
        paymentMessage: "Invalid payment signature",
      };
      await userOrder.save();

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Update the payment details and mark the order as paid
    userOrder.orders[orderIndex].payment = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      isPaid: true,
      paidAt: new Date(),
      paymentStatus: "successful",
      paymentMethod: "razorpay",
    };

    // Mark the order as no longer a draft
    userOrder.orders[orderIndex].isDraft = false;

    // Save the updated user order document
    await userOrder.save();

    const orderDetails = userOrder.orders[orderIndex];

    // const orderDetails = userOrder.orders[orderIndex];
    for (const item of orderDetails.orderItems) {
      const product = await Product.findById(item._id).session(session);

      if (!product || product.quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.name}`);
      }

      await Product.findByIdAndUpdate(
        item._id,
        { $inc: { quantity: -item.quantity } },
        { new: true, session }
      );
    }

    // Save the updated user order document
    await userOrder.save({ session });

    // Construct the message
    const itemsList = orderDetails.orderItems
      .map(
        (item) => `${item.name} (x${item.quantity}): ₹${item.price.toFixed(2)}`
      )
      .join("\n");

    const messageBody = `
📦 *New Order Received*
- *Order ID:* ${razorpayOrderId}
- *Customer Name:* ${orderDetails.shippingAddress.firstName} ${
      orderDetails.shippingAddress.lastName
    }
- *Shipping Address:*
- *Name:* ${orderDetails.shippingAddress.firstName} ${
      orderDetails.shippingAddress.lastName
    }
- *Address:* ${orderDetails.shippingAddress.streetAddress}
- *City:* ${orderDetails.shippingAddress.city}
- *State:* ${orderDetails.shippingAddress.state}
- *Postal Code:* ${orderDetails.shippingAddress.postcode}
- *Items:*
${itemsList}   
- *Purchaser Number:* ${orderDetails.shippingAddress.phone}
- *Total Price:* ₹${orderDetails.totalPrice.toFixed(2)}
- *Paid At:* ${new Date(orderDetails.payment.paidAt).toLocaleString()}
`;

    // Send the message via Twilio
    await client.messages.create({
      from: `whatsapp:${whatsappNumber}`, // Twilio's WhatsApp-enabled number
      to: `whatsapp:${storeOwnerNumber}`, // Store owner's WhatsApp number
      body: messageBody,
    });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: userOrder.orders[orderIndex],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in verifyPayment:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getOrderHistory = async (req, res) => {
  try {
    // Read the user ID from the query parameters for GET requests
    const { user } = req.query;

    // Ensure the user is provided
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find all orders related to the user
    const userOrders = await Order.find({ user }).sort({ createdAt: -1 });

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    // Filter out draft orders and sort by createdAt (descending)
    const orderHistory = userOrders
      .map((userOrder) => userOrder.orders) // Get all orders array from each userOrder
      .flat() // Flatten the array to get all individual orders
      .filter((order) => !order.isDraft) // Filter out draft orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date

    res.status(200).json({ success: true, orders: orderHistory });
  } catch (error) {
    console.error("Error in getOrderHistory:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCurrentDraftOrder = async (req, res) => {
  try {
    const { user } = req.query;
    const userOrder = await Order.findOne({ user });

    if (!userOrder) {
      return res.status(404).json({
        success: false,
        message: "No draft order found",
      });
    }

    const draftOrder = userOrder.orders.find((order) => order.isDraft);

    if (!draftOrder) {
      return res.status(404).json({
        success: false,
        message: "No draft order found",
      });
    }

    res.status(200).json({ success: true, order: draftOrder });
  } catch (error) {
    console.error("Error in getCurrentDraftOrder:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
