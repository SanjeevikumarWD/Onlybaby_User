import React from "react";
import { Gift, Sparkles, ShoppingBag } from "lucide-react";

const Benefits = () => (
  <div className="flex justify-center gap-6 px-4">
    <div className="flex flex-col items-center">
      <div className="p-2 bg-purple-100 rounded-full mb-2">
        <Gift className="w-5 h-5 text-purple-600" />
      </div>
      <span className="text-xs text-gray-600">Special Offers</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="p-2 bg-blue-100 rounded-full mb-2">
        <Sparkles className="w-5 h-5 text-blue-600" />
      </div>
      <span className="text-xs text-gray-600">Extra Credits</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="p-2 bg-rose-100 rounded-full mb-2">
        <ShoppingBag className="w-5 h-5 text-rose-600" />
      </div>
      <span className="text-xs text-gray-600">10% Discount</span>
    </div>
  </div>
);


export default Benefits;