import { useContext, useEffect, useState } from "react";
import { ToyStore } from "../context/ContextApi";
import Cards from "../cards/Cards";
import FadeInOnScroll from "../fadein/FadeInOnScroll";

const AllProducts = () => {
  const { filteredProducts, handleAgeRangeClick, handlePriceRangeClick } =
    useContext(ToyStore);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = setTimeout(() => {
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadData);
  }, [filteredProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="mt-12 px-10 py-10">
      <FadeInOnScroll threshold={0.5}>
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl md:text-2xl lg:text-4xl font-sour">
            All Products
          </p>
          <div className="flex space-x-4">
            {/* Age Range Filter */}
            <select
              className="border rounded-md px-3 py-2"
              onChange={(e) => handleAgeRangeClick(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Filter by Age
              </option>
              <option value="0-1">0-1 Years</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-6">3-6 Years</option>
              <option value="6-11">6-11 Years</option>
              <option value="11-19">11-19 Years</option>
            </select>
            {/* Price Range Filter */}
            <select
              className="border rounded-md px-3 py-2"
              onChange={(e) => handlePriceRangeClick(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Filter by Price
              </option>
              <option value="0-200">₹0-₹200</option>
              <option value="200-500">₹200-₹500</option>
              <option value="500-1000">₹500-₹1000</option>
              <option value="1000-2000">₹1000-₹2000</option>
            </select>
          </div>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!products || products.length === 0 ? (
            <div className="text-center mt-10 min-h-[300px] flex justify-center items-center">
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-600">
                No products available for the selected category.
              </p>
            </div>
          ) : (
            products.map((item, index) => <Cards key={index} product={item} />)
          )}
        </div>
      </FadeInOnScroll>
    </div>
  );
};

export default AllProducts;
