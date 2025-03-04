import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Table } from '../types';

interface TablesPageProps {
  tables: Table[];
  onTableSelect: (tableId: number) => void;
  navigateTo: (page: string) => void;
}

const TablesPage: React.FC<TablesPageProps> = ({ tables, onTableSelect, navigateTo }) => {
  const [filter, setFilter] = useState<'all' | 'booked'>('all');

  const filteredTables = filter === 'all' 
    ? tables 
    : tables.filter(table => table.status === 'booked');

  return (
    <div className="w-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button 
            className="flex items-center justify-center bg-blue-600 rounded-full w-10 h-10 mr-3"
            onClick={() => navigateTo('home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Tables</h2>
          
          <div className="ml-auto flex bg-[#2a2a2a] rounded-lg overflow-hidden">
            <button 
              className={`px-4 py-2 ${filter === 'all' ? 'bg-[#3a3a3a]' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 ${filter === 'booked' ? 'bg-[#3a3a3a]' : ''}`}
              onClick={() => setFilter('booked')}
            >
              Booked
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredTables.map(table => (
            <div 
              key={table.id}
              className="bg-zinc-700 rounded-lg p-4 cursor-pointer hover:bg-zinc-600"
              onClick={() => onTableSelect(table.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Table {table.number}</h3>
                <span className={`px-2 py-1 rounded-md text-xs ${
                  table.status === 'available' 
                    ? 'bg-amber-600 text-black' 
                    : 'bg-green-600 text-white'
                }`}>
                  {table.status === 'available' ? 'Available' : 'Booked'}
                </span>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${
                  ['JS', 'RT', 'NK', 'JS'].includes(table.customer) 
                    ? 'bg-blue-600' 
                    : ['EK', 'QN'].includes(table.customer)
                    ? 'bg-yellow-500'
                    : ['GT'].includes(table.customer)
                    ? 'bg-green-500'
                    : 'bg-gray-600'
                }`}>
                  {table.customer}
                </div>
              </div>
              
              <div className="text-sm text-gray-400 text-center">
                Seats: {table.seats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablesPage;