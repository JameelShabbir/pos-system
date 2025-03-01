import React, { useState } from 'react';
import { ArrowLeft, X, Utensils, Trash, RefreshCw } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import MenuItem from '../components/MenuItem';
import OrderItem from '../components/OrderItem';
import { Category, MenuItem as MenuItemType, CartItem } from '../types';

interface MenuPageProps {
  navigateTo: (page: string) => void;
  showCart: boolean;
  toggleCart: () => void;
  categories: Category[];
  menuItems: MenuItemType[];
  cartItems: CartItem[];
  handleAddToCart: (item: any) => void;
  handleQuantityChange: (id: number, change: number) => void;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  selectedTable: number | null;
  customerName: string;
}

const MenuPage: React.FC<MenuPageProps> = ({ 
  navigateTo, 
  showCart, 
  toggleCart, 
  categories, 
  menuItems, 
  cartItems,
  handleAddToCart,
  handleQuantityChange,
  selectedCategory,
  onCategorySelect,
  selectedTable,
  customerName
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return Math.round(calculateTotal() * 0.1);
  };

  const handlePlaceOrder = () => {
    alert(`Order placed successfully! Payment method: ${paymentMethod}`);
    // Here you would typically send the order to a backend
    navigateTo('orders');
  };

  const handlePrintReceipt = () => {
    alert('Printing receipt...');
    // Here you would typically trigger a print function
  };

  return (
    <>
      {/* Left Panel - Menu */}
      <div className={`${showCart ? 'hidden' : 'flex'} md:flex md:w-3/4 w-full flex-col overflow-hidden`}>
        {/* Menu Header */}
        <div className="flex items-center p-4">
          <button 
            className="flex items-center justify-center bg-blue-600 rounded-full w-10 h-10 mr-3"
            onClick={() => navigateTo('tables')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Menu</h2>
        </div>

        {/* Menu Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              color={category.color}
              items={category.items}
              isSelected={category.name === selectedCategory}
              onClick={() => onCategorySelect(category.id)}
            />
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Right Panel - Order Details */}
      <div className={`${showCart ? 'flex' : 'hidden'} md:flex md:w-1/4 w-full bg-[#222222] border-l border-gray-700 flex-col`}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-2">
          <button 
            className="bg-[#2a2a2a] p-2 rounded-full"
            onClick={toggleCart}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Customer Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Utensils className="mr-2" />
              <div>
                <div className="text-sm text-gray-400">Customer Name</div>
                <div className="text-sm">Table No: {selectedTable || 2}</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <div className="mr-2">
                  <div className="text-sm font-medium">{customerName || 'Customer Name'}</div>
                  <div className="text-xs text-gray-400">#101/Dine In</div>
                  <div className="text-xs text-gray-400">{new Date().toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
                <div className="bg-yellow-500 text-black font-bold rounded-md px-2 py-1">
                  CN
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-medium mb-4">Order Details</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <OrderItem 
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                handleQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Items({cartItems.length})</span>
            <span className="font-bold">₹{calculateTotal()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Tax(5.25%)</span>
            <span className="font-bold">₹{calculateTax()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button 
              className={`py-2 rounded-md ${paymentMethod === 'cash' ? 'bg-yellow-500 text-black font-bold' : 'bg-[#2a2a2a]'}`}
              onClick={() => setPaymentMethod('cash')}
            >
              Cash
            </button>
            <button 
              className={`py-2 rounded-md ${paymentMethod === 'online' ? 'bg-yellow-500 text-black font-bold' : 'bg-[#2a2a2a]'}`}
              onClick={() => setPaymentMethod('online')}
            >
              Online
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="bg-blue-600 py-3 rounded-md"
              onClick={handlePrintReceipt}
              disabled={cartItems.length === 0}
            >
              Print Receipt
            </button>
            <button 
              className="bg-yellow-500 text-black font-bold py-3 rounded-md"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;