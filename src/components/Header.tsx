import React from 'react';
import { Search, Bell, Menu as MenuIcon, ShoppingCart, Utensils } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, toggleCart }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center">
        <Utensils className="mr-2" />
        <span className="text-xl font-bold">POS</span>
      </div>
      <div className="relative hidden md:flex items-center bg-[#2a2a2a] rounded-md px-3 py-1.5">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none ml-2 w-64"
        />
      </div>
      <div className="flex items-center">
        <Bell className="mr-4 text-yellow-400 cursor-pointer hidden sm:block" />
        <div className="hidden sm:flex items-center">
          <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="text-white cursor-pointer">JA</span>
          </div>
          <div>
            <div className="text-sm font-medium">Jameel abbas</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        </div>
        {currentPage === 'menu' && (
          <button
            className="md:hidden bg-[#2a2a2a] p-2 rounded-md ml-2"
            onClick={toggleCart}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        )}
        <button className="sm:hidden bg-[#2a2a2a] p-2 rounded-md ml-2">
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;