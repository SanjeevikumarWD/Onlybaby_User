import React, { useState } from "react";

const OtpVerification = () => {
  const [otp, setOtp] = useState(""); // State to store the OTP input value
  const [isOtpSent, setIsOtpSent] = useState(false); // To track if OTP has been sent

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      // Add your OTP verification logic here
      console.log("Verifying OTP:", otp);
      // If OTP is correct, redirect or take necessary action
    } else {
      console.log("Please enter a valid 6-digit OTP");
    }
  };

  const handleResendOtp = () => {
    // Add OTP resend logic here
    console.log("Resending OTP...");
    setIsOtpSent(true); // Indicate that OTP has been sent
  };

  return (
    <div className="w-full bg-zinc-50">
      <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
          <p className="font-bold mb-5 text-gray-500">OTP Verification</p>
          <form className="mt-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="otp"
              >
                Enter OTP
              </label>
              <input
                className="w-full p-2 rounded-md bg-gray-100 mt-1 block"
                id="otp"
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
                value={otp}
                onChange={handleOtpChange}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 font-bold text-sm"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-gray-600 underline"
              >
                {isOtpSent ? "Resend OTP" : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
