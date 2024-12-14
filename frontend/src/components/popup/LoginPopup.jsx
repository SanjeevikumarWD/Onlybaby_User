import React, { useContext, useState, useEffect } from "react";
import { ToyStore } from "../context/ContextApi";
import { X } from "lucide-react";

const LoginPopup = () => {
  const { isLoggedIn, logIn, logOut } = useContext(ToyStore);

  const [showPopup, setShowPopup] = useState(false);

  // Show popup after 10 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds

    // Cleanup timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null; // Don't render anything if popup is not visible

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-20"></div>

      {/* Centered Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-30">
        <div className="text-center">
          {isLoggedIn ? (
            <>
              <div className="max-h-[300px] ">
                <img
                  src="/assets/1.png"
                  alt=""
                  className="h-[100px] w-full object-cover"
                />
                <X className="absolute top-2 right-2 bg-white opacity-85 rounded-full" onClick={() => setShowPopup(false)}/>
                <div>
                  <h1 className="text-2xl font-semibold my-1">
                    🎉 Log In & Unlock Exclusive Perks! 🎉
                  </h1>
                  <p className="italic">
                    Get extra credits and exciting offers just for logging in!
                    🚀 Don’t miss out—start saving now! ✨
                  </p>
                  <div className="flex justify-around my-4">
                    <button className="py-1 px-4 bg-gray-800 text-white rounded-xl">
                      LOGIN
                    </button>
                    <button
                      className="py-1 px-4 bg-gray-800 text-white rounded-xl"
                      onClick={setShowPopup(false)}
                    >
                      LATER
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="max-h-[300px] ">
              <img
                src="/assets/1.png"
                alt=""
                className="h-[100px] w-full object-cover"
              />
              <X className="absolute top-2 right-2 bg-white opacity-85 rounded-full" onClick={() => setShowPopup(false)}/>
              <div>
                <h1 className="text-2xl font-semibold my-1">
                  Join Now & Get 10% OFF Every Year!
                </h1>
                <p className="italic">
                  Sign up for membership and enjoy a 10% discount on every
                  purchase—all year long! Don't miss out! 🌟
                </p>
                <div className="flex justify-around my-4">
                  <button className="py-1 px-4 bg-gray-800 text-white rounded-xl">
                    REGISTER
                  </button>
                  <button
                    className="py-1 px-4 bg-gray-800 text-white rounded-xl"
                    onClick={() => setShowPopup(false)}
                  >
                    LATER
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
