import React from 'react';
import { NAV_ITEMS } from '../data';
import { NavigationItem } from '../types';

interface MenuProps {
  onItemClick: (item: NavigationItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onItemClick }) => {
  return (
    <nav className="fixed top-8 left-8 z-50 flex flex-wrap gap-3">
      {NAV_ITEMS.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="
            px-5 py-2.5 
            text-xs font-normal tracking-wide
            bg-white/40 backdrop-blur-md
            hover:bg-white/70 hover:shadow-lg
            transition-all duration-300
            rounded-full
            text-gray-800
            shadow-sm
          "
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Menu;