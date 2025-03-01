import React from 'react';

interface PopularDishCardProps {
  id: number;
  name: string;
  orders: number;
  image: string;
  index: number;
}

const PopularDishCard: React.FC<PopularDishCardProps> = ({ id, name, orders, image, index }) => {
  return (
    <div className="bg-[#222222] rounded-lg overflow-hidden">
      <div className="relative h-40">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-[#1e1e1e] text-white px-2 py-1 rounded-md">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-400">Orders: {orders}</p>
      </div>
    </div>
  );
};

export default PopularDishCard;