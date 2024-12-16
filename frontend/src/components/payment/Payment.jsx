import React, { useContext, useState } from "react";
import { ToyStore } from "../context/ContextApi";

const Payment = () => {
  // State to store form details
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const {cartItems} = useContext(ToyStore);

  // Calculate Subtotal and Total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal; // Adjust if taxes/shipping apply

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Details:", {
      billingDetails,
      cartItems,
      subtotal,
      total,
    });
    // You can send this data to your backend for order processing
  };

  return (
    <div>
      <div className="bg-white rounded-lg mb-10">
        {/* Billing Details Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Billing Details</h3>
          <form
            className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6"
            onSubmit={handleSubmit}
          >
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Last Name"
                required
              />
            </div>

            {/* Company Name */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Company Name (Optional)
              </label>
              <input
                type="text"
                name="companyName"
                value={billingDetails.companyName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Company Name"
              />
            </div>

            {/* Street Address */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Street Address *
              </label>
              <input
                type="text"
                name="streetAddress"
                value={billingDetails.streetAddress}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Street Address"
                required
              />
            </div>

            {/* Apartment */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Apartment, Suite, etc. (Optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={billingDetails.apartment}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Apartment, Suite, etc."
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Town / City *
              </label>
              <input
                type="text"
                name="city"
                value={billingDetails.city}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="City"
                required
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State / County *
              </label>
              <input
                type="text"
                name="state"
                value={billingDetails.state}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="State"
                required
              />
            </div>

            {/* Postcode */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postcode / ZIP *
              </label>
              <input
                type="text"
                name="postcode"
                value={billingDetails.postcode}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Postcode"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={billingDetails.phone}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Phone"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Email"
                required
              />
            </div>

            {/* Order Notes */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Order Notes (Optional)
              </label>
              <textarea
                name="orderNotes"
                value={billingDetails.orderNotes}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Notes about your order, e.g. special notes for delivery."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Recap Section */}
        <div className="p-6 border-t bg-gray-50">
          <h4 className="text-2xl font-semibold mb-4">Your Order</h4>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Dynamically Render Cart Items */}
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <p>{item.name}</p>
                <p>{item.quantity} × ₹{item.price.toFixed(2)}</p>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex justify-between font-bold mb-4">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>

            {/* Payment Info */}
            <div className="mt-6">
              <h5 className="text-xl font-semibold">Payment Method</h5>
              <p className="text-sm text-gray-600 mt-2">
                Pay securely by Credit or Debit card or Internet Banking through
                Razorpay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
