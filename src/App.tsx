import { useState } from 'react';
import { Header } from './components/Header';
import { MenuCard } from './components/MenuCard';
import { FullMenuDialog } from './components/FullMenuDialog';
import { CheckoutDialog } from './components/CheckoutDialog';
import { AdminOrderViewer } from './components/AdminOrderViewer';
import { PrivacyPolicyDialog } from './components/PrivacyPolicyDialog';
import { TermsOfServiceDialog } from './components/TermsOfServiceDialog';
import { CareersDialog } from './components/CareersDialog';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Clock, MapPin, Phone, Mail, Star, Truck, Moon, Zap, Instagram, Facebook, Twitter } from 'lucide-react';
import { CartProvider } from './contexts/CartContext';
import { menuItems } from './data/menuData';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);

  const featuredItems = menuItems.slice(0, 6);

  const features = [
    {
      icon: <Moon className="size-10 text-purple-400" />,
      title: "Open Late",
      description: "Serving hungry night owls from 8PM to 4AM every day"
    },
    {
      icon: <Truck className="size-10 text-cyan-400" />,
      title: "Fast Delivery",
      description: "Hot food delivered to your door in 30 minutes or less"
    },
    {
      icon: <Zap className="size-10 text-pink-400" />,
      title: "Fresh & Fast",
      description: "Every order made fresh when you order, never sitting around"
    },
    {
      icon: <Star className="size-10 text-yellow-400" />,
      title: "Top Rated",
      description: "4.8 stars from over 2,000 happy late-night customers"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0426]">
      <Header onOrderNowClick={() => setCheckoutOpen(true)} />
      <Toaster position="top-right" />

      {/* Hero Section with Neon Sign */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-[#0f0426] to-[#0f0426]" />
        
        {/* Animated stars background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }

          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;700&display=swap');

          .neon-hero {
            --neon-main: #b52bff;
            --neon-accent: #30d8ff;
            --neon-pink: #ff59c6;
            --tube-stroke: rgba(255,255,255,0.06);
            --glow-strong: 36px;
            --glow-soft: 8px;
            --extrusion-color: rgba(40,10,60,0.55);
            --size: clamp(2.5rem, 8vw + 1rem, 7rem);
          }

          .neon-text {
            font-family: "Fredoka One", "Poppins", system-ui;
            font-size: var(--size);
            line-height: 0.95;
            letter-spacing: 0.02em;
            display: inline-block;
            transform-style: preserve-3d;
            transform: rotateX(6deg) translateZ(0);
            color: var(--neon-main);
            position: relative;
            padding: 0.25em 0.5em;
            -webkit-text-stroke: 1.6px var(--tube-stroke);
            text-shadow:
              0 0 calc(var(--glow-soft)) rgba(255,255,255,0.03),
              0 0 calc(var(--glow-strong)) var(--neon-main);
          }

          .neon-text::before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            transform: translateZ(-40px) scale(1);
            z-index: -2;
            color: transparent;
            -webkit-text-stroke: 0px transparent;
            text-shadow:
              4px 4px 0px var(--extrusion-color),
              6px 6px 10px rgba(0,0,0,0.6);
            filter: blur(0.6px);
            opacity: 0.95;
          }

          .neon-text::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            color: var(--neon-pink);
            mix-blend-mode: screen;
            transform: translateY(2px) scale(1);
            opacity: 0.35;
            -webkit-text-stroke: 0px transparent;
            text-shadow: 0 0 12px rgba(255,89,198,0.35);
            clip-path: inset(6% 0 0 0);
          }

          .neon-accent {
            color: var(--neon-accent);
            display: inline-block;
            -webkit-text-stroke: 1.2px var(--tube-stroke);
            text-shadow:
              0 0 calc(var(--glow-soft)) rgba(255,255,255,0.02),
              0 0 calc(var(--glow-strong)) var(--neon-accent);
          }

          .moon-icon {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>

        <div className="relative z-10 text-center px-4 py-20">
          {/* Neon Sign */}
          <div className="mb-8">
            <div className="neon-hero perspective-[1400px] mb-6">
              {/* Moon and stars decoration */}
              <div className="moon-icon mb-4 flex items-center justify-center gap-4">
                <div className="text-purple-400/40">✦</div>
                <div className="text-6xl">🌙</div>
                <div className="text-purple-400/40">✦</div>
              </div>
              
              <h1 className="neon-text" data-text="MIDNIGHT MUNCHIES">
                MIDNIGHT <span className="neon-accent">MUNCHIES</span>
              </h1>
            </div>
          </div>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Craving something delicious after dark? We've got you covered with the best late-night eats in town. 🍔✨
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white shadow-xl shadow-purple-500/30 text-lg px-8 py-6"
              onClick={() => setCheckoutOpen(true)}
            >
              <Moon className="mr-2 size-5" />
              Order Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 text-lg px-8 py-6"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Menu
            </Button>
          </div>

          {/* Open status badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40">
            <div className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-sm">Open Now • Delivering until 4AM</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Midnight Munchies</span>?
            </h2>
            <p className="text-white/60 text-lg">
              Late-night cravings deserve exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-purple-950/40 to-black/60 border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0">
              Menu
            </Badge>
            <h2 className="text-white text-4xl md:text-5xl mb-4">
              Late Night <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Favorites</span>
            </h2>
            <p className="text-white/60 text-lg">
              Freshly prepared comfort food delivered hot to your door
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              onClick={() => setFullMenuOpen(true)}
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section id="hours" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hours Card */}
            <Card className="bg-gradient-to-br from-purple-950/40 to-black/60 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="size-8 text-purple-400" />
                  <h3 className="text-white text-2xl">Opening Hours</h3>
                </div>
                <div className="space-y-4 text-white/80">
                  <div className="flex justify-between py-3 border-b border-purple-500/20">
                    <span>Monday - Thursday</span>
                    <span className="text-cyan-400">8PM - 4AM</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-purple-500/20">
                    <span>Friday - Saturday</span>
                    <span className="text-cyan-400">8PM - 5AM</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span>Sunday</span>
                    <span className="text-cyan-400">9PM - 3AM</span>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="text-white/70 text-sm">
                    <strong className="text-purple-400">Pro Tip:</strong> Order before 3:30AM on weekdays to ensure delivery before closing!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-gradient-to-br from-purple-950/40 to-black/60 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="size-8 text-cyan-400" />
                  <h3 className="text-white text-2xl">Get in Touch</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="size-5 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-white/60 text-sm">Location</p>
                      <p className="text-white">632 N 2nd St<br />Philadelphia, PA 19123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="size-5 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-white/60 text-sm">Phone</p>
                      <p className="text-white">(833) 207-3048</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="size-5 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white">davidfinlaw@hopeworks.org</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-purple-500/20">
                    <p className="text-white/60 text-sm mb-3">Follow us for daily specials!</p>
                    <div className="flex gap-3">
                      <button className="size-10 rounded-full bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center text-purple-400 transition-colors">
                        <Instagram className="size-5" />
                      </button>
                      <button className="size-10 rounded-full bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center text-purple-400 transition-colors">
                        <Facebook className="size-5" />
                      </button>
                      <button className="size-10 rounded-full bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center text-purple-400 transition-colors">
                        <Twitter className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 border-t border-purple-500/20 bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/80 mb-2">© 2025 Midnight Munchies. All rights reserved.</p>
              <p className="text-white/50 text-sm">Satisfying late-night cravings since 2020 🌙</p>
            </div>
            <div className="flex gap-6 text-white/60 text-sm">
              <button 
                onClick={() => setPrivacyPolicyOpen(true)}
                className="hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setTermsOfServiceOpen(true)}
                className="hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setCareersOpen(true)}
                className="hover:text-purple-400 transition-colors"
              >
                Careers
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Dialogs */}
      <FullMenuDialog open={fullMenuOpen} onOpenChange={setFullMenuOpen} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
      <PrivacyPolicyDialog open={privacyPolicyOpen} onOpenChange={setPrivacyPolicyOpen} />
      <TermsOfServiceDialog open={termsOfServiceOpen} onOpenChange={setTermsOfServiceOpen} />
      <CareersDialog open={careersOpen} onOpenChange={setCareersOpen} />
      
      {/* Admin Panel */}
      <AdminOrderViewer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
