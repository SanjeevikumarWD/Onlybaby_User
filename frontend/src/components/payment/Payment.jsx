import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToyStore } from "../context/ContextApi";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const Payment = () => {
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
  });

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, singleProduct, setShowPayment, setCartClicked, setShippingPrice } = useContext(ToyStore);
  const navigate = useNavigate();
  const { user } = useAuthStore.getState();

  const isSingleProduct = singleProduct !== null;
  const orderItems = isSingleProduct ? [{ ...singleProduct, cartQuantity: 1 }] : cartItems;

  const calculateItemsPrice = (items) => {
    return items.reduce((total, item) => {
      const quantity = item.cartQuantity || item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  };

  const calculateShippingPrice = (address) => {
    return address.country === "USA" ? 30 : 50;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const itemsPrice = calculateItemsPrice(orderItems);
      const shippingPrice = calculateShippingPrice({ ...billingDetails, country: "India" });

      const orderData = {
        user: user,
        orderItems: orderItems.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          quantity: item.cartQuantity || 1,
          discount: item.discount || 0,
        })),
        shippingAddress: {
          ...billingDetails,
          country: "India",
          apartment: "",
        },
        itemsPrice,
        shippingPrice,
      };


      const response = await axios.post(
        `${serverUrl}/api/orders/saveAddress`,
        orderData
      );

      if (!response.data.success || !response.data.order) {
        throw new Error("Failed to create order");
      }
      setShowPayment(false);
      setCartClicked(false);
      setShippingPrice(response.data.shippingFee);
      navigate("/payment-confirmation", {
        state: {
          orderData,
        },
      });
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    { name: "streetAddress", type: "text", placeholder: "Street Address" },
    { name: "city", type: "text", placeholder: "City" },
    { name: "state", type: "text", placeholder: "State" },
    { name: "postcode", type: "text", placeholder: "Postcode" },
    { name: "phone", type: "tel", placeholder: "Phone" },
    { name: "email", type: "email", placeholder: "Email" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen py-28 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Billing Details
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {inputFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-gray-600 font-medium mb-1"
              >
                {field.placeholder}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={billingDetails[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className={`mt-6 w-full py-3 rounded-lg text-white ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
