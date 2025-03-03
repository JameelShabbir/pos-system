import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

interface OrdersPageProps {
  navigateTo: (page: string) => void;
}

interface Order {
  id: number;
  customer: string;
  table: number;
  items: number;
  total: number;
  status: string;
  date: string;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ navigateTo }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching orders
  useEffect(() => {
    // This would typically be an API call
    const dummyOrders: Order[] = [
      {
        id: 1001,
        customer: 'Jameel Abbas',
        table: 3,
        items: 4,
        total: 1250,
        status: 'Ready',
        date: new Date().toLocaleDateString()
      }
    ];
    setOrders(dummyOrders);
  }, []);

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

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
          <h2 className="text-2xl font-bold">Orders</h2>
        </div>

        <div className="bg-[#222222] rounded-lg p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-[#2a2a2a] text-white rounded-md pl-10 pr-4 py-2 w-full"
              placeholder="Search orders by customer name or order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-[#2a2a2a] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-yellow-500 text-black font-bold rounded-md w-12 h-12 flex items-center justify-center mr-4">
                        {order.customer.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-400">Order #{order.id}</div>
                      </div>
                    </div>
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-md">
                      Table No: {order.table}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-400">{order.items} items</div>
                      <div className="font-bold">Rs{order.total}</div>
                    </div>
                    <div className="flex items-center text-green-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">No Orders Found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'No orders match your search criteria' : 'Create a new order to get started'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;