import { motion } from "framer-motion";

const NoProductsFound = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full text-center py-20"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-6xl mb-4"
    >
      🔍
    </motion.div>
    <h2 className="text-2xl font-bold text-gray-700 mb-2">Loading....</h2>
    <p className="text-gray-500">
      Try adjusting your filters to find what you're looking for.
    </p>
  </motion.div>
);

export default NoProductsFound;