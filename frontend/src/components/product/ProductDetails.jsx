import React from 'react';
import { motion } from 'framer-motion';

const ProductDetails = ({ name, description, features, benefits, itemsIncluded, price, color }) => {
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="mt-4"
    >
      <motion.h2 variants={itemVariants} className="text-xl font-bold">{name}</motion.h2>
      <motion.p variants={itemVariants} className="text-gray-600 mt-2">{description}</motion.p>

      <div className="md:flex gap-7">
        {features && (
          <motion.div variants={itemVariants} className="mt-4">
            <h3 className="font-semibold">Features:</h3>
            <motion.ul variants={listVariants} className="list-disc ml-6 text-sm text-gray-700">
              {features.split(/(?=[A-Z])/).map((feature, index) => (
                <motion.li key={index} variants={itemVariants}>{feature}</motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {benefits && (
          <motion.div variants={itemVariants} className="mt-4">
            <h3 className="font-semibold">Benefits:</h3>
            <motion.ul variants={listVariants} className="list-disc ml-6 text-sm text-gray-700">
              {benefits.split(/(?=[A-Z])/).map((benefit, index) => (
                <motion.li key={index} variants={itemVariants}>{benefit}</motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {itemsIncluded && (
          <motion.div variants={itemVariants} className="mt-4">
            <h3 className="font-semibold">Items Included:</h3>
            <motion.ul variants={listVariants} className="list-disc ml-6 text-sm text-gray-700">
              {itemsIncluded.split(/(?=[A-Z])/).map((item, index) => (
                <motion.li key={index} variants={itemVariants}>{item}</motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </div>

      <motion.div variants={itemVariants} className="mt-4">
        <motion.p 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold text-gray-800"
        >
          ₹ {price}
        </motion.p>
        <div className="mt-2">
          <span className="font-semibold">Color:</span>
          <motion.span
            whileHover={{ scale: 1.2 }}
            className="ml-2 inline-block w-6 h-6 rounded-full border shadow-xl cursor-pointer"
            style={{ backgroundColor: color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;