import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: ReactNode;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, iconBgColor }) => {
  return (
    <div className="bg-[#222222] rounded-lg p-3">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <div className="flex items-center">
        <div className={`${iconBgColor} p-2 rounded-lg mr-4`}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-green-500">{change}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;