import { MenuItem } from '../types/menu';
import mamitasImage from 'figma:asset/3ec7daeb593fc596625988e2dfc491d160f398f4.png';
import daysSodaImage from 'figma:asset/89fb0056387280c4164a127c17c1a15ac774c9ad.png';

export const menuItems: MenuItem[] = [
  {
    id: 'burger-1',
    name: "Midnight Burger",
    description: "Double patty with bacon, cheese, and our secret midnight sauce",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1633821773816-0d50391e7b1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllcyUyMG5pZ2h0fGVufDF8fHx8MTc2MjgwMDM4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'burger',
    isPopular: true,
    customizations: [
      {
        id: 'burger-patty',
        name: 'Patty Options',
        type: 'radio',
        required: true,
        options: [
          { id: 'regular', name: 'Regular (2 patties)', price: 0 },
          { id: 'single', name: 'Single patty', price: -3 },
          { id: 'triple', name: 'Triple patty', price: 3 },
        ]
      },
      {
        id: 'burger-toppings',
        name: 'Toppings',
        type: 'checkbox',
        options: [
          { id: 'lettuce', name: 'Lettuce', price: 0 },
          { id: 'tomato', name: 'Tomato', price: 0 },
          { id: 'onion', name: 'Onion', price: 0 },
          { id: 'pickles', name: 'Pickles', price: 0 },
          { id: 'extra-cheese', name: 'Extra Cheese', price: 1.5 },
          { id: 'extra-bacon', name: 'Extra Bacon', price: 2 },
          { id: 'avocado', name: 'Avocado', price: 2 },
          { id: 'fried-egg', name: 'Fried Egg', price: 1.5 },
        ]
      },
      {
        id: 'burger-sauce',
        name: 'Sauce',
        type: 'checkbox',
        options: [
          { id: 'midnight-sauce', name: 'Midnight Sauce', price: 0 },
          { id: 'mayo', name: 'Mayo', price: 0 },
          { id: 'ketchup', name: 'Ketchup', price: 0 },
          { id: 'mustard', name: 'Mustard', price: 0 },
          { id: 'bbq', name: 'BBQ Sauce', price: 0.5 },
          { id: 'ranch', name: 'Ranch', price: 0.5 },
        ]
      }
    ]
  },
  {
    id: 'pizza-1',
    name: "Loaded Pizza",
    description: "Fresh dough with premium toppings and extra cheese",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1678443316613-dbc3261c8b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGJveCUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc2MjgwMDM4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'pizza',
    isPopular: true,
    customizations: [
      {
        id: 'pizza-size',
        name: 'Size',
        type: 'radio',
        required: true,
        options: [
          { id: 'medium', name: 'Medium (12")', price: 0 },
          { id: 'large', name: 'Large (14")', price: 4 },
          { id: 'xlarge', name: 'Extra Large (16")', price: 7 },
        ]
      },
      {
        id: 'pizza-toppings',
        name: 'Toppings',
        type: 'checkbox',
        options: [
          { id: 'pepperoni', name: 'Pepperoni', price: 0 },
          { id: 'sausage', name: 'Italian Sausage', price: 1.5 },
          { id: 'mushrooms', name: 'Mushrooms', price: 1 },
          { id: 'onions', name: 'Onions', price: 1 },
          { id: 'peppers', name: 'Bell Peppers', price: 1 },
          { id: 'olives', name: 'Black Olives', price: 1 },
          { id: 'bacon', name: 'Bacon', price: 2 },
          { id: 'chicken', name: 'Grilled Chicken', price: 2.5 },
          { id: 'pineapple', name: 'Pineapple', price: 1 },
          { id: 'extra-cheese', name: 'Extra Cheese', price: 2 },
        ]
      },
      {
        id: 'pizza-crust',
        name: 'Crust',
        type: 'radio',
        options: [
          { id: 'regular', name: 'Regular', price: 0 },
          { id: 'thin', name: 'Thin Crust', price: 0 },
          { id: 'thick', name: 'Thick Crust', price: 1 },
          { id: 'stuffed', name: 'Stuffed Crust', price: 3 },
        ]
      }
    ]
  },
  {
    id: 'wings-1',
    name: "Hot Wings",
    description: "Crispy wings tossed in your choice of sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1712746783860-94fabfbac42c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBwbGF0ZXxlbnwxfHx8fDE3NjI3MDAzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'wings',
    isSpicy: true,
    isPopular: true,
    customizations: [
      {
        id: 'wings-quantity',
        name: 'Quantity',
        type: 'radio',
        required: true,
        options: [
          { id: '6pc', name: '6 Pieces', price: 0 },
          { id: '12pc', name: '12 Pieces', price: 8 },
          { id: '18pc', name: '18 Pieces', price: 15 },
          { id: '24pc', name: '24 Pieces', price: 20 },
        ]
      },
      {
        id: 'wings-sauce',
        name: 'Sauce',
        type: 'radio',
        required: true,
        options: [
          { id: 'buffalo', name: 'Buffalo (Medium)', price: 0 },
          { id: 'mild', name: 'Mild', price: 0 },
          { id: 'hot', name: 'Hot', price: 0 },
          { id: 'bbq', name: 'BBQ', price: 0 },
          { id: 'honey-bbq', name: 'Honey BBQ', price: 0 },
          { id: 'garlic-parm', name: 'Garlic Parmesan', price: 0 },
          { id: 'teriyaki', name: 'Teriyaki', price: 0 },
          { id: 'lemon-pepper', name: 'Lemon Pepper', price: 0 },
        ]
      },
      {
        id: 'wings-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'ranch', name: 'Ranch Dipping Sauce', price: 0.75 },
          { id: 'blue-cheese', name: 'Blue Cheese Dipping Sauce', price: 0.75 },
          { id: 'celery', name: 'Celery Sticks', price: 0.5 },
          { id: 'fries', name: 'Side of Fries', price: 3.5 },
        ]
      }
    ]
  },
  {
    id: 'ice-1',
    name: "MAMITA'S Coconut Cream Ice",
    description: "Sweet, creamy, and slightly nutty ice made with pasteurized milk, coconut cream, cane sugar, and skim milk",
    price: 10.00,
    image: mamitasImage,
    category: 'ice',
    isPopular: true,
    customizations: [
      {
        id: 'ice-size',
        name: 'Size',
        type: 'radio',
        required: true,
        options: [
          { id: 'regular', name: 'Regular', price: 0 },
          { id: 'large', name: 'Large', price: 3 },
        ]
      },
      {
        id: 'ice-toppings',
        name: 'Toppings',
        type: 'checkbox',
        options: [
          { id: 'coconut-flakes', name: 'Coconut Flakes', price: 1 },
          { id: 'whipped-cream', name: 'Whipped Cream', price: 0.75 },
          { id: 'chocolate-drizzle', name: 'Chocolate Drizzle', price: 0.5 },
          { id: 'caramel-drizzle', name: 'Caramel Drizzle', price: 0.5 },
          { id: 'sprinkles', name: 'Sprinkles', price: 0.5 },
        ]
      }
    ]
  },
  {
    id: 'shake-1',
    name: "Monster Shake",
    description: "Thick milkshake topped with cookies, candy, and whipped cream",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1571245836612-09ae71811d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjczNjgzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'shake',
    customizations: [
      {
        id: 'shake-flavor',
        name: 'Flavor',
        type: 'radio',
        required: true,
        options: [
          { id: 'chocolate', name: 'Chocolate', price: 0 },
          { id: 'vanilla', name: 'Vanilla', price: 0 },
          { id: 'strawberry', name: 'Strawberry', price: 0 },
          { id: 'oreo', name: 'Oreo', price: 1 },
          { id: 'peanut-butter', name: 'Peanut Butter', price: 1 },
          { id: 'cookies-cream', name: 'Cookies & Cream', price: 1 },
        ]
      },
      {
        id: 'shake-toppings',
        name: 'Toppings',
        type: 'checkbox',
        options: [
          { id: 'whipped-cream', name: 'Whipped Cream', price: 0 },
          { id: 'oreos', name: 'Oreo Cookies', price: 1 },
          { id: 'candy', name: 'Candy Pieces', price: 1.5 },
          { id: 'brownie', name: 'Brownie Chunks', price: 2 },
          { id: 'sprinkles', name: 'Sprinkles', price: 0.5 },
          { id: 'cherry', name: 'Cherry on Top', price: 0.5 },
        ]
      },
      {
        id: 'shake-size',
        name: 'Size',
        type: 'radio',
        options: [
          { id: 'regular', name: 'Regular (16oz)', price: 0 },
          { id: 'large', name: 'Large (24oz)', price: 2 },
        ]
      }
    ]
  },
  {
    id: 'soda-1',
    name: "Day's Full Flavored Blue Pop Soda",
    description: "Deliciously refreshing 2-liter blue pop soda. Order at your convenience via Midnight Munchies",
    price: 3.00,
    image: daysSodaImage,
    category: 'soda',
    customizations: []
  },
];
