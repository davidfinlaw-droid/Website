import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types/menu';

interface CartContextType {
  cart: CartItem[];
  addToCart: (menuItem: MenuItem, customizations: Record<string, string[]>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const calculateItemPrice = (menuItem: MenuItem, customizations: Record<string, string[]>): number => {
    let total = menuItem.price;
    
    // Add prices from customizations
    if (menuItem.customizations) {
      menuItem.customizations.forEach(customization => {
        const selectedIds = customizations[customization.id] || [];
        selectedIds.forEach(selectedId => {
          const option = customization.options.find(opt => opt.id === selectedId);
          if (option) {
            total += option.price;
          }
        });
      });
    }
    
    return total;
  };

  const addToCart = (menuItem: MenuItem, customizations: Record<string, string[]>) => {
    const itemPrice = calculateItemPrice(menuItem, customizations);
    
    // Check if exact same item with same customizations exists
    const customizationKey = JSON.stringify(customizations);
    const existingItemIndex = cart.findIndex(
      item => item.menuItem.id === menuItem.id && JSON.stringify(item.customizations) === customizationKey
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Add new item
      const newCartItem: CartItem = {
        id: `${menuItem.id}-${Date.now()}`,
        menuItem,
        quantity: 1,
        customizations,
        totalPrice: itemPrice,
      };
      setCart([...cart, newCartItem]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === cartItemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
