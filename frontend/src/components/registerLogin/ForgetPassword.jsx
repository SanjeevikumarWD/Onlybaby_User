import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { ToyStore } from "../context/ContextApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const {setShowForgetPage} = useContext(ToyStore);
  const navigate = useNavigate();
  const { forgotPassword, error } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    toast.success("OTP verified successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-end w-full">
      <div className="w-full bg-zinc-200">
        {!isSubmitted ? (
          <div className="w-full flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
              <p className="font-bold mb-5 text-gray-500">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
              <form onSubmit={handleForgotPassword} className="mt-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-800"
                    htmlFor="email"
                  >
                    Your Email Address
                  </label>
                  <input
                    className="w-full p-2 rounded-md bg-gray-100 mt-1 block"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 font-bold text-sm"
                  >
                    send reset link
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
              <p className="font-bold mb-5 text-gray-500">
                If an account exists for {email} you will receive a password
                link shortly
              </p>
              <button className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 font-bold text-sm" onClick={()=>setShowForgetPage(false)}>
                Back to login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
