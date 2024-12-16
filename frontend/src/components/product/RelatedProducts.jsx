import React from 'react';
import { motion } from 'framer-motion';
import Cards from '../cards/Cards';

const RelatedProducts = ({ products }) => {
  if (!products.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <h3 className="font-semibold text-lg mb-4">Related Products</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[200px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] xl:min-w-[350px]"
          >
            <Cards product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;