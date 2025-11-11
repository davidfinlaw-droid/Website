# Order Management Guide for Midnight Munchies

## Current Implementation (Demo Mode)

The current website stores orders in **localStorage** for demonstration purposes. This allows you to test the ordering system without a backend.

### How to View Orders as Business Owner

1. **Open Browser Console:**
   - Right-click anywhere on the website
   - Select "Inspect" or "Inspect Element"
   - Click on the "Console" tab

2. **View All Orders:**
   ```javascript
   JSON.parse(localStorage.getItem('midnightMunchiesOrders') || '[]')
   ```

3. **Clear All Orders (for testing):**
   ```javascript
   localStorage.removeItem('midnightMunchiesOrders')
   ```

### Order Data Structure

Each order contains:
- **Order ID**: Unique identifier (e.g., `ORDER-1699564123456`)
- **Items**: Array of cart items with customizations
- **Customer Info**: Name, phone, address, email
- **Pricing**: Subtotal, delivery fee, express delivery, total
- **Payment Method**: Selected payment type
- **Status**: Current order status
- **Timestamps**: Creation and update times

---

## Production Implementation (Recommended: Supabase)

For a **real production system**, you need a backend database. Here's the recommended approach using **Supabase**:

### Why Supabase?

- **Real-time updates**: Orders appear instantly in admin dashboard
- **Secure**: Customer data is protected
- **Authentication**: Only authorized users can view/manage orders
- **Scalable**: Handles many orders simultaneously
- **Free tier**: Good for starting out

### Setup Steps:

#### 1. Create Supabase Account
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Save your project URL and API key

#### 2. Database Schema

Create these tables in Supabase:

**Orders Table:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_email TEXT,
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) NOT NULL,
  express_delivery BOOLEAN DEFAULT FALSE,
  total DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Order Items Table:**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id TEXT NOT NULL,
  menu_item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  customizations JSONB,
  total_price DECIMAL(10, 2) NOT NULL
);
```

#### 3. Implement in Code

Replace the localStorage code in `CheckoutDialog.tsx` with Supabase calls:

```typescript
// Install Supabase client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

// When placing order
const handlePlaceOrder = async () => {
  // Insert order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: `ORDER-${Date.now()}`,
      customer_name: customerInfo.name,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      customer_email: customerInfo.email,
      subtotal,
      delivery_fee,
      express_delivery: expressDelivery,
      total,
      payment_method: paymentMethod,
      status: 'pending'
    })
    .select()
    .single()

  // Insert order items
  const items = cart.map(item => ({
    order_id: orderData.id,
    menu_item_id: item.menuItem.id,
    menu_item_name: item.menuItem.name,
    quantity: item.quantity,
    unit_price: item.totalPrice,
    customizations: item.customizations,
    total_price: item.totalPrice * item.quantity
  }))

  await supabase.from('order_items').insert(items)
}
```

#### 4. Admin Dashboard

Create a separate admin page to manage orders:

**Features:**
- Real-time order notifications
- Order status updates (pending → confirmed → preparing → on-the-way → delivered)
- Customer contact information
- Order details and customizations
- Revenue tracking
- Order history

**Example Admin Query:**
```typescript
// Get all pending orders
const { data: orders } = await supabase
  .from('orders')
  .select(`
    *,
    order_items (*)
  `)
  .eq('status', 'pending')
  .order('created_at', { ascending: false })

// Update order status
await supabase
  .from('orders')
  .update({ status: 'preparing', updated_at: new Date() })
  .eq('id', orderId)
```

#### 5. Customer Notifications

**Options for notifying customers:**

1. **SMS (Twilio)**
   - Send order confirmations
   - Update on order status
   - Delivery notifications

2. **Email (SendGrid/Resend)**
   - Order receipts
   - Status updates
   - Promotions

3. **Web Notifications**
   - Real-time updates on order page
   - Browser push notifications

---

## Order Status Workflow

1. **Pending** → Customer places order
2. **Confirmed** → Business accepts order
3. **Preparing** → Food is being made
4. **On the Way** → Driver has picked up order
5. **Delivered** → Order completed
6. **Cancelled** → Order was cancelled

---

## Quick Start for Production

1. **Connect Supabase** (recommended)
2. **Set up database tables** (use SQL above)
3. **Update CheckoutDialog.tsx** to use Supabase
4. **Create admin dashboard** at `/admin` route
5. **Add authentication** for admin access
6. **Implement notifications** (SMS/Email)
7. **Test thoroughly** before going live

---

## Need Help?

The current demo stores orders in localStorage. To see orders:
1. Open browser console (F12)
2. Run: `JSON.parse(localStorage.getItem('midnightMunchiesOrders') || '[]')`
3. You'll see all orders with full details

For production setup with Supabase, consider hiring a developer or following Supabase's documentation at [supabase.com/docs](https://supabase.com/docs).
