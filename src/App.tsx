import React, { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import TablesPage from './pages/TablesPage';
import OrdersPage from './pages/OrdersPage';
import CreateOrderModal from './components/CreateOrderModal';
import { Category, MenuItem, CartItem, PopularDish, RecentOrder, Table } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Starters');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'menu', 'tables', 'orders'
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [guestCount, setGuestCount] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  
  const categories: Category[] = [
    { id: 'starters', name: 'Starters', icon: '🍲', color: 'bg-red-500', items: 6 },
    { id: 'main', name: 'Main Course', icon: '🍛', color: 'bg-purple-500', items: 6 },
    { id: 'beverages', name: 'Beverages', icon: '🥤', color: 'bg-pink-600', items: 6 },
    { id: 'soups', name: 'Soups', icon: '🍜', color: 'bg-amber-700', items: 6 },
    { id: 'desserts', name: 'Desserts', icon: '🍰', color: 'bg-blue-800', items: 4 },
    { id: 'pizzas', name: 'Pizzas', icon: '🍕', color: 'bg-green-700', items: 3 },
    // { id: 'alcoholic', name: 'Alcoholic Drinks', icon: '🍷', color: 'bg-red-600', items: 6 },
    { id: 'salads', name: 'Salads', icon: '🥗', color: 'bg-purple-600', items: 5 }
  ];

  const menuItemsByCategory: Record<string, MenuItem[]> = {
    starters: [
      { id: 1, name: 'Paneer Tikka', price: 250, category: 'starters' },
      { id: 2, name: 'Chicken Tikka', price: 300, category: 'starters' },
      { id: 3, name: 'Tandoori Chicken', price: 350, category: 'starters' },
      { id: 4, name: 'Samosa', price: 100, category: 'starters' },
      { id: 5, name: 'Aloo Tikki', price: 120, category: 'starters' },
      { id: 6, name: 'Hara Bhara Kebab', price: 220, category: 'starters' }
    ],
    beverages: [
      { id: 7, name: 'Masala Chai', price: 50, category: 'beverages' },
      { id: 8, name: 'Lemon Soda', price: 80, category: 'beverages' },
      { id: 9, name: 'Mango Lassi', price: 120, category: 'beverages' },
      { id: 10, name: 'Cold Coffee', price: 150, category: 'beverages' },
      { id: 11, name: 'Fresh Lime Water', price: 60, category: 'beverages' },
      { id: 12, name: 'Iced Tea', price: 100, category: 'beverages' }
    ],
    main: [
      { id: 13, name: 'Butter Chicken', price: 350, category: 'main' },
      { id: 14, name: 'Palak Paneer', price: 300, category: 'main' },
      { id: 15, name: 'Hyderabadi Biryani', price: 320, category: 'main' },
      { id: 16, name: 'Dal Makhani', price: 250, category: 'main' },
      { id: 17, name: 'Chole Bhature', price: 220, category: 'main' },
      { id: 18, name: 'Rajma Chawal', price: 200, category: 'main' }
    ],
    soups: [
      { id: 19, name: 'Tomato Soup', price: 120, category: 'soups' },
      { id: 20, name: 'Sweet Corn Soup', price: 140, category: 'soups' },
      { id: 21, name: 'Hot and Sour Soup', price: 150, category: 'soups' },
      { id: 22, name: 'Manchow Soup', price: 160, category: 'soups' },
      { id: 23, name: 'Mushroom Soup', price: 170, category: 'soups' },
      { id: 24, name: 'Chicken Clear Soup', price: 180, category: 'soups' }
    ],
    desserts: [
      { id: 25, name: 'Gulab Jamun', price: 100, category: 'desserts' },
      { id: 26, name: 'Rasgulla', price: 120, category: 'desserts' },
      { id: 27, name: 'Ice Cream', price: 150, category: 'desserts' },
      { id: 28, name: 'Kheer', price: 130, category: 'desserts' }
    ],
    pizzas: [
      { id: 29, name: 'Margherita Pizza', price: 250, category: 'pizzas' },
      { id: 30, name: 'Pepperoni Pizza', price: 350, category: 'pizzas' },
      { id: 31, name: 'Veggie Supreme Pizza', price: 300, category: 'pizzas' }
    ],
    alcoholic: [
      { id: 32, name: 'Beer', price: 200, category: 'alcoholic' },
      { id: 33, name: 'Whiskey', price: 350, category: 'alcoholic' },
      { id: 34, name: 'Wine', price: 400, category: 'alcoholic' },
      { id: 35, name: 'Vodka', price: 300, category: 'alcoholic' },
      { id: 36, name: 'Rum', price: 250, category: 'alcoholic' },
      { id: 37, name: 'Cocktail', price: 450, category: 'alcoholic' }
    ],
    salads: [
      { id: 38, name: 'Green Salad', price: 150, category: 'salads' },
      { id: 39, name: 'Caesar Salad', price: 200, category: 'salads' },
      { id: 40, name: 'Fruit Salad', price: 180, category: 'salads' },
      { id: 41, name: 'Pasta Salad', price: 220, category: 'salads' },
      { id: 42, name: 'Russian Salad', price: 190, category: 'salads' }
    ]
  };

  const tables: Table[] = [
    { id: 1, number: 1, seats: 4, status: 'booked', customer: 'AM' },
    { id: 2, number: 2, seats: 6, status: 'available', customer: 'MB' },
    { id: 3, number: 3, seats: 2, status: 'booked', customer: 'JS' },
    { id: 4, number: 4, seats: 4, status: 'available', customer: 'HR' },
    { id: 5, number: 5, seats: 3, status: 'booked', customer: 'PL' },
    { id: 6, number: 6, seats: 4, status: 'available', customer: 'RT' },
    { id: 7, number: 7, seats: 5, status: 'booked', customer: 'LC' },
    { id: 8, number: 8, seats: 5, status: 'available', customer: 'DP' },
    { id: 9, number: 9, seats: 6, status: 'booked', customer: 'NK' },
    { id: 10, number: 10, seats: 6, status: 'available', customer: 'SB' },
    { id: 11, number: 11, seats: 4, status: 'booked', customer: 'GT' },
    { id: 12, number: 12, seats: 6, status: 'available', customer: 'JS' },
    { id: 13, number: 13, seats: 2, status: 'booked', customer: 'EK' },
    { id: 14, number: 14, seats: 6, status: 'available', customer: 'QN' },
    { id: 15, number: 15, seats: 3, status: 'booked', customer: 'TW' }
  ];

  const popularDishes: PopularDish[] = [
    { id: 1, name: 'Butter Chicken', orders: 250, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 2, name: 'Palak Paneer', orders: 190, image: 'https://images.unsplash.com/photo-1596797038530-2c107aa4e0dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 3, name: 'Hyderabadi Biryani', orders: 300, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 4, name: 'Masala Dosa', orders: 220, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 5, name: 'Chole Bhature', orders: 270, image: 'https://images.unsplash.com/photo-1626132647523-66c5fe50a9df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 6, name: 'Rajma Chawal', orders: 180, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 7, name: 'Paneer Tikka', orders: 210, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }
  ];

  const recentOrders: RecentOrder[] = [
    { id: 1, customer: 'Amrit Raj', items: 8, table: 3, status: 'Ready to serve' },
    { id: 2, customer: 'Amrit Raj', items: 8, table: 3, status: 'Ready to serve' },
    { id: 3, customer: 'Amrit Raj', items: 8, table: 3, status: 'Ready to serve' },
    { id: 4, customer: 'Amrit Raj', items: 8, table: 3, status: 'Ready to serve' },
    { id: 5, customer: 'Amrit Raj', items: 8, table: 3, status: 'Ready to serve' }
  ];

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    // Show cart after adding item
    if (!showCart) {
      setShowCart(true);
    }
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    if (page === 'menu') {
      setShowCart(false);
    }
  };

  const openCreateOrderModal = () => {
    setShowCreateOrderModal(true);
  };

  const closeCreateOrderModal = () => {
    setShowCreateOrderModal(false);
  };

  const handleCreateOrder = () => {
    closeCreateOrderModal();
    navigateTo('tables');
  };

  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId);
    navigateTo('menu');
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category.name);
    }
  };

  const getMenuItemsForSelectedCategory = () => {
    const categoryId = categories.find(cat => cat.name === selectedCategory)?.id || 'starters';
    return menuItemsByCategory[categoryId] || [];
  };

  const handlePlaceOrder = () => {
    // Create a new order
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000), // Generate random 4-digit order ID
      customer: customerName || 'Guest',
      table: selectedTable || 1,
      items: cartItems.reduce((total, item) => total + item.quantity, 0),
      total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      status: 'Ready',
      date: new Date().toLocaleDateString(),
      products: [...cartItems]
    };
    
    // Add to orders
    setOrders([...orders, newOrder]);
    
    // Clear cart
    setCartItems([]);
    
    // Navigate to orders page
    navigateTo('orders');
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      {/* Header */}
      <Header currentPage={currentPage} toggleCart={toggleCart} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {currentPage === 'home' && (
          <HomePage 
            popularDishes={popularDishes} 
            recentOrders={recentOrders} 
          />
        )}
        
        {currentPage === 'menu' && (
          <MenuPage 
            navigateTo={navigateTo}
            showCart={showCart}
            toggleCart={toggleCart}
            categories={categories}
            menuItems={getMenuItemsForSelectedCategory()}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleQuantityChange={handleQuantityChange}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            selectedTable={selectedTable}
            customerName={customerName}
          />
        )}
        
        {currentPage === 'tables' && (
          <TablesPage 
            tables={tables}
            onTableSelect={handleTableSelect}
            navigateTo={navigateTo}
          />
        )}
        
        {currentPage === 'orders' && (
          <OrdersPage 
            navigateTo={navigateTo}
          />
        )}
      </div>

      {/* Create Order Modal */}
      {showCreateOrderModal && (
        <CreateOrderModal 
          onClose={closeCreateOrderModal}
          onCreateOrder={handleCreateOrder}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          guestCount={guestCount}
          setGuestCount={setGuestCount}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        openCreateOrderModal={openCreateOrderModal}
      />
    </div>
  );
}

export default App;