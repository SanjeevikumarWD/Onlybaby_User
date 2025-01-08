import {
  BellRing,
  Heart,
  HeartIcon,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  UserRoundCheck,
  UserRoundCheckIcon,
  X,
} from "lucide-react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { GiRingingBell } from "react-icons/gi";
import { IoIosArrowBack, IoMdCall } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import Login from "./registerLogin/Login";
import Register from "./registerLogin/Register";
import { ToyStore } from "./context/ContextApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Payment from "./payment/Payment";
import OtpVerification from "./registerLogin/OtpVerification";
import ForgetPassword from "./registerLogin/ForgetPassword";
import MembershipSidebar from "./membership/MembershipSidebar";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const {
    handleAgeRangeClick,
    handlePriceRangeClick,
    removeFromLiked,
    showOTP,
    showForgetpage,
    setShowForgetPage,
    showPayment,
    setShowPayment,
    setSingleProduct,
    products,
    CartClicked,
    setCartClicked,
    memberShip,
    newArrival,
  } = useContext(ToyStore);

  const [menuClicked, setMenuClicked] = useState(false); // state to tract that menu = icon is clicked or not
  const [searchClicked, setSearchClicked] = useState(false); // state to tract that menu = icon is clicked or not
  const [activeMenu, setActiveMenu] = useState(null); // State to track which dropdown is active
  const [createAccountClicked, setCreateAccountClicked] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  //data from context
  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    calculateTotal,
    openSidebar,
    likedItems,
    signIn,
    setSignIn,
    showMembershipPayment,
    setShowMembershipPayment,
    orders,
  } = useContext(ToyStore);

  if (memberShip === true) {
    setShowMembershipPayment(false);
  }

  const lastScrollYRef = useRef(0);
  const searchRef = useRef(null);
  const searchQueryRef = useRef(null);
  const modalRef = useRef();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { user } = useAuthStore.getState();
      if (user) {
        const storedCartItems =
          JSON.parse(localStorage.getItem("cartItems")) || [];
        const storedLikedItems =
          JSON.parse(localStorage.getItem("likedItems")) || [];

        const filteredCartItems = storedCartItems.filter(
          (item) => typeof item === "object"
        );
        const filteredLikedItems = storedLikedItems.filter(
          (item) => typeof item === "object"
        );

        const userId = user._id;

        await axios.put(
          `${serverUrl}/api/auth/updateUserItems`,
          {
            userId,
            cartItems: filteredCartItems,
            likedItems: filteredLikedItems,
          }
        );
      }

      await logout();
      setLoading(false);
      setSignIn(false);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.clear();
      navigate("/");
    }
  };

  const handleCartClicked = () => {
    setCartClicked((prev) => !prev);
  };

  const handleLikeClicked = () => {
    setLikeClicked((prev) => !prev);
  };

  const handleCreateAccountClicked = () => {
    setCreateAccountClicked((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSignIn(false);
    }
  };

  const handleNotificationClick = () => {
    setShowOrderNotification(false);
    setIsVibrating(false);
  };

  useEffect(() => {
    if (signIn) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [signIn]);

  const handleMenuClick = () => {
    if (searchClicked) {
      setSearchClicked((prev) => !prev);
    }
    setMenuClicked((prev) => !prev);
  };

  const handleSearch = () => {
    if (menuClicked) {
      setMenuClicked((prev) => !prev);
    }
    setSearchClicked((prev) => !prev);
    if (searchClicked) {
      searchRef.current.focus();
    }
  };

  // Handle opening specific dropdowns
  const handleDropdown = (menu) => {
    setActiveMenu(menu);
  };

  // Close dropdown and return to main menu
  const handleBack = () => {
    setActiveMenu(null);
  };

  //search filter
  const filteredProducts = products.filter(
    (product) =>
      typeof product.name === "string" &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`text-gray-800 py-3 px-3 md:px-10 navbar fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-transform duration-300 ease-in-out transform  ${
        isScrollingDown ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <ul className="flex justify-between cursor-pointer items-center">
        <div className="flex space-x-6 md:w-1/2">
          <li className="flex items-center">
            <Menu
              onClick={handleMenuClick}
              aria-label="Toggle menu"
              className="w-6 h-6 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-200"
            />
          </li>
          <li className="flex justify-center items-center">
            <Search
              aria-label="Search"
              onClick={handleSearch}
              className="w-6 h-6 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-200"
            />
          </li>
        </div>

        <div className="flex justify-between items-center w-8/12">
          <li className="transform hover:scale-105 transition-transform duration-200">
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="Only Baby Logo"
                className="h-5 sm:h-7"
              />
            </Link>
          </li>

          <div className="flex space-x-6 items-center">
            <ul className="hidden lg:flex space-x-8">
              <li className="group">
                <Link
                  to="/contact"
                  className="font-sour font-normal text-gray-800 text-xl relative"
                >
                  <span className="group-hover:text-gray-900 transition-colors duration-200">
                    CONTACT
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/product"
                  className="font-sour font-normal text-gray-800 text-xl relative"
                >
                  <span className="group-hover:text-gray-900 transition-colors duration-200">
                    PRODUCTS
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center  space-x-3 sm:space-x-5">
              <li>
                {memberShip ? (
                  <UserRoundCheckIcon
                    aria-label="User profile"
                    onClick={() => setSignIn((prev) => !prev)}
                    className="w-6 h-6 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-200"
                  />
                ) : (
                  <UserRound
                    aria-label="User profile"
                    onClick={() => setSignIn((prev) => !prev)}
                    className="w-6 h-6 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-200"
                  />
                )}
              </li>
              <li>
                <HeartIcon
                  onClick={() => handleLikeClicked((prev) => !prev)}
                  className="w-6 h-6 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-200"
                />
              </li>
              <li>
                <ShoppingBag
                  aria-label="Shopping bag"
                  onClick={() => handleCartClicked((prev) => !prev)}
                  className="w-6 h-6 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-200"
                />
              </li>
            </div>
          </div>
        </div>
      </ul>

      {searchClicked && (
        <div
          className="absolute top-13 left-0 w-full lg:w-7/12 rounded-xl bg-white shadow-lg z-50 
                        transform transition-all duration-200 ease-out"
        >
          <div className="relative p-4">
            <input
              type="text"
              ref={searchQueryRef}
              className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        transition-colors duration-200"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && filteredProducts.length > 0 ? (
              <ul
                className="mt-2 divide-y divide-gray-100 max-h-60 overflow-y-auto 
                            rounded-lg border border-gray-100 bg-white"
              >
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer 
                              transition-colors duration-150 ease-in-out group"
                    onClick={() => openSidebar(product)}
                  >
                    <span
                      className="text-gray-800 group-hover:text-blue-600 
                                  transition-colors duration-150"
                    >
                      {product.name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="mt-2 px-4 py-3 text-gray-500 bg-gray-50 rounded-lg 
                            border border-gray-100"
              >
                <div className="flex items-center justify-center">
                  <span>
                    {searchQuery ? "No results found" : "Start searching..."}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide-Out Menu */}
      {menuClicked && (
        <div
          className={`overflow-y-scroll absolute z-50 top-0 left-0 w-full lg:w-3/12 h-screen bg-white shadow-md border-2 transform transition-transform duration-500 ease-in-out ${
            menuClicked ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Main Menu */}
          {!activeMenu && (
            <ul className="p-5 space-y-2">
              <li className="mb-10 font-bold text-gray-600 text-xl pb-2">
                MENU
              </li>
              <li className="font-thin text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                <Heart
                  onClick={() => {
                    handleLikeClicked((prev) => !prev);
                    handleMenuClick();
                  }}
                />
              </li>
              <li
                className="font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100 cursor-pointer"
                onClick={() => {
                  handleMenuClick();
                  navigate("/");
                }}
              >
                HOME
              </li>
              <li className="font-regular text-2xl cursor-none flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                SHOP BY CATEGORY
              </li>
              <li
                className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                onClick={() => handleDropdown("age")}
              >
                SHOP BY AGE <IoChevronForward />
              </li>
              <li
                className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                onClick={() => handleDropdown("price")}
              >
                SHOP BY PRICE <IoChevronForward />
              </li>

              <li
                className="cursor-pointer font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                onClick={() => {
                  handleMenuClick();
                  newArrival.current?.scrollIntoView({ behavior: "smooth" });
                  navigate("/");
                }}
              >
                NEW ARRIVALS
              </li>

              <li className="font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                CONTACT US
              </li>
              <li>
                <ul className="flex space-x-8 text-3xl cursor-pointer">
                  <li className="text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                    <FaInstagram />
                  </li>
                  <li className="text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                    <FaWhatsapp />
                  </li>
                  <li className="text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                    <IoMdCall />
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {activeMenu === "age" && (
            <div className="p-5 w-full">
              <button onClick={handleBack} className="text-xl mb-5">
                <IoIosArrowBack className="text-3xl" />
              </button>
              <ul className="space-y-4">
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("0-1");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  0 - 1 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("1-3");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  1 - 3 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("3-6");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  3 - 6 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("6-11");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  6 - 11 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("11-19");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  11 - 19+ years
                </li>
              </ul>
            </div>
          )}

          {activeMenu === "price" && (
            <div className="p-5 w-full">
              <button onClick={handleBack} className="text-xl mb-5">
                <IoIosArrowBack className="text-3xl" />
              </button>
              <ul className="space-y-4">
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("0-200");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  Below ₹200
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("200-500");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  ₹200 - ₹500
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("500-1000");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  ₹500 - ₹1000
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("1000-2000");
                    handleMenuClick();
                    navigate("/product");
                  }}
                >
                  Above ₹1000
                </li>
              </ul>
            </div>
          )}

          <p onClick={() => setMenuClicked(false)}>
            <X className="absolute top-5 right-5 bg-gray-800 opacity-85 rounded-full text-white" />
          </p>
        </div>
      )}

      {signIn && (
        <div
          className={`
      fixed top-0 right-0 w-full md:w-8/12 h-screen
      bg-gradient-to-br from-blue-50 to-white
      shadow-2xl border-4 border-gray-200
      transform transition-all duration-500 ease-out 
      ${signIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      backdrop-blur-sm overflow-auto
    `}
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-6 text-black border-b border-gray-100">
            <div className="font-light text-2xl tracking-wide hover:tracking-wider transition-all duration-300">
              <i>OnlyBaby</i>
            </div>
            <button
              onClick={() => setSignIn(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {user?.isVerified ? (
            <div className="p-6 flex flex-col md:flex-row">
              {/* Main Content Area */}
              <div className="space-y-6 flex-grow">
                <p className="font-semibold text-3xl mb-4 text-gray-800 animate-fade-in">
                  Hello {user.name}
                </p>
                <p className="font-medium text-2xl pb-3 border-b border-gray-200 mb-6 text-gray-700">
                  Your orders
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      text: "Track and Manage Your Orders",
                      action: () => {
                        navigate("/purchase-history");
                        setSignIn(false);
                      },
                    },
                    {
                      text: "Buy Again",
                      action: () => {
                        navigate("/");
                        setSignIn(false);
                      },
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      onClick={item.action}
                      className="py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-x-2 transform"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>

                {/* Buttons Section */}
                <div className="flex justify-between items-center bg-transparent border-t shadow-lg p-6 md:block ">
                  {/* Membership Button */}
                  <button
                    onClick={() => setShowMembershipPayment(true)}
                    className={`md:w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3 py-2 md:py-4 rounded-lg hover:from-pink-600 hover:to-rose-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg ${
                      memberShip ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {memberShip ? "Already a member" : "Get Membership"}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="md:w-full mt-4 bg-gradient-to-r from-gray-800 to-black text-white py-3 px-3 rounded-full md:rounded-lg hover:from-gray-700 hover:to-black transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    ) : (
                      <div className="flex items-center space-x-2">
                        {/* Icon for small screens */}
                        <div className="md:hidden">
                          <LogOut className="h-5 w-5" />
                        </div>
                        {/* Text for medium and larger screens */}
                        <p className="hidden md:block text-sm md:text-base">
                          Logout
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in ">
              {!createAccountClicked ? (
                <Login onClickAccount={handleCreateAccountClicked} />
              ) : (
                <Register onClickAccount={handleCreateAccountClicked} />
              )}
            </div>
          )}
        </div>
      )}

      {CartClicked && (
        <div
          className="fixed top-0 right-0 w-full lg:w-7/12 h-screen bg-white shadow-2xl transform transition-all duration-500 ease-out translate-x-0"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-white">
            <div className="font-thin text-2xl tracking-wide">
              <i className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                OnlyBaby Cart
              </i>
            </div>
            <button
              onClick={() => setCartClicked(false)}
              className="p-2 hover:bg-blue-50 rounded-full transition-all duration-200 group"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            </button>
          </div>

          <div className="h-screen overflow-y-auto scrollbar-hide pb-20">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
                <p className="text-2xl text-gray-600 font-light">
                  Your cart is empty
                </p>
                <button
                  onClick={() => setCartClicked(false)}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems?.map((item) => (
                  <div
                    key={item?.name}
                    className="flex items-center p-4 space-x-4 border rounded-xl bg-white hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="h-[100px] w-[100px] overflow-hidden rounded-lg group">
                      <img
                        src={item?.image[0]}
                        alt={item?.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        onClick={() => openSidebar(item)}
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="font-medium text-gray-800 line-clamp-2">
                        {item?.name}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => decrementQuantity(item?.name)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          <span className="text-gray-600">-</span>
                        </button>
                        <span className="font-medium text-gray-800">
                          {item?.cartQuantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item?.name)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-3">
                      <p className="font-semibold text-lg">
                        ₹{item?.price * item?.cartQuantity}
                      </p>
                      <button
                        className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                        onClick={() => removeFromCart(item?.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="w-full bg-white border-t shadow-lg">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xl text-gray-600">Total:</p>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                      ₹{calculateTotal()}
                    </p>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => {
                      setSingleProduct(null);
                      setShowPayment(true);
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* payment  */}
      {showPayment && (
        <div
          className="absolute top-0 right-0 w-full md:w-8/12 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl">
              <i>OnlyBaby Payment</i>
            </div>
            {/* Close Icon */}
            <button onClick={() => setShowPayment(false)} className="text-2xl">
              <X />
            </button>
          </div>
          <div className="h-screen  border-2 overflow-y-auto">
            {user?.isVerified ? (
              <Payment />
            ) : (
              <>
                {!createAccountClicked ? (
                  <Login onClickAccount={handleCreateAccountClicked} />
                ) : (
                  <Register onClickAccount={handleCreateAccountClicked} />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* otpVerification  */}
      {showOTP && (
        <div
          className="absolute top-0 right-0 w-full lg:w-8/12 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl">
              <i>OnlyBaby OTP Verification</i>
            </div>
            {/* Close Icon */}
            <button onClick={() => setShowPayment(false)} className="text-2xl">
              <X />
            </button>
          </div>
          <div className="h-screen  border-2 overflow-y-auto bg-blue-100">
            <OtpVerification />
          </div>
        </div>
      )}
      {/* membership payment  */}
      {showMembershipPayment && (
        <div
          className="absolute top-0 right-0 w-10/12 lg:w-4/12 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <MembershipSidebar
            onClose={() => setShowMembershipPayment(false)}
            userId={user?.id}
          />
        </div>
      )}

    
      {/* forgetpassword  */}
      {showForgetpage && (
        <div
          className="absolute top-0 right-0 w-full md:w-8/12  h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl border-b-2 pb-2 w-full">
              <i>OnlyBaby OTP Verification</i>
            </div>
            {/* Close Icon */}
            <button
              onClick={() => setShowForgetPage(false)}
              className="text-2xl"
            >
              <X />
            </button>
          </div>
          <div className="h-screen overflow-y-auto bg-blue-100 ">
            <ForgetPassword />
          </div>
        </div>
      )}

      {likeClicked && (
        <div
          className="absolute top-0 right-0 w-full lg:w-1/3 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black shadow-sm">
            <div className="font-thin text-2xl">
              <i>OnlyBaby Liked Products</i>
            </div>
            {/* Close Icon */}
            <button onClick={() => setLikeClicked(false)} className="text-2xl">
              <X />
            </button>
          </div>

          {/* Liked Items Section */}
          <div className="h-screen overflow-y-auto">
            {likedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <p className="text-2xl mb-4">No liked products yet</p>
                <button
                  onClick={() => setLikeClicked(false)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              likedItems.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between p-4 space-x-2 border-2 rounded-xl m-1 pb-3 bg-white"
                >
                  <div className="h-[100px] w-[100px]">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 pr-3 font-thin">
                    <p className="px-2 mb-5">{item.name}</p>
                    <p className="px-2 text-lg font-semibold">₹{item.price}</p>
                  </div>
                  <div className="flex-2 flex flex-col justify-between">
                    <button
                      className="border-b-2 border-black text-[10px] md:text-lg"
                      onClick={() => removeFromLiked(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Close Modal */}
            {likedItems.length > 0 && (
              <div className="w-full p-4 bg-white border-t-2">
                <button
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setLikeClicked(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
