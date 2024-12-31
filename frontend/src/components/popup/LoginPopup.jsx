import React, { useContext, useState, useEffect } from "react";
import { ToyStore } from "../context/ContextApi";
import { X } from "lucide-react";
import PopupContent from "./PopupContent";
import { useAuthStore } from "../store/authStore";

const LoginPopup = () => {
  const { isLoggedIn, setIsLoggedIn, signIn, setSignIn, memberShip } =
    useContext(ToyStore);
  const { user } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setIsAnimating(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  const handleSignIn = () => {
    setSignIn(true);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setSignIn(false);
    setIsLoggedIn(false);
  };

  if (!showPopup) return null;
  
  

  return (
    <>
      <div
        className={`${memberShip ? "hidden" : ""} fixed inset-0 transition-all duration-500 ease-out ${
          isAnimating
            ? "opacity-100 bg-black/50 backdrop-blur-[2px]"
            : "opacity-0"
        } z-20`}
        onClick={handleClose}
      />

      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white rounded-2xl shadow-2xl max-w-sm w-full z-30 overflow-hidden
          transition-all duration-500 ease-out
          ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full 
            bg-white/80 backdrop-blur-sm shadow-sm z-10
            transition-all duration-200 
            hover:bg-gray-100 hover:scale-110
            active:scale-95"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <PopupContent
          isSignedIn={signIn}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onClose={handleClose}
        />
      </div>
    </>
  );
};

export default LoginPopup;
