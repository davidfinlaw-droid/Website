import { useState } from 'react';
import { Menu, X, ShoppingBag, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import logoImage from 'figma:asset/529153f8f07b50747b05e6191c3d14a4f6856d7c.png';

interface HeaderProps {
  onOrderNowClick: () => void;
}

export function Header({ onOrderNowClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0426]/95 backdrop-blur-md border-b border-purple-500/20">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group"
          >
            <img 
              src={logoImage} 
              alt="Midnight Munchies" 
              className="h-16 w-16 object-contain transition-transform group-hover:scale-110"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('hours')}
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              Hours
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              <Clock className="mr-2 size-4" />
              Open Now
            </Button>
            <Button 
              onClick={onOrderNowClick}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white shadow-lg shadow-purple-500/30 relative"
            >
              <ShoppingBag className="mr-2 size-4" />
              Order Now
              {getCartItemCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 size-6 flex items-center justify-center p-0">
                  {getCartItemCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/20">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="text-white/80 hover:text-purple-400 transition-colors text-left px-4 py-2"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/80 hover:text-purple-400 transition-colors text-left px-4 py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('hours')}
                className="text-white/80 hover:text-purple-400 transition-colors text-left px-4 py-2"
              >
                Hours
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/80 hover:text-purple-400 transition-colors text-left px-4 py-2"
              >
                Contact
              </button>
              <div className="flex flex-col gap-2 px-4 pt-2">
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 w-full"
                >
                  <Clock className="mr-2 size-4" />
                  Open Now
                </Button>
                <Button 
                  onClick={onOrderNowClick}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white shadow-lg shadow-purple-500/30 w-full relative"
                >
                  <ShoppingBag className="mr-2 size-4" />
                  Order Now
                  {getCartItemCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 size-6 flex items-center justify-center p-0">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
