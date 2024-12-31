import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const RangeSlider = ({
  min,
  max,
  step,
  value,
  onChange,
  formatLabel = (value) => value,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.min(
        Math.max(((e.clientX - rect.left) / rect.width) * 100, 0),
        100
      );
      const newValue = Math.round(
        (percentage * (max - min)) / 100 / step
      ) * step + min;

      const [minVal, maxVal] = value;
      if (Math.abs(newValue - minVal) < Math.abs(newValue - maxVal)) {
        onChange([Math.min(newValue, maxVal - step), maxVal]);
      } else {
        onChange([minVal, Math.max(newValue, minVal + step)]);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, min, max, step, value, onChange]);

  return (
    <div className="relative pt-6 pb-2">
      <div ref={sliderRef} className="h-2 bg-gray-200 rounded-full relative">
        <div
          className="absolute h-full bg-purple-500 rounded-full"
          style={{
            left: `${getPercentage(value[0])}%`,
            right: `${100 - getPercentage(value[1])}%`,
          }}
        />
        {[0, 1].map((index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-purple-500 cursor-pointer"
            style={{
              left: `${getPercentage(value[index])}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={() => handleMouseDown(index)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{formatLabel(value[0])}</span>
        <span>{formatLabel(value[1])}</span>
      </div>
    </div>
  );
};

export default RangeSlider;