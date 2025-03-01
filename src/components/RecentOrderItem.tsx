import React from 'react';

interface RecentOrderItemProps {
  id: number;
  customer: string;
  items: number;
  table: number;
  status: string;
}

const RecentOrderItem: React.FC<RecentOrderItemProps> = ({ id, customer, items, table, status }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-yellow-500 text-black font-bold rounded-md w-12 h-12 flex items-center justify-center mr-4">
          JA
        </div>
        <div>
          <div className="font-medium">{customer}</div>
          <div className="text-sm text-gray-400">{items} items</div>
        </div>
      </div>
      <div className="bg-yellow-500 text-black px-3 py-1 rounded-md">
        Table No: {table}
      </div>
      <div className="flex items-center text-green-500">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span>Ready</span>
      </div>
    </div>
  );
};

export default RecentOrderItem;