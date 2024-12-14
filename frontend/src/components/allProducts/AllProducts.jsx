import { useContext, useEffect, useState } from "react";
import { ToyStore } from "../context/ContextApi";
import Cards from "../cards/Cards";
import FadeInOnScroll from "../fadein/FadeInOnScroll";

const AllProducts = () => {
  const { filteredProducts } = useContext(ToyStore);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Simulate a loading delay (optional)
    const loadData = setTimeout(() => {
      setProducts(filteredProducts);
      setLoading(false); // Stop loading once data is set
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(loadData); // Cleanup timeout
  }, [filteredProducts]);

  // Show loading animation while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  // Show fallback if no products are available
  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-10 min-h-[300px] flex justify-center items-center ">
        <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-600">
          No products available for the selected category.
        </p>
      </div>
    );
  }

  // Show products grid
  return (
    <div className="mt-12 px-10 py-10">
      <FadeInOnScroll threshold={0.5}>
        <p className="text-xl md:text-2xl lg:text-4xl font-sour my-10">
          All Products
        </p>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, index) => (
            <Cards key={index} product={item} />
          ))}
        </div>
      </FadeInOnScroll>
    </div>
  );
};

export default AllProducts;
