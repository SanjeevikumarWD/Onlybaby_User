import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToyStore } from "../context/ContextApi";
import ImageCarousel from "./ImageCarousel";
import ProductDetails from "./ProductDetails";
import ActionButtons from "./ActionButtons";
import RelatedProducts from "./RelatedProducts";

const SingleProduct = () => {
  const { sidebarState, closeSidebar, addToCart, products } = useContext(ToyStore);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartMessage, setCartMessage] = useState("");

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

  const relatedProducts = products.filter(
    (p) => p.ageGroup === product.ageGroup && p._id !== product._id
  );

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed top-0 right-0 w-9/12 lg:w-7/12 h-full bg-white shadow-lg z-50 overflow-y-auto"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300"
        onClick={closeSidebar}
      >
        ✕
      </motion.button>

      <div className="p-6">
        <ImageCarousel
          images={product.image}
          currentIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          productName={product.name}
        />

        <ProductDetails
          name={product.name}
          description={product.description}
          features={product.features}
          benefits={product.benefits}
          itemsIncluded={product.itemsIncluded}
          price={product.price}
          color={product.color}
        />

        <ActionButtons
          onBuyNow={() => alert("Buy Now functionality to be implemented!")}
          onAddToCart={handleAddToCart}
        />

        <AnimatePresence>
          {cartMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-100 text-green-800 rounded"
            >
              {cartMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <RelatedProducts products={relatedProducts} />
      </div>
    </motion.div>
  );
};

export default SingleProduct;