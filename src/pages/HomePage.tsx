import React from 'react';
import { Search, DollarSign, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import RecentOrderItem from '../components/RecentOrderItem';
import PopularDishCard from '../components/PopularDishCard';
import SectionHeader from '../components/SectionHeader';

interface HomePageProps {
  popularDishes: Array<{
    id: number;
    name: string;
    orders: number;
    image: string;
  }>;
  recentOrders: Array<{
    id: number;
    customer: string;
    items: number;
    table: number;
    status: string;
  }>;
}

const HomePage: React.FC<HomePageProps> = ({ popularDishes, recentOrders }) => {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  return (
    <div className="w-full overflow-y-auto p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Good Morning, Jaamil</h1>
          <p className="text-gray-400">Give your best services for customers 😊</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <div className="text-3xl font-bold">{getCurrentTime()}</div>
          <div className="text-gray-400">{getCurrentDate()}</div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Stats and Recent Orders */}
        <div className="md:w-2/3 lg:w-2/5 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6">
            <StatCard 
              title="Total Earnings" 
              value="₹512" 
              change="1.6% than yesterday" 
              icon={<DollarSign className="w-6 h-6" />} 
              iconBgColor="bg-green-500" 
            />
            <StatCard 
              title="In Progress" 
              value="16" 
              change="3.6% than yesterday" 
              icon={<Clock className="w-6 h-6" />} 
              iconBgColor="bg-yellow-500" 
            />
          </div>

          <div className="bg-[#222222] rounded-lg p-6">
            <SectionHeader title="Recent Orders" />
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="bg-[#2a2a2a] text-white rounded-md pl-10 pr-4 py-2 w-full" 
                placeholder="Search recent orders" 
              />
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <RecentOrderItem 
                  key={order.id}
                  id={order.id}
                  customer={order.customer}
                  items={order.items}
                  table={order.table}
                  status={order.status}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Popular Dishes */}
        <div className="flex-1">
          <SectionHeader title="Popular Dishes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDishes.map((dish, index) => (
              <PopularDishCard 
                key={dish.id}
                id={dish.id}
                name={dish.name}
                orders={dish.orders}
                image={dish.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;