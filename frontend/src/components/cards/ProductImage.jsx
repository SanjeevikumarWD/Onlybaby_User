import React from 'react';
import { motion } from 'framer-motion';

const ProductImage = ({ image, name, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-lg"
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={image}
        alt={name}
        className="object-cover object-center w-full rounded-md h-48 sm:h-60 md:h-72 lg:h-80 cursor-pointer transform transition-transform duration-300 hover:brightness-105"
        onClick={onClick}
      />
    </motion.div>
  );
};

export default ProductImage;