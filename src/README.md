# Midnight Munchies 🌙

A fully functional late-night food delivery website with a stunning 3D neon sign, complete ordering system, and admin dashboard.

![Midnight Munchies](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

---

## ✨ Features

### Customer-Facing
- 🎨 **Stunning 3D Neon Sign** - Eye-catching hero section with animated effects
- 🍔 **Full Menu** - 6 items across categories: Burgers, Pizza, Wings, Ice Cream, Shakes, Drinks
- 🛒 **Smart Shopping Cart** - Add items, customize, adjust quantities
- ⚙️ **Item Customization** - Extensive options for toppings, sizes, sauces, and more
- 💳 **Complete Checkout** - Customer info, payment options, delivery preferences
- ⚡ **Express Delivery** - Optional +$2 for faster delivery (15-20 mins)
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile

### Business Owner
- 📊 **Admin Dashboard** - View and manage all orders
- 🔄 **Order Status Management** - Update order progress in real-time
- 👥 **Customer Information** - Contact details and delivery addresses
- 📝 **Order Details** - Complete item lists with all customizations
- 💰 **Revenue Tracking** - Monitor total sales and order values
- 🎯 **Status Workflow** - Pending → Confirmed → Preparing → On the Way → Delivered

---

## 🚀 Quick Start

### For Business Owners

1. **View Orders:**
   - Click the "Admin Panel" button (bottom-left corner)
   - See all orders with full details
   - Update order status as you prepare/deliver

2. **Manage Orders:**
   - Click on status dropdown to update progress
   - View customer phone/address for contact/delivery
   - See all customizations clearly listed

3. **Read the Guides:**
   - `BUSINESS_OWNER_GUIDE.md` - Complete owner's manual
   - `ORDER_MANAGEMENT_GUIDE.md` - Production setup instructions

### For Customers

1. **Browse Menu** - Scroll to menu section or click "View Menu"
2. **Customize Items** - Click any item to see customization options
3. **Add to Cart** - Select options and add items
4. **Checkout** - Click "Order Now" button (top-right or cart icon)
5. **Enter Details** - Provide delivery info and payment method
6. **Place Order** - Review and confirm your order

---

## 📋 Menu Items

| Item | Price | Customizations |
|------|-------|----------------|
| **Midnight Burger** | $14.99 | Patty count, toppings, sauces |
| **Loaded Pizza** | $18.99 | Size, toppings, crust type |
| **Hot Wings** | $12.99 | Quantity, 8 sauce options, extras |
| **MAMITA'S Coconut Cream Ice** | $10.00 | Size, toppings |
| **Monster Shake** | $8.99 | 6 flavors, toppings, size |
| **Day's Blue Pop Soda** | $3.00 | 2-liter bottle |

**Additional Fees:**
- Regular Delivery: $2.99
- Express Delivery: +$2.00

---

## 🛠️ Technical Details

### Built With
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS 4.0** - Utility-first styling
- **Shadcn/ui** - Beautiful component library
- **Lucide React** - Icon system
- **Sonner** - Toast notifications

### Architecture
```
/components
  ├── Header.tsx              # Navigation with cart counter
  ├── MenuCard.tsx            # Individual menu item cards
  ├── NeonSign.tsx            # 3D neon sign effect
  ├── AddToCartDialog.tsx     # Item customization modal
  ├── FullMenuDialog.tsx      # Complete menu browser
  ├── CheckoutDialog.tsx      # Cart and checkout flow
  └── AdminOrderViewer.tsx    # Order management dashboard

/contexts
  └── CartContext.tsx         # Global cart state management

/data
  └── menuData.ts             # Menu items and customizations

/types
  └── menu.ts                 # TypeScript interfaces

/App.tsx                      # Main application component
```

### Key Features Implementation

**Cart System:**
- Context API for global state
- Automatic quantity aggregation for identical items
- Dynamic price calculation with customizations
- Persistent cart during session

**Customization Engine:**
- Radio buttons for single-choice (size, sauce)
- Checkboxes for multi-choice (toppings, extras)
- Real-time price updates
- Validation for required options

**Admin Panel:**
- localStorage for demo mode
- Real-time order updates
- Status management system
- Order filtering and sorting

---

## 💾 Current Storage (Demo Mode)

Orders are stored in **browser localStorage**:
- Perfect for testing and demonstrations
- No server required
- Data persists across page reloads
- Each browser stores its own orders

**View orders in console:**
```javascript
JSON.parse(localStorage.getItem('midnightMunchiesOrders') || '[]')
```

**Clear all orders:**
```javascript
localStorage.removeItem('midnightMunchiesOrders')
```

---

## 🚀 Production Deployment

### Option 1: Keep Demo Mode
Perfect for:
- Testing and development
- Portfolio demonstrations
- Internal training
- Proof of concept

### Option 2: Production with Supabase (Recommended)

**Setup Steps:**
1. Create Supabase account (free tier available)
2. Set up database tables (SQL provided in ORDER_MANAGEMENT_GUIDE.md)
3. Configure environment variables
4. Update CheckoutDialog.tsx to use Supabase API
5. Deploy to Vercel/Netlify/Your hosting

**Benefits:**
- Real-time order synchronization
- Multi-device access
- Secure customer data
- Order history and analytics
- Scalable infrastructure
- Email/SMS integration ready

**Full production setup guide available in `ORDER_MANAGEMENT_GUIDE.md`**

---

## 📱 Mobile Support

The entire website is fully responsive:
- ✅ Mobile navigation menu
- ✅ Touch-optimized interactions
- ✅ Responsive grid layouts
- ✅ Mobile-friendly modals
- ✅ Optimized images
- ✅ Readable text sizes

---

## 🎨 Customization

### Update Menu
Edit `/data/menuData.ts`:
```typescript
{
  id: 'new-item-1',
  name: "New Menu Item",
  description: "Delicious description",
  price: 12.99,
  image: "image-url",
  category: 'burger',
  customizations: [...]
}
```

### Change Colors
The site uses a purple/cyan neon theme. Update in component files:
- Primary: `#b52bff` (purple)
- Accent: `#30d8ff` (cyan)
- Background: `#0f0426` (dark purple)

### Update Contact Info
Already set to:
- **Address:** 632 N 2nd St, Philadelphia, PA 19123
- **Phone:** (833) 207-3048
- **Email:** davidfinlaw@hopeworks.org

### Modify Hours
Edit hours section in `/App.tsx`

---

## 📊 Order Status Workflow

```
┌─────────┐
│ PENDING │ ← Customer places order
└────┬────┘
     │
     ▼
┌───────────┐
│ CONFIRMED │ ← Business accepts
└────┬──────┘
     │
     ▼
┌───────────┐
│ PREPARING │ ← Kitchen starts cooking
└────┬──────┘
     │
     ▼
┌─────────────┐
│ ON THE WAY  │ ← Driver picks up
└──────┬──────┘
       │
       ▼
  ┌───────────┐
  │ DELIVERED │ ← Order completed
  └───────────┘
```

---

## 🆘 Support

### Documentation
- **BUSINESS_OWNER_GUIDE.md** - Complete guide for managing orders
- **ORDER_MANAGEMENT_GUIDE.md** - Production setup instructions
- **This README** - Technical overview

### Common Issues

**Orders not appearing:**
- Check Admin Panel (bottom-left button)
- Click "Refresh" in admin panel
- Verify correct browser/device

**Can't add items to cart:**
- Ensure required customizations are selected
- Check browser console for errors

**Production deployment:**
- See ORDER_MANAGEMENT_GUIDE.md for Supabase setup
- Configure environment variables
- Set up payment processing separately

---

## 🎯 Future Enhancements

Potential additions:
- [ ] User accounts and order history
- [ ] Real-time order tracking map
- [ ] SMS/Email notifications
- [ ] Loyalty rewards program
- [ ] Driver assignment system
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-location support
- [ ] Schedule orders in advance

---

## 📄 License

This project is created for Midnight Munchies business use.

---

## 🙏 Credits

**Built with:**
- React & TypeScript
- Tailwind CSS
- Shadcn/ui components
- Unsplash images
- Google Fonts (Fredoka One, Poppins)

---

## 📞 Contact

**Midnight Munchies**
- 632 N 2nd St, Philadelphia, PA 19123
- (833) 207-3048
- davidfinlaw@hopeworks.org

**Business Hours:**
- Mon-Thu: 8PM - 4AM
- Fri-Sat: 8PM - 5AM
- Sunday: 9PM - 3AM

---

**Made with ❤️ for late-night cravings 🌙🍔**
