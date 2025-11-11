import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { MenuItem } from '../types/menu';
import { useCart } from '../contexts/CartContext';
import { Plus, Minus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddToCartDialogProps {
  item: MenuItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddToCartDialog({ item, open, onOpenChange }: AddToCartDialogProps) {
  const { addToCart } = useCart();
  const [customizations, setCustomizations] = useState<Record<string, string[]>>({});
  const [quantity, setQuantity] = useState(1);

  const handleCustomizationChange = (customizationId: string, optionId: string, isRadio: boolean) => {
    if (isRadio) {
      setCustomizations(prev => ({
        ...prev,
        [customizationId]: [optionId]
      }));
    } else {
      setCustomizations(prev => {
        const current = prev[customizationId] || [];
        const exists = current.includes(optionId);
        return {
          ...prev,
          [customizationId]: exists 
            ? current.filter(id => id !== optionId)
            : [...current, optionId]
        };
      });
    }
  };

  const calculateTotal = () => {
    let total = item.price;
    
    if (item.customizations) {
      item.customizations.forEach(customization => {
        const selectedIds = customizations[customization.id] || [];
        selectedIds.forEach(selectedId => {
          const option = customization.options.find(opt => opt.id === selectedId);
          if (option) {
            total += option.price;
          }
        });
      });
    }
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    // Check if all required customizations are selected
    const missingRequired = item.customizations?.some(c => 
      c.required && (!customizations[c.id] || customizations[c.id].length === 0)
    );

    if (missingRequired) {
      alert('Please select all required options');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(item, customizations);
    }
    
    // Reset and close
    setCustomizations({});
    setQuantity(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">{item.name}</DialogTitle>
          <DialogDescription className="text-white/70">
            {item.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <ImageWithFallback 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Customizations */}
          {item.customizations && item.customizations.length > 0 && (
            <div className="space-y-6">
              {item.customizations.map(customization => (
                <div key={customization.id} className="space-y-3">
                  <Label className="text-white text-lg">
                    {customization.name}
                    {customization.required && <span className="text-red-400 ml-1">*</span>}
                  </Label>
                  
                  {customization.type === 'radio' ? (
                    <RadioGroup
                      value={customizations[customization.id]?.[0] || ''}
                      onValueChange={(value) => handleCustomizationChange(customization.id, value, true)}
                    >
                      {customization.options.map(option => (
                        <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-500/10 transition-colors">
                          <RadioGroupItem value={option.id} id={`${customization.id}-${option.id}`} />
                          <Label 
                            htmlFor={`${customization.id}-${option.id}`}
                            className="flex-1 cursor-pointer text-white/90"
                          >
                            {option.name}
                            {option.price > 0 && <span className="text-cyan-400 ml-2">+${option.price.toFixed(2)}</span>}
                            {option.price < 0 && <span className="text-green-400 ml-2">${option.price.toFixed(2)}</span>}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-2">
                      {customization.options.map(option => (
                        <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-500/10 transition-colors">
                          <Checkbox
                            id={`${customization.id}-${option.id}`}
                            checked={(customizations[customization.id] || []).includes(option.id)}
                            onCheckedChange={() => handleCustomizationChange(customization.id, option.id, false)}
                          />
                          <Label 
                            htmlFor={`${customization.id}-${option.id}`}
                            className="flex-1 cursor-pointer text-white/90"
                          >
                            {option.name}
                            {option.price > 0 && <span className="text-cyan-400 ml-2">+${option.price.toFixed(2)}</span>}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg">
            <Label className="text-white">Quantity</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-purple-500/50 text-white hover:bg-purple-500/20"
              >
                <Minus className="size-4" />
              </Button>
              <span className="text-white text-xl w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="border-purple-500/50 text-white hover:bg-purple-500/20"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white text-lg py-6"
          >
            Add to Cart - ${calculateTotal().toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
