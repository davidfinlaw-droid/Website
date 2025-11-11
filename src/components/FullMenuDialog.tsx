import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MenuItem } from '../types/menu';
import { menuItems } from '../data/menuData';
import { AddToCartDialog } from './AddToCartDialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FullMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FullMenuDialog({ open, onOpenChange }: FullMenuDialogProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'burger', name: 'Burgers', icon: '🍔' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'wings', name: 'Wings', icon: '🍗' },
    { id: 'ice', name: 'Ice Cream', icon: '🍨' },
    { id: 'shake', name: 'Shakes', icon: '🥤' },
    { id: 'soda', name: 'Drinks', icon: '🥤' },
  ];

  const getItemsByCategory = (category: string) => {
    if (category === 'all') return menuItems;
    return menuItems.filter(item => item.category === category);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setCustomizeDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl text-white">Full Menu</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-purple-900/30 border-purple-500/30">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent 
                key={category.id} 
                value={category.id}
                className="max-h-[60vh] overflow-y-auto mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-2">
                  {getItemsByCategory(category.id).map(item => (
                    <div 
                      key={item.id}
                      className="group bg-gradient-to-br from-purple-900/40 to-black/60 border border-purple-500/30 hover:border-purple-400/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex gap-2">
                          {item.isPopular && (
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0">
                              🔥 Popular
                            </Badge>
                          )}
                          {item.isSpicy && (
                            <Badge variant="destructive">
                              <Flame className="size-3 mr-1" />
                              Spicy
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white group-hover:text-purple-300 transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-cyan-400 shrink-0 ml-2">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        
                        <p className="text-white/60 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(item);
                          }}
                        >
                          <Plus className="size-4 mr-2" />
                          Customize & Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedItem && (
        <AddToCartDialog
          item={selectedItem}
          open={customizeDialogOpen}
          onOpenChange={setCustomizeDialogOpen}
        />
      )}
    </>
  );
}
