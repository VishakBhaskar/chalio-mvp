import React from 'react';
import { formatPrice } from '../utils/menuParser';

const MenuItem = ({ item }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-warm-beige">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-mexican-brown flex-1 pr-2">
          {item.Name}
        </h3>
        <span className="text-xl font-bold text-mexican-red whitespace-nowrap">
          {formatPrice(item.Price)}
        </span>
      </div>
    </div>
  );
};

export default MenuItem;
