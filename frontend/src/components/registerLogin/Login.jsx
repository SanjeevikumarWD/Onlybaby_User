import React, { useContext, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ToyStore } from "../context/ContextApi";

const Login = ({ onClickAccount }) => {
  const {login,error} = useAuthStore();
  const navigate = useNavigate();
  const [email,Setemail] = useState("");
  const [password,Setpassword] = useState("");
  const {setShowForgetPage} = useContext(ToyStore); 


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(email,password);
      console.log("Login successful");
      toast.success("Login successful");
      navigate("/");
    }catch(error){
      console.log("Error :",error);
      toast.error("Error logging in");
    }
  };
  return (
    <div className="w-full bg-zinc-50">
      <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
          <p className="font-bold mb-5 text-gray-500">Login</p>
          <form className="mt-4" onSubmit={handleLoginSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                onChange={(e) => Setemail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="p-2 w-full rounded-md bg-gray-100 mt-1 block"
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                onChange={(e) => Setpassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 rounded-lg text-gray-400 bg-black font-bold text-sm"
              >
                Log in
              </button>
              <p className="text-sm text-gray-600 underline" onClick={() => setShowForgetPage(true)}>Forgot Password</p>
              <button
                type="button"
                onClick={onClickAccount}
                className="text-sm text-gray-600 underline"
              >
                Create New Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;