import React, { useContext, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { ShieldCheckIcon } from "lucide-react";
import { ToyStore } from "../context/ContextApi";

const OtpVerification = () => {
  const [code, setCode] = useState("");
  const { verifyEmail } = useAuthStore();
  const {showOTP, setShowOTP} = useContext(ToyStore)

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(code);
      toast.success("Email verified successfully");
      setShowOTP(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error verifying email");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-center mb-8">
            <ShieldCheckIcon className="h-12 w-12 text-rose-500" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Please enter the verification code sent to your email
          </p>

          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                type="text"
                required
                maxLength="6"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="000000"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all"
            >
              Verify Code
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OtpVerification;