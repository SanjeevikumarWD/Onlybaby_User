import React, { useContext } from "react";
import heroImg from "../assets/hero1.webp";
import one from "../assets/0.png";
import two from "../assets/1.png";
import three from "../assets/2.png";
import four from "../assets/3.png";
import five from "../assets/4.png";
import FadeInOnScroll from "./fadein/FadeInOnScroll";
import Cards from "./cards/Cards";
import { ToyStore } from "./context/ContextApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { products, category } = useContext(ToyStore);
  

  const navigate = useNavigate();

  const bestSeller = products.filter((product) => product.bestSeller);
  const featuredProducts = products.filter(
    (product) => product.featuredProducts
  );

  return (
    <div className="relative mt-16 z-10">
      <div>
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-screen object-cover filter brightness-75" // Adjust the image dullness
        />
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 flex flex-col justify-center items-center text-center z-10">
          <FadeInOnScroll threshold={0.6}>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-sour mb-4">
              Welcome to ToyLand!
            </h1>
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-sour mb-6">
              Where Fun and Learning Never End
            </p>
            <button className="bg-yellow-500 text-black py-3 px-8 rounded-full text-xl font-semibold hover:bg-yellow-400 transition-all duration-300">
              Shop Now
            </button>
          </FadeInOnScroll>
        </div>
      </div>
      
      <div className="px-3 lg:px-10 mt-20">
        <FadeInOnScroll threshold={0.5}>
          <p className="text-xl md:text-2xl lg:text-4xl font-sour mb-10 ">
            Tiny Tykes' Timeframe{" "}
          </p>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="flex flex-wrap justify-center space-x-4 mt-2">
            <div className="text-center">
              <img
                src={one}
                alt="0-1 Years"
                className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto"
              />
              <p className="text-[10px] md:text-[12px] mt-1 font-medium md:font-semibold lg:font-bold">
                0 - 1 Years
              </p>
            </div>
            <div className="text-center">
              <img
                src={two}
                alt="1-3 Years"
                className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto"
              />
              <p className="text-[10px] md:text-[12px] mt-1 font-medium md:font-semibold lg:font-bold">
                1 - 3 Years
              </p>
            </div>
            <div className="text-center">
              <img
                src={three}
                alt="3-6 Years"
                className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto"
              />
              <p className="text-[10px] md:text-[12px] mt-1 font-medium md:font-semibold lg:font-bold">
                3 - 6 Years
              </p>
            </div>
            <div className="text-center">
              <img
                src={four}
                alt="6-11 Years"
                className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto"
              />
              <p className="text-[10px] md:text-[12px] mt-1 font-medium md:font-semibold lg:font-bold">
                6 - 11 Years
              </p>
            </div>
            <div className="text-center">
              <img
                src={five}
                alt="11-19 Years"
                className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto"
              />
              <p className="text-[10px] md:text-[12px] mt-1 font-medium md:font-semibold lg:font-bold">
                11 - 19 Years
              </p>
            </div>
          </div>
        </FadeInOnScroll>
        <div className="px-3 mt-20">
          <FadeInOnScroll threshold={0.5}>
            <p className="text-xl md:text-2xl lg:text-4xl font-sour mb-10 ">
              Find the Perfect Pick for Every Play!
            </p>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {/* {category.map((_, index) => (
                <div key={index} className="text-center space-y-5">
                  <div className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 bg-gray-200 rounded-full mx-auto">
                    <img
                      src={one}
                      alt={`Circle ${index + 1}`}
                      className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto"
                    />
                  </div>
                  <p className="text-[10px] md:text-[12px] mt-1 font-medium md:font-semibold lg:font-bold">
                    Circle {index + 1}
                  </p>
                </div>
              ))} */}
            </div>
          </FadeInOnScroll>
          <div className="mt-20">
            <FadeInOnScroll threshold={0.5}>
              <p className="text-xl md:text-2xl lg:text-4xl font-sour my-10 ">
                Best Seller Products
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bestSeller.map((product, index) =>
                  product ? <Cards product={product} key={index} /> : null
                )}
              </div>
            </FadeInOnScroll>
            <div className="mt-20">
              <FadeInOnScroll threshold={0.5}>
                <p className="text-xl md:text-2xl lg:text-4xl font-sour my-10 ">
                  New Arrivals
                </p>
              </FadeInOnScroll>
              <FadeInOnScroll>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(-6).reverse().map((product, index) =>
                    product ? <Cards product={product} key={index} /> : null
                  )}
                </div>
              </FadeInOnScroll>
            </div>
            <div>
              <button
                className="text-xl md:text-2xl lg:text-4xl font-sour my-10  mx-auto text-white bg-black py-2 px-3 rounded-xl "
                onClick={() => navigate("/product")}
              >
                View all Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
