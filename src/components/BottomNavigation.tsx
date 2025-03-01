import React from 'react';
import { Home, ClipboardList, Bell, CookingPot, Table as TableIcon, MoreHorizontal } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  navigateTo: (page: string) => void;
  openCreateOrderModal: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  navigateTo,
  openCreateOrderModal
}) => {
  return (
    <div className="bg-[#222222] border-t border-gray-700 p-2">
      <div className="flex justify-around">
        <button
          className={`flex flex-col items-center p-2 ${currentPage === 'home' ? 'text-yellow-500' : ''}`}
          onClick={() => navigateTo('home')}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Home</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${currentPage === 'orders' ? 'text-yellow-500' : ''}`}
          onClick={() => navigateTo('orders')}
        >
          <ClipboardList className="w-5 h-5 mb-1" />
          <span className="text-xs">Orders</span>
        </button>
        <div className="relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div
              className="bg-yellow-500 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={openCreateOrderModal} title='create order'
            >
              {/* <Bell  /> */}
              <CookingPot className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
        <button
          className={`flex flex-col items-center p-2 ${currentPage === 'tables' ? 'text-yellow-500' : ''}`}
          onClick={() => navigateTo('tables')}
        >
          <TableIcon className="w-5 h-5 mb-1" />
          <span className="text-xs">Tables</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <MoreHorizontal className="w-5 h-5 mb-1" />
          <span className="text-xs">More</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;