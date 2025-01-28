import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToyStore } from "../context/ContextApi";
import RelatedProducts from "./RelatedProducts";

const formatStringToList = (str) => {
  if (!str || typeof str !== "string") return [];
  return str
    .split(",") // Split by commas
    .map((item) => item.trim()) // Trim spaces around each item
    .filter((item) => item.length > 0) // Remove any empty items
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1)); // Capitalize each item
};

const ImageCarousel = ({
  images,
  currentIndex,
  onNext,
  onPrev,
  productName,
}) => (
  <div className="relative w-full h-96 mb-8 p-10">
    <motion.img
      key={currentIndex}
      src={images[currentIndex]}
      alt={`${productName} - Image ${currentIndex + 1}`}
      className="w-full h-full object-contain rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
    {images.length > 1 && (
      <>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
            onClick={onPrev}
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
            onClick={onNext}
          >
            →
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </>
    )}
  </div>
);

const ProductInfo = ({ label, items }) => (
  <div className="space-y-2">
    <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center space-x-2">
          <span className="text-blue-500">•</span>
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PriceTag = ({ price, discount }) => {
  const Discount = discount || 0;

  // Ensure price and discount are numbers
  const numericPrice = Number(price);
  const numericDiscount = Number(Discount);

  // Calculate discounted price
  const discountedPrice = numericPrice - (numericPrice * numericDiscount) / 100;

  return (
    <div className="flex items-center gap-3 ">
      <span className="text-2xl font-bold text-blue-600">
        ₹ {discountedPrice.toFixed(2)}
      </span>
      {numericDiscount > 0 && (
        <>
          <span className="text-lg text-gray-400 line-through">
            ${numericPrice}
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
            {numericDiscount}% OFF
          </span>
        </>
      )}
    </div>
  );
};

const SingleProduct = () => {
  const {
    sidebarState,
    closeSidebar,
    addToCart,
    setSingleProduct,
    setShowPayment,
  } = useContext(ToyStore);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartMessage, setCartMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const product = sidebarState.product;
  if (!sidebarState.isOpen || !product) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    setCartMessage("Item added to cart!");
    setTimeout(() => setCartMessage(""), 3000);
  };

  const handleBuyNow = () => {
    const updatedProduct = {
      ...product,
      color:selectedColor, // Add the selected color to the product object
    };
    setSingleProduct(updatedProduct);
    closeSidebar();
    setShowPayment(true);
  };

  const features = formatStringToList(product?.features);
  const benefits = formatStringToList(product?.benefits);
  const itemsIncluded = formatStringToList(product?.itemsIncluded);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed top-0 right-0 overflow-hidden w-full md:w-9/12 lg:w-7/12 h-full bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 border-b ">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 text-bold flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          onClick={closeSidebar}
        >
          ✕
        </motion.button>
      </div>

      <div className="p-6 pt-16 space-y-8">
        <ImageCarousel
          images={product.image || []}
          currentIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          productName={product.name}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            {product.bestSeller && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                Best Seller
              </span>
            )}
          </div>

          <PriceTag price={product.price} discount={product.discount} />

          <div className="flex items-center gap-4">
            <span className="text-gray-700">Age Group:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {product.ageGroup}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex gap-2">
            <p className="text-xl font-semibold text-gray-800">Colors:</p>
            <div className="flex gap-2">
              {product.color.split(",").map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                    selectedColor === color.trim()
                      ? "border-black"
                      : "border-white"
                  }`}
                  style={{ backgroundColor: color.trim() }}
                  title={color.trim()}
                  onClick={() => setSelectedColor(color.trim())}
                ></div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ProductInfo label="What's Included" items={itemsIncluded} />
            <ProductInfo label="Features" items={features} />
            <ProductInfo label="Benefits" items={benefits} />
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              // onClick={() => {
              //   setSingleProduct(product);
              //   closeSidebar();
              //   setShowPayment(true);
              // }}
              onClick={handleBuyNow}
            >
              Buy Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {cartMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              {cartMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <RelatedProducts/> */}
    </motion.div>
  );
};

export default SingleProduct;
