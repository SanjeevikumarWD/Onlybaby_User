import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const {token} = useParams();
    const {resetPassword,error} = useAuthStore();
    const handleResetPassword = async(e) => {
      e.preventDefault();
      if(password != confirmPassword){
          toast.error("Password do not match");
          return;
      }
      try{
          await resetPassword(token,password);
          toast.success("Password reset successfully");
          setTimeout(() => {
             navigate("/login"); 
          }, 2000);
      }catch(error){
          console.log("Error :",error);
          toast.error("Error resetting password");
      }
    };

  return (
    <div className="w-full bg-zinc-50">
      <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
          <p className="font-bold mb-5 text-gray-500">Password change</p>
          <form method="POST" onSubmit={handleResetPassword}>
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-end">
              <button
                type="submit"
                className="ml-4 inline-flex items-center rounded-lg bg-gray-200 p-2 text-xs font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                set password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;