import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroImg from "../assets/hero1.webp";
import one from "../assets/0.png";
import two from "../assets/1.png";
import three from "../assets/2.png";
import four from "../assets/3.png";
import five from "../assets/4.png";
import Cards from "./cards/Cards";
import { ToyStore } from "./context/ContextApi";
import { Link, useNavigate } from "react-router-dom";

const ageRanges = [
  { img: one, label: "0 - 1 Years", range: "0-1" },
  { img: two, label: "1 - 3 Years", range: "1-3" },
  { img: three, label: "3 - 6 Years", range: "3-6" },
  { img: four, label: "6 - 11 Years", range: "6-11" },
  { img: five, label: "11 - 19 Years", range: "11-19" },
];

const Home = () => {
  const { products, handleAgeRangeClick } = useContext(ToyStore);
  const navigate = useNavigate();
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ageRef, ageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bestSeller = products.filter((product) => product.bestSeller);
  const featuredProducts = products.filter((product) => product.featuredProducts);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="relative mt-16 z-10">
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative h-screen"
      >
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-screen object-cover filter brightness-75 transition-all duration-700"
        />
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 flex flex-col justify-center items-center text-center z-10">
          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-sour mb-4 hover:scale-105 transition-transform duration-300"
          >
            Welcome to ToyLand!
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-white text-lg sm:text-xl lg:text-2xl font-sour mb-6"
          >
            Where Fun and Learning Never End
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-black py-3 px-8 rounded-full text-xl font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link to="/product">Shop Now</Link>
          </motion.button>
        </div>
      </motion.div>

      <div className="px-3 lg:px-10 mt-20">
        <motion.div
          ref={ageRef}
          initial="hidden"
          animate={ageInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-10"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-4xl font-sour text-center"
          >
            Tiny Tykes' Timeframe
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6 mt-2">
            {ageRanges.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center cursor-pointer transform transition-all duration-300 hover:shadow-xl rounded-xl p-4"
                onClick={() => {
                  handleAgeRangeClick(item.range);
                  navigate("/product");
                }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full mx-auto hover:ring-4 hover:ring-yellow-400 transition-all duration-300"
                />
                <p className="text-[10px] md:text-[12px] mt-3 font-medium md:font-semibold lg:font-bold">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 space-y-20">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-4xl font-sour mb-10 text-center">
              Best Seller Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSeller.map((product, index) =>
                product ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Cards product={product} />
                  </motion.div>
                ) : null
              )}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-4xl font-sour mb-10 text-center">
              New Arrivals
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(-6).reverse().map((product, index) =>
                product ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Cards product={product} />
                  </motion.div>
                ) : null
              )}
            </div>
          </motion.section>

          <div className="text-center pb-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl md:text-2xl lg:text-4xl font-sour bg-white border-2 border-black py-2 px-6 rounded-xl hover:bg-yellow-400 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/product")}
            >
              View all Products
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;