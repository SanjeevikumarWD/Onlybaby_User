import React, { useContext, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ToyStore } from "../context/ContextApi";

const Register = ({ onClickAccount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { signup } = useAuthStore(); // Removed unused 'error'
  const navigate = useNavigate();
  const {showOTP, setShowOTP} = useContext(ToyStore);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Inputs:", { name, email, password, passwordConfirmation });

    if (password !== passwordConfirmation) {
        toast.error("Passwords do not match");
        return;
    }

    try {
      let data = {'email':email,
        'name':name,
        'password':password
      }
        await signup(email, name, password);
        toast.success("Account created successfully");
        setShowOTP(true);
    } catch (error) {
        console.error("Error during signup:", error);
        toast.error(error.response?.data?.message || "Error signing up");
    }
};

  return (
    <div className="w-full bg-zinc-50">
      <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
          <p className="font-bold mb-5 text-gray-500">REGISTER</p>
          <form method="POST" onSubmit={handleSignupSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full p-2 rounded-md dark:text-gray-400 bg-gray-100 border-transparent mt-1 block"
                id="name"
                type="text"
                name="name"
                placeholder="Your display name"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                htmlFor="email"
              >
                Email
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
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full p-2 rounded-md bg-gray-100 mt-1 block"
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                htmlFor="password_confirmation"
              >
                Confirm Password
              </label>
              <input
                className="w-full p-2 rounded-md bg-gray-100 text-sm mt-1 block"
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Repeat your password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-end">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-blue-400"
                href="#"
                onClick={onClickAccount}
              >
                Already registered?
              </a>
              <button
                type="submit"
                className="ml-4 inline-flex items-center rounded-lg bg-gray-200 p-2 text-xs font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
