import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import CryptoJS from "crypto-js";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ToyStore } from "../context/ContextApi";

const PaymentConfirmation = () => {
  const { state } = useLocation();
  const { user } = useAuthStore.getState();
  const navigate = useNavigate();
  const { orders, memberShip, shippingPrice} = useContext(ToyStore);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const {
    orderItems = [],
    shippingAddress = {},
    itemsPrice,
  } = state?.orderData || {};

  const {
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    city,
    state: region,
    country,
  } = shippingAddress;

  const isFirstOrder = orders.length === 0;
  const subtotal = itemsPrice + shippingPrice;

  const discount = memberShip? 0.1 * subtotal : 0; // 10% discount if memberShipis true
  const grandTotal = subtotal - discount;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const handlePayment = async () => {
    try {
      const paymentResponse = await axios.post(
        `${serverUrl}/api/orders/initiate`,
        {
          itemsPrice: grandTotal, // Use the discounted total
          // shippingPrice: finalShippingPrice + 1,
          addressId: shippingAddress,
          user: user,
          orderItems,
        }
      );

      const razorpayOrder = paymentResponse.data;
      const options = {
        key: "rzp_test_VChoBnFDlKAiHL", // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.razorpayOrderId,
        handler: async (response) => {
          const razorpay_order_id = response.razorpay_order_id;
          const razorpay_payment_id = response.razorpay_payment_id;

          const generateSignature = (order_id, payment_id, secret) => {
            const data = order_id + "|" + payment_id;
            return CryptoJS.HmacSHA256(data, secret).toString(
              CryptoJS.enc.Base64
            );
          };

          const razorpaySecretKey = "aW7400zinaUgRUcCIQiTUqUy";
          const generatedSignature = generateSignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpaySecretKey
          );

          await axios.post(
            `${serverUrl}/api/orders/verify`,
            {
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: generatedSignature,
            }
          );

          navigate("/"); // Navigate to homepage after successful verification
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phone,
        },
        theme: { color: "#F37254" },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  const handleExit = () => {
    toast.success(`Order cancelled successfully`);
    navigate("/");
  };

  return (
    <motion.div
      className="container mx-auto p-6 lg:p-10 relative mt-14 mb-18"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-8 text-center">
        Payment Confirmation
      </h2>

      {/* Billing Details */}
      <motion.div
        className="bg-white text-black shadow-xl rounded-lg p-8 pb-20 mb-8 relative"
        variants={itemVariants}
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Billing Details
        </h3>
        <button
          onClick={handleExit}
          className="absolute top-7 right-5 text-4xl text-gray-800 hover:text-red-600"
        >
          <span>&times;</span>
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "First Name", value: firstName || user.firstName },
            { label: "Last Name", value: lastName || user.lastName },
            { label: "Email", value: email || user.email },
            { label: "Phone", value: phone || "N/A" },
            { label: "Address", value: streetAddress || "N/A" },
            { label: "City", value: city || "N/A" },
            { label: "State", value: region || "N/A" },
            { label: "Country", value: country || "N/A" },
          ].map((detail, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-60 p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                  {detail.label}
                </p>
                <p className="text-xl font-medium text-gray-800 mt-1">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Order Details */}
      <motion.div
        className="bg-white shadow-xl rounded-lg p-8 mb-8"
        variants={itemVariants}
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Order Details
        </h3>
        <ul className="divide-y divide-gray-200 text-gray-700">
          {orderItems.map((item) => (
            <motion.li key={item._id} className="flex items-center py-6">
              <motion.img
                src={item.image[0]}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg shadow-md mr-6"
              />
              <div className="ml-4">
                <h4 className="text-xl font-medium text-gray-800">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Color: {item.color}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity: {item.quantity}
                </p>
                <p className="text-base font-semibold text-gray-900 mt-2">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 space-y-4">
          <p className="text-lg font-medium text-gray-800">
            <strong>Items Total:</strong> ₹{itemsPrice}
          </p>
          <p className="text-lg font-medium text-gray-800">
            <strong>Shipping Price:</strong>{" "}
            {shippingPrice === 0 ? (
              <span>
                <del>₹0</del>{" "}
                <span className="text-green-600">Free</span>
              </span>
            ) : (
              `₹${shippingPrice}`
            )}
          </p>
          {memberShip&& (
            <p className="text-lg font-medium text-gray-800">
              <strong>Membership Discount:</strong>{" "}
              <span className="text-green-600">- ₹{discount.toFixed(2)}</span>
            </p>
          )}
          <p className="text-2xl font-bold text-gray-900">
            <strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#1a202c" }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
        className="bg-black text-white py-3 px-6 rounded-lg w-full max-w-md mx-auto block text-lg font-medium"
      >
        Proceed to Pay
      </motion.button>
    </motion.div>
  );
};

export default PaymentConfirmation;
