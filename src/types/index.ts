export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PopularDish {
  id: number;
  name: string;
  orders: number;
  image: string;
}

export interface RecentOrder {
  id: number;
  customer: string;
  items: number;
  table: number;
  status: string;
}

export interface Table {
  id: number;
  number: number;
  seats: number;
  status: 'available' | 'booked';
  customer: string;
}