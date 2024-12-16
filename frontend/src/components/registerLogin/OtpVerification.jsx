import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

const OtpVerification = () => {
  const [code,setCode] = useState("");
  const {verifyEmail,error} = useAuthStore();
  const {setShowOTP} = useContext(ToyStore);
  const navigate = useNavigate();
  const handleVerifyEmail = async(e) =>{
    e.preventDefault();
    try{
        await verifyEmail(code);
        setShowOTP(false);
        toast.success("Email verified successfully");
    }catch(error){
        console.log("Error :",error);
        toast.error("Error verifying email");
    }
  }


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
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleVerifyEmail}
                className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 font-bold text-sm"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
