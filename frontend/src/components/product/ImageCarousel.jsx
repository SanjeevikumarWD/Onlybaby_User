import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, currentIndex, onPrev, onNext, productName }) => {
  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex]}
          alt={`${productName}-${currentIndex}`}
          className="w-80 h-80 object-contain rounded-lg"
        />
      </div>
      
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: '#1F2937' }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700 transition-colors duration-300"
        onClick={onPrev}
      >
        <ChevronLeft />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: '#1F2937' }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700 transition-colors duration-300"
        onClick={onNext}
      >
        <ChevronRight />
      </motion.button>
    </div>
  );
};

export default ImageCarousel;