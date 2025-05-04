
import React from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus } from 'lucide-react';

// Create a simple storage mechanism for orders
// In a real app, this would be stored in a database
const saveOrder = (orderItems: any[], total: number) => {
  const existingOrders = localStorage.getItem('orders') 
    ? JSON.parse(localStorage.getItem('orders')!) 
    : [];
  
  const newOrder = {
    id: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString(),
    total: total + 5, // Adding $5 shipping
    status: 'pending',
    items: orderItems.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }))
  };
  
  existingOrders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(existingOrders));
};

const Cart = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    // Save order to localStorage before clearing cart
    saveOrder(items, getCartTotal());
    
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed!",
    });
    
    clearCart();
    navigate('/orders');
  };

  return (
    <MobileLayout title="My Cart" showBackButton gradient>
      <div className="bg-zinc-100 min-h-screen pt-6 pb-32">
        {items.length > 0 ? (
          <div className="flex flex-col gap-4 px-6">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-16 w-16 flex items-center justify-center mr-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-black text-base font-light font-lexend">
                      {item.product.name}
                    </h3>
                    <p className="text-black text-sm font-normal font-montserrat">
                      ${item.product.price}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="bg-zinc-200 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="mx-2 text-black font-montserrat">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="bg-zinc-200 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-6 bg-white rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-black font-lexend">Subtotal:</span>
                <span className="text-black font-montserrat">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-black font-lexend">Shipping:</span>
                <span className="text-black font-montserrat">$5.00</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-black font-lexend font-medium">Total:</span>
                <span className="text-black font-montserrat font-medium">${(getCartTotal() + 5).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button 
                onClick={handleCheckout}
                className="bg-violet-400 hover:bg-violet-500 text-black font-lexend py-5 rounded-[20px]"
              >
                CHECKOUT
              </Button>
              
              <Button 
                onClick={() => clearCart()}
                variant="outline" 
                className="border-red-400 text-red-500 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-black/60 text-xl font-light font-lexend mb-6">Your cart is empty</p>
            <Button 
              onClick={() => navigate('/home')}
              className="bg-violet-400 hover:bg-violet-500 text-black"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Cart;
