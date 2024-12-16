import React from 'react';
import { motion } from 'framer-motion';

const ActionButtons = ({ onBuyNow, onAddToCart }) => {
  return (
    <div className="mt-6 flex gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition-colors duration-300"
        onClick={onBuyNow}
      >
        Buy Now
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition-colors duration-300"
        onClick={onAddToCart}
      >
        Add to Cart
      </motion.button>
    </div>
  );
};

export default ActionButtons;