import React from 'react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: number;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon, color, items, isSelected, onClick }) => {
  return (
    <div 
      className={`${color} rounded-lg p-4 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <span className="text-2xl">{icon}</span>
        {isSelected && (
          <div className="bg-white rounded-full p-1">
            <div className="bg-red-500 rounded-full w-2 h-2"></div>
          </div>
        )}
      </div>
      <h3 className="font-medium mt-2">{name}</h3>
      <p className="text-sm text-gray-200 mt-1">{items} Items</p>
    </div>
  );
};

export default CategoryCard;