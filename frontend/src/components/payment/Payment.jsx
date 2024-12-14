import React from "react";

const Payment = () => {
  return (
    <div className="p-5 mt-20">
      <div className="bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 w-full flex justify-center">CHECK OUT </h1>
        {/* Billing Details Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Billing Details</h3>
          <form className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6">
            {/* First Name and Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Last Name"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name (Optional)
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Company Name"
              />
            </div>

            {/* Country / Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country / Region *
              </label>
              <select className="w-full mt-2 p-2 border rounded-md" required>
                <option>India</option>
                {/* Add other countries if necessary */}
              </select>
            </div>

            {/* Street Address */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Street Address *
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="House number and street name"
                required
              />
            </div>

            {/* Apartment, Suite, Unit */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Apartment, Suite, Unit (Optional)
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Apartment, suite, unit, etc."
              />
            </div>

            {/* Town / City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Town / City *
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Town / City"
                required
              />
            </div>

            {/* State / County */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State / County *
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="State / County"
                required
              />
            </div>

            {/* Postcode / ZIP */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postcode / ZIP *
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Postcode / ZIP"
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
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Phone number"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Email Address"
                required
              />
            </div>


            {/* Ship to Different Address */}
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 w-4 h-4 text-blue-600" />
              <label className="text-sm text-gray-700">
                Ship to a different address?
              </label>
            </div>

            {/* Order Notes */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Order Notes (Optional)
              </label>
              <textarea
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Notes about your order, e.g. special notes for delivery."
              ></textarea>
            </div>
          </form>
        </div>

        {/* Order Recap Section */}
        <div className="p-6 border-t bg-gray-50">
          <h4 className="text-2xl font-semibold mb-4">Your Order</h4>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Product Info */}
            <div className="flex justify-between mb-4">
              <p>Neem / Bamboo Wooden Comb - Pocket Comb</p>
              <p>2 × ₹50.00</p>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <p>Subtotal</p>
              <p>₹100.00</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>₹100.00</p>
            </div>

            {/* Payment Info */}
            <div className="mt-6">
              <h5 className="text-xl font-semibold">Payment Method</h5>
              <div className="flex items-center mt-4">
                <input
                  type="radio"
                  name="payment"
                  className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <label className="text-sm text-gray-700">
                  Credit Card/Debit Card/NetBanking
                </label>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Pay securely by Credit or Debit card or Internet Banking through
                Razorpay.
              </p>
            </div>

            {/* Shipping Information */}
            <div className="mt-6">
              <h5 className="text-xl font-semibold">Shipping Information</h5>
              <p className="text-sm text-gray-600 mt-2">
                <ul className="list-disc pl-5">
                  <li>
                    Parcel dispatching time: 2-3 working days from ordering.
                  </li>
                  <li>Delivery time: 3-5 working days.</li>
                  <li>
                    OnlyCry will not take complaints, return or refund without
                    unboxing videos. The video should start before opening the
                    parcel, without any pauses.
                  </li>
                  <li>
                    OnlyCry will not return or refund for natural wood hollows
                    and discolorations on toys.
                  </li>
                </ul>
              </p>
            </div>

            {/* Place Order Button */}
            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
