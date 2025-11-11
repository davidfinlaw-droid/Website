import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useCart } from '../contexts/CartContext';
import { Plus, Minus, Trash2, ShoppingBag, CreditCard, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  const deliveryFee = 2.99;
  const expressDeliveryFee = 2.00;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee + (expressDelivery ? expressDeliveryFee : 0);

  const getCustomizationText = (cartItem: any) => {
    const customizations: string[] = [];
    
    if (cartItem.menuItem.customizations) {
      cartItem.menuItem.customizations.forEach((customization: any) => {
        const selectedIds = cartItem.customizations[customization.id] || [];
        selectedIds.forEach((selectedId: string) => {
          const option = customization.options.find((opt: any) => opt.id === selectedId);
          if (option) {
            customizations.push(option.name);
          }
        });
      });
    }
    
    return customizations.length > 0 ? customizations.join(', ') : 'No customizations';
  };

  const handlePlaceOrder = async () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Create order object
    const order = {
      id: `ORDER-${Date.now()}`,
      items: cart,
      subtotal,
      deliveryFee,
      expressDelivery,
      total,
      customerInfo,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Log order to console (in production, this would go to a database)
    console.log('NEW ORDER PLACED:', order);

    // Show success message
    toast.success('Order placed successfully! You will receive a confirmation shortly.', {
      description: `Order #${order.id}`,
    });

    // Clear cart and close dialog
    clearCart();
    setStep('cart');
    setCustomerInfo({ name: '', phone: '', address: '', email: '' });
    setPaymentMethod('');
    setExpressDelivery(false);
    onOpenChange(false);

    // Store order in localStorage for demo purposes (business owner can view)
    const existingOrders = JSON.parse(localStorage.getItem('midnightMunchiesOrders') || '[]');
    localStorage.setItem('midnightMunchiesOrders', JSON.stringify([...existingOrders, order]));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center gap-2">
            <ShoppingBag className="size-6" />
            {step === 'cart' ? 'Your Cart' : 'Checkout'}
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="size-16 mx-auto mb-4 text-purple-400/40" />
            <p className="text-white/60 text-lg mb-4">Your cart is empty</p>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
            >
              Browse Menu
            </Button>
          </div>
        ) : step === 'cart' ? (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((cartItem) => (
                <div 
                  key={cartItem.id}
                  className="flex gap-4 p-4 bg-purple-900/20 rounded-lg border border-purple-500/20"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white mb-1">{cartItem.menuItem.name}</h3>
                    <p className="text-white/50 text-sm mb-2 line-clamp-1">
                      {getCustomizationText(cartItem)}
                    </p>
                    <p className="text-cyan-400">${cartItem.totalPrice.toFixed(2)} each</p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(cartItem.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="size-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="size-8 border-purple-500/50 text-white hover:bg-purple-500/20"
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="text-white w-8 text-center">{cartItem.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="size-8 border-purple-500/50 text-white hover:bg-purple-500/20"
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Order Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              {/* Express Delivery Option */}
              <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="express-delivery"
                    checked={expressDelivery}
                    onCheckedChange={(checked) => setExpressDelivery(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="express-delivery" className="text-white cursor-pointer flex items-center gap-2">
                      <Zap className="size-4 text-cyan-400" />
                      Express Delivery (15-20 mins)
                    </Label>
                    <p className="text-white/50 text-xs">Get your order faster!</p>
                  </div>
                </div>
                <span className="text-cyan-400">+${expressDeliveryFee.toFixed(2)}</span>
              </div>

              <Separator className="bg-purple-500/20" />

              <div className="flex justify-between text-white text-xl">
                <span>Total</span>
                <span className="text-cyan-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={() => setStep('checkout')}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white text-lg py-6"
            >
              Proceed to Checkout
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-white text-lg">Delivery Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">Delivery Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-white text-lg flex items-center gap-2">
                <CreditCard className="size-5" />
                Payment Method
              </h3>
              
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="venmo">Venmo</SelectItem>
                  <SelectItem value="apple-pay">Apple Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Order Summary */}
            <div className="space-y-2 p-4 bg-purple-900/20 rounded-lg">
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              {expressDelivery && (
                <div className="flex justify-between text-cyan-400">
                  <span className="flex items-center gap-1">
                    <Zap className="size-3" /> Express Delivery
                  </span>
                  <span>+${expressDeliveryFee.toFixed(2)}</span>
                </div>
              )}
              <Separator className="bg-purple-500/20 my-2" />
              <div className="flex justify-between text-white text-xl">
                <span>Total</span>
                <span className="text-cyan-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('cart')}
                className="flex-1 border-purple-500/50 text-white hover:bg-purple-500/20"
              >
                Back to Cart
              </Button>
              <Button
                onClick={handlePlaceOrder}
                className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white text-lg py-6"
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
