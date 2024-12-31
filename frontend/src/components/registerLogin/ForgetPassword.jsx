import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { ToyStore } from "../context/ContextApi";
import { motion } from "framer-motion";
import { KeyIcon, ArrowLeftIcon } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { setShowForgetPage, setSignIn } = useContext(ToyStore);
  const navigate = useNavigate();
  const { forgotPassword } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // State for handling loading animation

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Set loading state to true when starting the request

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Reset link sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send reset link.");
    } finally {
      setIsLoading(false);  // Set loading state to false when the request is finished
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen bg-gradient-to-b from-blue-50 to-purple-50 pb-20 px-4 sm:px-6 lg:px-8 pt-20 overflow-auto"
    >
      <div className="max-w-md mx-auto mb-28">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-center m-8">
            <KeyIcon className="h-12 w-12 text-rose-500" />
          </div>

          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Reset Your Password
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Enter your email address and we'll send you a link to reset your password
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all outline-none"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                    isLoading ? "cursor-not-allowed bg-gray-500" : ""
                  }`}
                  disabled={isLoading}  // Disable the button while loading
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
                    "Send Reset Link"
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Check Your Email
              </h3>
              <p className="text-gray-600 mb-8">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForgetPage(false)}
                className="inline-flex items-center px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Login
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
