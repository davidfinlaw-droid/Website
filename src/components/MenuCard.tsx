import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MenuItem } from '../types/menu';
import { AddToCartDialog } from './AddToCartDialog';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card className="group bg-gradient-to-br from-purple-950/40 to-black/60 border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20">
        <div className="relative overflow-hidden aspect-[4/3]">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isPopular && (
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 shadow-lg">
                🔥 Popular
              </Badge>
            )}
            {item.isSpicy && (
              <Badge variant="destructive" className="shadow-lg">
                <Flame className="size-3 mr-1" />
                Spicy
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white group-hover:text-purple-300 transition-colors">
              {item.name}
            </h3>
            <span className="text-cyan-400 ml-2 shrink-0">
              ${item.price.toFixed(2)}
            </span>
          </div>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          <Button 
            onClick={() => setDialogOpen(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white shadow-lg shadow-purple-500/20"
            size="sm"
          >
            <Plus className="size-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      <AddToCartDialog
        item={item}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
