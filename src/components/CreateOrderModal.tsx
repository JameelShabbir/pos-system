import React from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface CreateOrderModalProps {
  onClose: () => void;
  onCreateOrder: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  onClose,
  onCreateOrder,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  guestCount,
  setGuestCount
}) => {
  const handleIncreaseGuests = () => {
    setGuestCount(guestCount + 1);
  };

  const handleDecreaseGuests = () => {
    if (guestCount > 0) {
      setGuestCount(guestCount - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#222222] rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Create Order</h2>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Customer Name</label>
            <input
              type="text"
              placeholder="Enter customer name"
              className="bg-[#2a2a2a] text-white rounded-md px-4 py-2 w-full"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Customer Phone</label>
            <input
              type="text"
              placeholder="+91-9999999999"
              className="bg-[#2a2a2a] text-white rounded-md px-4 py-2 w-full"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Guest</label>
            <div className="flex items-center">
              <button 
                className="bg-[#2a2a2a] text-yellow-500 rounded-md p-2"
                onClick={handleDecreaseGuests}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="mx-4 text-xl">{guestCount} Person</span>
              <button 
                className="bg-[#2a2a2a] text-yellow-500 rounded-md p-2"
                onClick={handleIncreaseGuests}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <button 
            className="bg-yellow-500 text-black font-bold py-3 rounded-md w-full"
            onClick={onCreateOrder}
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;