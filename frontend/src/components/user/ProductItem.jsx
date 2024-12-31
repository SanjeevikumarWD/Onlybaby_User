import React from 'react';

const ProductItem = ({ item, itemIndex }) => (
  <div
    className="group flex flex-col sm:flex-row items-center gap-8 p-8 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
    style={{ animationDelay: `${itemIndex * 100}ms` }}
  >
    <div className="relative w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-xl transition-all duration-300">
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
    </div>
    <div className="flex-1 min-w-0 text-center sm:text-left">
      <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-purple-600 transition-all duration-300">
        {item.name}
      </h4>
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:bg-teal-200">
          Qty: {item.quantity}
        </span>
        <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:bg-pink-200">
          {item.color}
        </span>
        <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:bg-purple-200">
          ₹{item.price.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);


export default ProductItem;