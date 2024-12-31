import React, { useContext } from "react";
import { useAuthStore } from "../store/authStore"; // Update with the correct path
import Benefits from "./Benefits";
import { ToyStore } from "../context/ContextApi";

const PopupContent = ({ onSignIn, onClose }) => {
  // Access user data from the auth store
  const user = useAuthStore((state) => state.user);
  const { handleMembershipClick, memberShip } = useContext(ToyStore);

  // If membership is true, return null to hide the popup
  if (memberShip) {
    return null;
  }

  return (
    <>
      <div className="animate-fadeIn">
        <div className="relative h-[140px] overflow-hidden">
          <img
            src={
              user
                ? "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
            }
            alt={user ? "Welcome Back" : "Shopping Rewards"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white" />
        </div>

        <div className="px-6 pt-4 pb-6 space-y-5">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {user ? "Welcome Back! 🎉" : "Unlock Exclusive Benefits! ✨"}
            </h1>
            <p className="text-gray-600 text-sm">
              {user
                ? "Your exclusive member benefits are now active"
                : "Join now and enjoy special perks just for members"}
            </p>
          </div>

          <Benefits />

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => {
                if (user && !memberShip) {
                  handleMembershipClick();
                  onClose();
                } else {
                  onSignIn();
                }
              }}
              className={`px-6 py-2.5 font-medium rounded-xl
              transform transition-all duration-200
              hover:scale-105 hover:shadow-lg
              active:scale-95 focus:outline-none
              ${
                user
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
              }`}
            >
              {user ? "Sign In To Membership" : "Sign In"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl
              transform transition-all duration-200
              hover:bg-gray-200 hover:scale-105
              active:scale-95 focus:outline-none"
            >
              {user ? "Close" : "Maybe Later"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupContent;
