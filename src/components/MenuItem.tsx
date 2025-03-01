import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  handleQuantityChange: (id: number, change: number) => void;
  handleAddToCart: (item: any) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, price, handleQuantityChange, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    handleQuantityChange(id, 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      handleQuantityChange(id, -1);
    }
  };

  const addToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
      handleAddToCart({ id, name, price });
    } else {
      handleAddToCart({ id, name, price, quantity });
    }
  };

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-4 relative">
      <h3 className="font-medium">{name}</h3>
      <div className="flex justify-between items-center mt-6">
        <div className="font-bold">Rs{price}</div>
        <div className="flex items-center">
          <button
            className="bg-[#2a2a2a] text-yellow-500 rounded-md p-1"
            onClick={decreaseQuantity}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            className="bg-[#2a2a2a] text-yellow-500 rounded-md p-1"
            onClick={increaseQuantity}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        className="absolute top-4 right-4 bg-green-600 rounded-md p-1"
        onClick={addToCart}
      >
        <ShoppingCart className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MenuItem;