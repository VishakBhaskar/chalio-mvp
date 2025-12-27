import React from 'react';
import MenuItem from './MenuItem';

const MenuSection = ({ category, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-mexican-orange mb-4 pb-2 border-b-2 border-mexican-yellow">
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <MenuItem key={`${item.Name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
