import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ToyStore = createContext();

export const ToyStoreProvider = ({ children }) => {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(false); // state to tract that user icon is clicked or not

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [showOTP,setShowOTP] = useState(false);
  const [showForgetpage,setShowForgetPage] = useState(false);

  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    product: null,
  });

  const [likedItems, setLikedItems] = useState(
    JSON.parse(localStorage.getItem("likedItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  const handleLikeToggle = (product) => {
    setLikedItems((prevLikedItems) => {
      if (prevLikedItems.some((item) => item._id === product._id)) {
        // If item is already liked, remove it
        return prevLikedItems.filter((item) => item._id !== product._id);
      }
      // Otherwise, add the item
      return [...prevLikedItems, product];
    });
  };

  const removeFromLiked = (itemName) => {
    const updatedCart = likedItems.filter((item) => item.name !== itemName);
    setLikedItems(updatedCart);
    toast.success(`${itemName} removed from cart`);
  };

  const openSidebar = (product) => {
    setSidebarState({ isOpen: true, product });
  };

  const closeSidebar = () => {
    setSidebarState({ isOpen: false, product: null });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/shop");
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message);
      console.log("error fetching products", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("From mongodb", products);

  //age and price filters
  const [filters, setFilters] = useState({
    ageRange: null,
    priceRange: null,
  });

  // Helper function to parse ageGroup into a numerical value (in years)
  const parseAgeGroup = (ageGroup) => {
    if (ageGroup.includes("Month")) {
      const months = parseInt(ageGroup.split(" ")[0], 10);
      return months / 12; // Convert months to years
    }
    if (ageGroup.includes("Year")) {
      return parseInt(ageGroup.split(" ")[0], 10);
    }
    return 0;
  };

  // Handle filter selection for age
  const handleAgeRangeClick = (range) => {
    setFilters((prev) => ({ ...prev, ageRange: range }));
  };

  // Handle filter selection for price
  const handlePriceRangeClick = (range) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
    navigate("/product");
  };

  // Filter products based on the selected filters
  const filteredProducts = products.filter((product) => {
    // Age filter
    const productAge = parseAgeGroup(product.ageGroup);
    const ageMatches =
      !filters.ageRange ||
      (filters.ageRange === "0-1" && productAge >= 0 && productAge <= 1) ||
      (filters.ageRange === "1-3" && productAge > 1 && productAge <= 3) ||
      (filters.ageRange === "3-6" && productAge > 3 && productAge <= 6) ||
      (filters.ageRange === "6-11" && productAge > 6 && productAge <= 11) ||
      (filters.ageRange === "11-19" && productAge > 11 && productAge <= 19);

    // Price filter
    const priceMatches =
      !filters.priceRange ||
      (filters.priceRange === "0-200" &&
        product.price >= 0 &&
        product.price <= 200) ||
      (filters.priceRange === "200-500" &&
        product.price > 200 &&
        product.price <= 500) ||
      (filters.priceRange === "500-1000" &&
        product.price > 100 &&
        product.price <= 200) ||
      (filters.priceRange === "1000-2000" &&
        product.price > 1000 &&
        product.price <= 2000);

    return ageMatches && priceMatches; // Both conditions must match
  });

  //state to mention that user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //state to store add to cart items
  const [cartItems, setCartItems] = useState([]);

  // Store cart items in local storage
  const storeCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // When adding to cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.name === product.name
    );

    let updatedCart = [];

    if (existingItemIndex === -1) {
      updatedCart = [...cartItems, { ...product, cartQuantity: 1 }];
    } else {
      updatedCart = cartItems.map((item) =>
        item.name === product.name
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      );
    }

    setCartItems(updatedCart);
    storeCartInLocalStorage(updatedCart); // Save to local storage
  };

  // Increment item quantity
  const incrementQuantity = (itemName) => {
    const updatedCart = cartItems.map((item) =>
      item.name === itemName
        ? { ...item, cartQuantity: item.cartQuantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    storeCartInLocalStorage(updatedCart); // Save to local storage
  };

  // Decrement item quantity
  const decrementQuantity = (itemName) => {
    const updatedCart = cartItems
      .map((item) =>
        item.name === itemName && item.cartQuantity > 1
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      )
      .filter((item) => item.cartQuantity > 0); // Ensure item is not removed if cartQuantity is 0

    setCartItems(updatedCart);
    storeCartInLocalStorage(updatedCart); // Save to local storage
  };

  // Remove from cart
  const removeFromCart = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
    toast.success(`${itemName} removed from cart`);
    storeCartInLocalStorage(updatedCart); // Save to local storage
  };

  // Retrieve cart items from localStorage on initial load
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems); // Load from localStorage
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.cartQuantity, 0)
      .toFixed(2);
  };

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
        fetchProducts,
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        likedItems,
        Login,
        Logout,
        handleLikeToggle,
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
        removeFromLiked,
        signIn,
        setSignIn,
        setShowOTP,
        showOTP,
        setShowForgetPage,
        showForgetpage,
      }}
    >
      {children}
    </ToyStore.Provider>
  );
};
