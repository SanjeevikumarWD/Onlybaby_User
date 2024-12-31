import React from 'react';
import ProductItem from './ProductItem';

const OrderItem = ({ order, index }) => (
  <div
    className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl animate-slide-up group"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="bg-gradient-to-r from-teal-500 to-purple-500 p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <h3 className="text-3xl font-bold text-white mb-2">Order #{order._id.slice(-8)}</h3>
      <p className="text-teal-50 text-lg">
        {new Date(order.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>

    <div className="p-8">
      <div className="flex flex-wrap gap-4 mb-8">
        <span className={`px-6 py-2 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
          order.payment.paymentStatus === 'completed' 
            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        }`}>
          {order.payment.paymentStatus}
        </span>
        <span className="px-6 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:bg-purple-200">
          ₹{order.totalPrice.toLocaleString()}
        </span>
      </div>

      <div className="space-y-6">
        {order.orderItems.map((item, itemIndex) => (
          <ProductItem key={item._id} item={item} itemIndex={itemIndex} />
        ))}
      </div>
    </div>
  </div>
);


export default OrderItem;