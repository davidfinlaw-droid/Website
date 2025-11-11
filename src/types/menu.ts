export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burger' | 'pizza' | 'wings' | 'ice' | 'shake' | 'soda';
  isPopular?: boolean;
  isSpicy?: boolean;
  customizations?: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'select';
  options: CustomizationItem[];
  required?: boolean;
}

export interface CustomizationItem {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations: Record<string, string[]>;
  totalPrice: number;
  id: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  expressDelivery: boolean;
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
