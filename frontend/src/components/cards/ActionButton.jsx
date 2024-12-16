import React from 'react';
import { motion } from 'framer-motion';

const ActionButton = ({ onClick, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default ActionButton;