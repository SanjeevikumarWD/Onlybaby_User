import React, { useState, useContext } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ToyStore } from "../context/ContextApi";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";

const Register = ({ onClickAccount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Added loading state
  const { signup } = useAuthStore();
  const navigate = useNavigate();
  const { setShowOTP } = useContext(ToyStore);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Set loading to true when form is submitted

    try {
      await signup(email, name, password);
      toast.success("Account created successfully");
      setShowOTP(true);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "Error signing up");
    } finally {
      setIsLoading(false); // Set loading to false after request is done
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-svh bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
    >
      <div className="max-w-md mx-auto mb-20">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-center mb-8">
            <RocketIcon className="h-12 w-12 text-rose-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Join the Adventure!
          </h2>

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={onClickAccount}
                className="text-sm text-rose-600 hover:text-pink-800 transition-colors"
              >
                Already have an account?
              </button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all"
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
                    {/* <span>Processing...</span> */}
                  </div>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
