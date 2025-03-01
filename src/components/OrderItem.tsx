import React from 'react';
import { Trash, RefreshCw } from 'lucide-react';

interface OrderItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  handleQuantityChange: (id: number, change: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ id, name, price, quantity, handleQuantityChange }) => {
  const removeItem = () => {
    handleQuantityChange(id, -quantity);
  };

  const refreshItem = () => {
    handleQuantityChange(id, 1);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>x{quantity}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <button className="text-gray-400 mr-2" onClick={removeItem}>
            <Trash className="w-4 h-4" />
          </button>
          <button className="text-gray-400" onClick={refreshItem}>
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <span className="font-bold">₹{price * quantity}</span>
      </div>
    </div>
  );
};

export default OrderItem;