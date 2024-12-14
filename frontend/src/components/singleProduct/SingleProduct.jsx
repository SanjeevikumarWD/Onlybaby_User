import React, { useContext, useState } from "react";
import { ToyStore } from "../context/ContextApi";
import Cards from "../cards/Cards";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SingleProduct = () => {
  const { sidebarState, closeSidebar, addToCart, products } =
    useContext(ToyStore);
  const product = sidebarState.product;

  if (!sidebarState.isOpen || !product) return null;

  const {
    image,
    name,
    description,
    features,
    benefits,
    price,
    color,
    ageGroup,
    itemsIncluded,
  } = product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartMessage, setCartMessage] = useState(""); // State for the cart message

  // Function to handle next and previous image navigation
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    setCartMessage("Item added to cart!"); // Show message
    setTimeout(() => setCartMessage(""), 3000); // Clear message after 3 seconds
  };

  // Mock related products based on age group (Replace with real logic if available)
  const relatedProducts = products.filter(
    (p) => p.ageGroup === ageGroup && p._id !== product._id
  );

  return (
    <div className="fixed top-0 right-0 w-9/12 lg:w-7/12 h-full bg-white shadow-lg z-50 overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={closeSidebar}
      >
        ✕
      </button>

      <div className="p-6">
        {/* Product Images Carousel */}
        <div className="relative">
          <div className="flex justify-center items-center">
            <img
              src={image[currentImageIndex]}
              alt={`${name}-${currentImageIndex}`}
              className="w-80 h-80 object-contain rounded-lg"
            />
          </div>
          {/* Previous and Next Buttons */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700"
            onClick={handlePrevImage}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700"
            onClick={handleNextImage}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600 mt-2">{description}</p>

          <div className="md:flex gap-7">
            {/* Features */}
            {features && (
              <div className="mt-4">
                <h3 className="font-semibold">Features:</h3>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {features.split(/(?=[A-Z])/).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefits && (
              <div className="mt-4">
                <h3 className="font-semibold">Benefits:</h3>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {benefits.split(/(?=[A-Z])/).map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Items Included */}
            {itemsIncluded && (
              <div className="mt-4">
                <h3 className="font-semibold">Items Included:</h3>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {itemsIncluded.split(/(?=[A-Z])/).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Price and Color */}
          <div className="mt-4">
            <p className="text-xl font-bold text-gray-800">₹ {price}</p>
            <div className="mt-2">
              <span className="font-semibold">Color:</span>
              <span
                className="ml-2 inline-block w-6 h-6 rounded-full border shadow-xl"
                style={{ backgroundColor: color }}
              ></span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600"
              onClick={() => alert("Buy Now functionality to be implemented!")}
            >
              Buy Now
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Cart Message */}
          {cartMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              {cartMessage}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Related Products</h3>
            <div className="flex gap-4 mt-4 overflow-x-auto">
              {relatedProducts.map((related, index) => (
                <div
                  key={index}
                  className="min-w-[200px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] xl:min-w-[350px]"
                >
                  <Cards product={related} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
