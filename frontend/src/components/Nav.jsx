import {
  Heart,
  HeartIcon,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack, IoMdCall } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import Login from "./registerLogin/Login";
import Register from "./registerLogin/Register";
import { ToyStore } from "./context/ContextApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Payment from "./payment/Payment";

const Nav = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const { handleAgeRangeClick, handlePriceRangeClick, removeFromLiked } =
    useContext(ToyStore);

  const [menuClicked, setMenuClicked] = useState(false); // state to tract that menu = icon is clicked or not
  const [searchClicked, setSearchClicked] = useState(false); // state to tract that menu = icon is clicked or not
  const [activeMenu, setActiveMenu] = useState(null); // State to track which dropdown is active
  const [createAccountClicked, setCreateAccountClicked] = useState(false);
  const [CartClicked, setCartClicked] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

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
  } = useContext(ToyStore);

  const lastScrollYRef = useRef(0);
  const searchRef = useRef(null);
  const modalRef = useRef();

  const handleLogout = () => {
    logout();
    setSignIn(false);
    navigate("/");
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

  return (
    <div
      className={`text-gray-800 py-3 px-3 md:px-10 navbar fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-transform duration-300 ease-in-out transform ${
        isScrollingDown ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <ul className="flex justify-between cursor-pointer items-center">
        <div className="flex space-x-4">
          <li className="flex items-center">
            <Menu onClick={handleMenuClick} aria-label="Toggle menu" />
          </li>
          <li className="flex justify-center items-center space-x-4 ">
            <input
              type="text"
              ref={searchRef}
              className="hidden lg:block border p-2 w-full rounded-lg pr-10"
              placeholder="Search..."
            />
            <Search aria-label="Search" onClick={handleSearch} />
          </li>
        </div>

        <li className="">
          <Link to="/">
            <img
              src="/assets/logo.png"
              alt="Toy Store Logo"
              className="h-7 md:h-10 p-0"
            />
          </Link>
        </li>

        <div className="flex space-x-4 items-center">
          <ul className="hidden lg:flex space-x-6">
            <li className="font-sour font-normal text-gray-800 text-xl">
              <Link to="/contact">CONTACT</Link>
            </li>
            <li className="font-sour font-normal text-gray-800 text-xl">
              <Link to="/product">PRODUCTS</Link>
            </li>
          </ul>
          <li>
            <UserRound
              aria-label="User profile"
              onClick={() => setSignIn((prev) => !prev)}
            />
          </li>
          <li className="font-sour font-normal text-gray-800 text-xl">
            <HeartIcon onClick={() => handleLikeClicked((prev) => !prev)} />
          </li>
          <li>
            <ShoppingBag
              aria-label="Shopping bag"
              onClick={() => handleCartClicked((prev) => !prev)}
            />
          </li>
        </div>
      </ul>

      {/* Search Bar */}
      {searchClicked && (
        <div className="lg:hidden absolute top-14 left-0 w-full px-4 py-5 bg-white shadow-md z-50">
          <div className="relative">
            <input
              type="text"
              ref={searchRef}
              className="border p-3 w-full rounded-lg pr-10"
              placeholder="Search..."
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
      )}

      {/* Slide-Out Menu */}
      {menuClicked && (
        <div
          className={`overflow-y-scroll absolute z-50 top-0 left-0 w-full lg:w-7/12 h-screen bg-white shadow-md border-2 transform transition-transform duration-500 ease-in-out ${
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
                <Heart />
              </li>
              <li className="font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                HOME
              </li>
              <li
                className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                onClick={() => handleDropdown("category")}
              >
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

              <li className="font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                NEW ARRIVALS
              </li>
              <li className="font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                ABOUT
              </li>
              <li className="font-regular text-2xl text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100">
                CONTACT US
              </li>
              <li>
                <ul className="flex space-x-8 text-3xl">
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
                    navigate("/product");
                  }}
                >
                  0 - 1 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("1-3");
                    navigate("/product");
                  }}
                >
                  1 - 3 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("3-6");
                    navigate("/product");
                  }}
                >
                  3 - 6 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("6-11");
                    navigate("/product");
                  }}
                >
                  6 - 11 years
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handleAgeRangeClick("11-19");
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
                    navigate("/product");
                  }}
                >
                  Below ₹200
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("200-500");
                    navigate("/product");
                  }}
                >
                  ₹200 - ₹500
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("500-1000");
                    navigate("/product");
                  }}
                >
                  ₹500 - ₹1000
                </li>
                <li
                  className="font-regular text-2xl cursor-pointer flex items-center gap-5 text-slate-500 active:text-black active:bg-slate-300 p-2 transition-colors duration-100"
                  onClick={() => {
                    handlePriceRangeClick("1000-2000");
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
          className="absolute top-0 right-0 w-2/3 lg:w-5/12 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef} // Attach ref to modal div
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl">
              <i>EToy Store</i>
            </div>
            {/* Close Icon */}
            <button onClick={() => setSignIn(false)} className="text-2xl">
              <X />
            </button>
          </div>

          {/* Conditionally Render Content Based on `user` */}
          {user?.isVerified ? (
            // User is logged in, show "Your Orders"
            <div className="p-3 flex flex-col justify-between h-[500px] md:h-[480px] lg:h-[650px] xl:h-[900px] ">
              <div>
                <p className="font-semibold text-3xl mb-4">Hello {user.name}</p>
                <p className="font-medium text-2xl pb-2 border-b-2 mb-5">
                  Your orders
                </p>
                <ul className="cursor-pointer space-y-6">
                  <li>Track and Manage Your Orders</li>
                  <li>Buy Again</li>
                  <li>Customer Service</li>
                </ul>
              </div>
              <button
                onClick={() => handleLogout()}
                className="bg-black text-gray-300 font-semibold rounded-lg px-3 py-1 lg:py-2 mt-5"
              >
                Logout
              </button>
            </div>
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
      )}

      {CartClicked && (
        <div
          className="absolute top-0 right-0 w-2/3 lg:w-7/12 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl">
              <i>EToy Store Cart</i>
            </div>
            {/* Close Icon */}
            <button onClick={() => setCartClicked(false)} className="text-2xl">
              <X />
            </button>
          </div>

          {/* Cart Items Section */}
          <div className="h-[calc(100%-200px)] overflow-y-auto ">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <p className="text-2xl mb-4">No items in the cart</p>
                <button
                  onClick={() => setCartClicked(false)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between p-4 space-x-2 border-2 rounded-xl m-1 pb-3 bg-white "
                >
                  <div className="h-[100px] w-[100px] ">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                      onClick={() => openSidebar(item)}
                    />
                  </div>
                  <div className="flex-1 pr-3 font-thin">
                    <p className="px-2 mb-5">{item.name}</p>
                    <div className="px-2 flex space-x-5 text-lg font-semibold items-center">
                      <button
                        onClick={() => decrementQuantity(item.name)}
                        className="md:bg-gray-200 md:px-3 md:py-1 rounded"
                      >
                        -
                      </button>
                      <p>{item.cartQuantity}</p>
                      <button
                        onClick={() => incrementQuantity(item.name)}
                        className="md:bg-gray-200 md:px-3 md:py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex-2 flex flex-col justify-between">
                    <p className="font-semibold md:text-xl">
                      ₹{item.price * item.cartQuantity}
                    </p>
                    <button
                      className="border-b-2 border-black text-[10px] md:text-lg"
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total and Checkout Section */}
          {cartItems.length > 0 && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t-2">
              <div className="flex justify-between mb-4">
                <p className="text-xl font-semibold">Total:</p>
                <p className="text-xl font-bold">₹{calculateTotal()}</p>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  {
                    setShowPayment(true);
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* payment  */}
      {showPayment && (
        <div
          className="absolute top-0 right-0 w-2/3 lg:w-7/12 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl">
              <i>EToy Store Payment</i>
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

      {likeClicked && (
        <div
          className="absolute top-0 right-0 w-2/3 lg:w-1/3 h-screen bg-blue-50 shadow-md border-2 transform transition-transform duration-500 ease-in-out"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-3 text-black">
            <div className="font-thin text-2xl">
              <i>EToy Store Liked Products</i>
            </div>
            {/* Close Icon */}
            <button onClick={() => setLikeClicked(false)} className="text-2xl">
              <X />
            </button>
          </div>

          {/* Liked Items Section */}
          <div className="h-[calc(100%-200px)] overflow-y-auto">
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
          </div>

          {/* Close Modal */}
          {likedItems.length > 0 && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t-2">
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                onClick={() => setLikeClicked(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
