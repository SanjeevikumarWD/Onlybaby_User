import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
    />
  </div>
);

export default LoadingSpinner;