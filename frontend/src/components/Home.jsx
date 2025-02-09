import { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroImg from "../../public/assets/herobg.jpg";
import one from "../assets/0.jpg";
import two from "../assets/1.jpg";
import three from "../assets/2.jpg";
import four from "../assets/3.jpg";
import five from "../assets/4.jpg";
import Cards from "./cards/Cards";
import { ToyStore } from "./context/ContextApi";
import { useNavigate } from "react-router-dom";
import { FaGift, FaLock, FaTruck } from "react-icons/fa";
import { ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react";
import React from "react";
import { useMotionValue, useTransform } from "framer-motion";

const ageRanges = [
  { img: one, label: "0 - 1 Years", range: "0-1" },
  { img: two, label: "1 - 3 Years", range: "1-3" },
  { img: three, label: "3 - 6 Years", range: "3-6" },
  { img: four, label: "6 - 11 Years", range: "6-11" },
  { img: five, label: "11 - 19 Years", range: "11-19" },
];

function Home() {
  const { products, handleAgeRangeClick } = useContext(ToyStore);
  const navigate = useNavigate();

  const { newArrival } = useContext(ToyStore);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ageRef, ageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bestSeller = products?.filter((product) => product.bestSellers);
  
  const features = [
    {
      icon: <FaGift className="w-8 h-8" />,
      title: "Special Gifts",
      description: "Unique toys for every age",
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Right to your doorstep",
    },
    {
      icon: <FaLock className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Quality guaranteed toys",
    },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(to right, #f87171, #f43f5e)",
    "linear-gradient(to right, #f43f5e, #f87171)",
    "linear-gradient(to right, #fbbf24, #f59e0b)",
  ]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      window.location.href = "/product";
    }
  };

  return (
    <div className="relative mt-12 z-10 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative w-full min-h-screen"
      >
        {/* Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={heroImg}
            alt="Hero"
            className="w-full h-screen object-center  object-cover filter brightness-75 transform scale-105"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.5,
                },
              },
            }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Sliding Shop Button */}
            <div className="relative mt-56 w-64 h-20 rounded-full bg-gray-200/20 backdrop-blur-sm p-2">
              <motion.div
                className="w-full h-full relative rounded-full opacity-70"
                style={{ background }}
              >
                <motion.button
                  className="absolute left-2 top-3 w-10 h-10 rounded-full bg-white shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 180 }}
                  dragElastic={0.1}
                  dragMomentum={false}
                  style={{ x }}
                  onDragEnd={handleDragEnd}
                >
                  <ArrowRight className="w-5 h-5 text-rose-900 " />
                </motion.button>
                <div className="text-xl absolute right-4 top-1/2 -translate-y-1/2 text-white font-medium font-sour">
                  Slide to shop
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Sub Hero Section */}
        <motion.div
          className="hidden  absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-8 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Premium Selection",
                desc: "Curated products for you",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Worldwide shipping",
              },
              {
                icon: Shield,
                title: "Secure Shopping",
                desc: "100% protected checkout",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
              >
                <item.icon className="w-8 h-8 text-rose-500" />
                <div className="text-left">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="px-4 lg:px-16 py-20 max-w-7xl mx-auto">
        <motion.div
          ref={ageRef}
          initial="hidden"
          animate={ageInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900"
          >
            Tiny Tykes' Timeframe
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {ageRanges.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => {
                  handleAgeRangeClick(item.range);
                  // navigate("/product");
                }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  <motion.img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <motion.p className="mt-4 text-center text-sm md:text-base font-medium text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
                  {item.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-32 space-y-32 ">
          {/* Best Seller Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16">
              Best Seller Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
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

          {/* New Arrivals Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            ref={newArrival}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16">
              New Arrivals
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
              {products
                .slice(-6)
                .reverse()
                .map((product, index) =>
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

          <div className="text-center py-16">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(251 113 133 / 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
              }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 px-8 py-4 text-xl font-bold text-white transition-all duration-300 ease-out hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              onClick={() => navigate("/product")}
            >
              <span className="relative inline-flex items-center space-x-3">
                <span>View all Products</span>
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
