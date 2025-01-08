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
  const { orders, memberShip, shippingPrice } = useContext(ToyStore);
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

  console.log(" shipping fees ", shippingPrice);

  const subtotal = itemsPrice + shippingPrice;

  const discount = memberShip ? 0.1 * subtotal : 0; // 10% discount if memberShipis true
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

          await axios.post(`${serverUrl}/api/orders/verify`, {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: generatedSignature,
          });

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Bill Header */}
        <div className="bg-gray-800 text-white px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-gray-300 mt-1">Order Summary</p>
            </div>
            <button
              onClick={handleExit}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bill Content */}
        <div className="px-8 py-6">
          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Bill To:
              </h2>
              <p className="font-medium text-gray-700">{`${
                firstName || user.firstName
              } ${lastName || user.lastName}`}</p>
              <p className="text-gray-600">{email || user.email}</p>
              <p className="text-gray-600">{phone || "N/A"}</p>
              <p className="text-gray-600">{streetAddress || "N/A"}</p>
              <p className="text-gray-600">{`${city || "N/A"}, ${
                region || "N/A"
              }`}</p>
              <p className="text-gray-600">{country || "N/A"}</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Details:
              </h2>
              <p className="text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Order ID: #
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-gray-600">Item</th>
                  <th className="text-center py-3 px-2 text-gray-600">Qty</th>
                  <th className="text-right py-3 px-2 text-gray-600">Price</th>
                  <th className="text-right py-3 px-2 text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100">
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Color: {item.color}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="text-right py-4 px-2 text-gray-700">
                      ₹{item.price}
                    </td>
                    <td className="text-right py-4 px-2 text-gray-700">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bill Summary */}
          <div className="border-t border-gray-200 pt-8">
            <div className="w-full md:w-1/2 ml-auto">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}
                  </span>
                </div>
                {memberShip && (
                  <div className="flex justify-between text-green-600">
                    <span>Membership Discount</span>
                    <span>- ₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="px-8 py-6 bg-gray-50">
          <button
            onClick={handlePayment}
            className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Proceed to Payment</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
