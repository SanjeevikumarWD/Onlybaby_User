import React, { useContext, useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { ToyStore } from "../context/ContextApi";
import { toast } from "react-toastify";

const Cards = ({ product }) => {
  const { addToCart, openSidebar } = useContext(ToyStore);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Add item to the cart
    toast.success(`${product.name} added to cart!`); // Show success notification
  };

  // Calculate discount percentage (assuming originalPrice is available)
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="relative flex flex-col justify-between max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-2 py-3 sm:px-5 md:px-2 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
      {/* Discount Badge */}
      {discountPercentage && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.image[0]}
        alt={product.name}
        className="object-cover object-center w-full rounded-md h-48 sm:h-60 md:h-72 lg:h-80 dark:bg-gray-500"
        onClick={() => openSidebar(product)}
      />

      {/* Product Details */}
      <div className="mt-4 mb-2">
        <span className="block text-xs md:text-sm lg:text-md font-medium tracking-widest uppercase dark:text-violet-600">
          {product.name}
        </span>
      </div>

      {/* Price and Actions */}
      <div className="flex items-center justify-between font-bold text-sm sm:text-base dark:text-gray-800">
        <div className="text-gray-700">₹ {product.price}</div>
        <div className="flex gap-5">
          {/* Cart Icon */}
          <div
            className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleAddToCart(product)}
          >
            <FaCartPlus className="text-[12px] md:text-xl text-black" />
          </div>

          {/* Heart Icon */}
          <div
            className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
            onClick={toggleLike}
          >
            {isLiked ? (
              <FaHeart className="text-[12px] md:text-xl text-red-500" />
            ) : (
              <FaRegHeart className="text-[12px] md:text-xl text-gray-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
