import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ToyStore = createContext();

export const ToyStoreProvider = ({ children }) => {
  const navigate = useNavigate();

  // State Variables
  const [signIn, setSignIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgetpage, setShowForgetPage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [animatePaymentForm, setAnimatePaymentForm] = useState(false);
  const [CartClicked, setCartClicked] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    product: null,
  });
  const [likedItems, setLikedItems] = useState(
    JSON.parse(localStorage.getItem("likedItems")) || []
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({ ageRange: null, priceRange: null });
  const [showMembershipPayment, setShowMembershipPayment] = useState(false);
  const [memberShip, setMemberShip] = useState(false);
  const [verifyMembership, setVerifyMembership] = useState(false);
  const [orders, setOrders] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(0);
  const { user } = useAuthStore();

 
  const newArrival = useRef(null);

  //function to store toggel show
  const handleMembershipClick = () => {
    setShowMembershipPayment(true);
  };

  // Local Storage Sync
  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/shop`);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //to fetch membership data from mongo
  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5001/api/membership/fetch`,
          { userId: user?._id } // Use optional chaining to safely access user._id
        );

        if (response.data.active) {
          setMemberShip(true);
        } else {
          setMemberShip(false);
        }
      } catch (error) {
        console.error("Error checking membership status:", error);
      }
    };

    if (user && user._id) {
      // Ensure user and user._id are defined
      fetchMembership();
    }
  }, [user, verifyMembership]);

  //fetch orders
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (user?._id) {
          const response = await axios.get(
            `http://localhost:5001/api/orders/getOrderHistory`,
            {
              params: { user: user._id },
            }
          );
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [user?._id]);

  // Like Functionality
  const handleLikeToggle = (product) => {
    setLikedItems((prevLikedItems) => {
      if (prevLikedItems.some((item) => item._id === product._id)) {
        return prevLikedItems.filter((item) => item._id !== product._id);
      }
      return [...prevLikedItems, product];
    });
  };

  const removeFromLiked = (itemName) => {
    const updatedCart = likedItems.filter((item) => item.name !== itemName);
    setLikedItems(updatedCart);
    toast.success(`${itemName} removed from cart`);
  };

  // Sidebar Controls
  const openSidebar = (product) => setSidebarState({ isOpen: true, product });

  const closeSidebar = () => setSidebarState({ isOpen: false, product: null });

  // Filters and Helper Functions
  // const parseAgeGroup = (ageGroup) => {
  //   if (ageGroup.includes("Month")) {
  //     return parseInt(ageGroup.split(" ")[0], 10) / 12;
  //   }
  //   if (ageGroup.includes("Year")) {
  //     return parseInt(ageGroup.split(" ")[0], 10);
  //   }
  //   return 0;
  // };


  const parseAgeGroup = (ageGroup) => {
    // Extract numeric ranges (e.g., "0-1") from input like "0-1 Years" or "0-1 Months"
    const match = ageGroup.match(/(\d+)-(\d+)/);
    if (match) {
      return `${match[1]}-${match[2]}`; // Return "0-1", "1-3", etc.
    }
    return ""; // Default to an empty string if no match
  };
  


  const handleAgeRangeClick = (range) => {
    setFilters((prev) => ({ ...prev, ageRange: range }));
    navigate("/product");
  };

  const handlePriceRangeClick = (range) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
    navigate("/product");
  };

  const filteredProducts = products.filter((product) => {
    const productAge = parseAgeGroup(product.ageGroup);
    const ageMatches =
      !filters.ageRange ||
      (filters.ageRange === "0-1" && productAge === "0-1") ||
      (filters.ageRange === "1-3" && productAge === "1-3") ||
      (filters.ageRange === "3-6" && productAge === "3-6") ||
      (filters.ageRange === "6-11" && productAge === "6-11") ||
      (filters.ageRange === "11-19" && productAge === "11-19");

    const priceMatches =
      !filters.priceRange ||
      (filters.priceRange === "0-200" &&
        product.price >= 0 &&
        product.price <= 200) ||
      (filters.priceRange === "200-500" &&
        product.price > 200 &&
        product.price <= 500) ||
      (filters.priceRange === "500-1000" &&
        product.price > 500 &&
        product.price <= 1000) ||
      (filters.priceRange === "1000-2000" &&
        product.price > 1000 &&
        product.price <= 2000) ||
      (filters.priceRange === "2000-200000" &&
        product.price > 2000 &&
        product.price <= 200000);

    return ageMatches && priceMatches;
  });

  // Cart Functionality
  const storeCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.name === product.name
    );
    const updatedCart =
      existingItemIndex === -1
        ? [...cartItems, { ...product, cartQuantity: 1 }]
        : cartItems.map((item) =>
            item.name === product.name
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          );

    setCartItems(updatedCart);
    storeCartInLocalStorage(updatedCart);
  };

  const incrementQuantity = (itemName) => {
    const updatedCart = cartItems.map((item) =>
      item.name === itemName
        ? { ...item, cartQuantity: item.cartQuantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    storeCartInLocalStorage(updatedCart);
  };

  const decrementQuantity = (itemName) => {
    const updatedCart = cartItems
      .map((item) =>
        item.name === itemName && item.cartQuantity > 1
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      )
      .filter((item) => item.cartQuantity > 0);

    setCartItems(updatedCart);
    storeCartInLocalStorage(updatedCart);
  };

  const removeFromCart = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
    toast.success(`${itemName} removed from cart`);
    storeCartInLocalStorage(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.cartQuantity, 0)
      .toFixed(2);
  };

  // User Authentication
  const Login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("userLogin", "true");
  };

  const Logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("userLogin", "false");
  };

  return (
    <ToyStore.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        likedItems,
        setLikedItems,
        handleLikeToggle,
        removeFromLiked,
        cartItems,
        setCartItems,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        calculateTotal,
        sidebarState,
        openSidebar,
        closeSidebar,
        filteredProducts,
        handleAgeRangeClick,
        handlePriceRangeClick,
        signIn,
        setSignIn,
        showOTP,
        setShowOTP,
        showForgetpage,
        setShowForgetPage,
        singleProduct,
        setSingleProduct,
        showPayment,
        setShowPayment,
        animatePaymentForm,
        setAnimatePaymentForm,
        CartClicked,
        setCartClicked,
        Login,
        Logout,
        showMembershipPayment,
        setShowMembershipPayment,
        handleMembershipClick,
        memberShip,
        setMemberShip,
        setVerifyMembership,
        verifyMembership,
        orders,
        setOrders,
        newArrival,
        shippingPrice,
        setShippingPrice,
      }}
    >
      {children}
    </ToyStore.Provider>
  );
};
