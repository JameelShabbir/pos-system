import React from 'react';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, showViewAll = true }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium">{title}</h2>
      {showViewAll && <a href="#" className="text-blue-500 text-sm">View all</a>}
    </div>
  );
};

export default SectionHeader;