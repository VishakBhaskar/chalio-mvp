import React, { useState, useEffect } from 'react';
import MenuSection from './MenuSection';
import { loadMenu } from '../utils/menuParser';

const Menu = () => {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const menuData = await loadMenu();
      setMenu(menuData);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mexican-orange"></div>
      </div>
    );
  }

  return (
    <div className="max-h-[600px] overflow-y-auto px-4 py-6 bg-warm-beige rounded-lg">
      <div className="max-w-6xl mx-auto">
        {Object.entries(menu).map(([category, items]) => (
          <MenuSection key={category} category={category} items={items} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
