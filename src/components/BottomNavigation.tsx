
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Home, ShoppingCart, User } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="w-full h-24 px-7 py-6 bg-zinc-300 fixed bottom-0 left-0 right-0">
      <div className="flex justify-around items-center">
        <Link to="/home" className="flex flex-col items-center">
          <div className={`w-5 h-5 mb-1 ${isActive('/home') ? 'border-red-700' : 'border-black/25'}`}>
          <Home size={20} stroke={isActive("/home") ? "#B91C1C" : "#000000"} strokeWidth={1.38} />
          </div>
          <span className={`text-xs ${isActive('/home') ? 'text-red-700' : 'text-black/60'}`}>Home</span>
        </Link>

        <Link to="/cart" className="flex flex-col items-center">
          <div className="w-5 h-5 mb-1 relative">
          <ShoppingCart size={20} stroke={isActive("/cart") ? "#B91C1C" : "#000000"} strokeWidth={1.38} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className={`text-xs ${isActive('/cart') ? 'text-red-700' : 'text-neutral-400'}`}>Cart</span>
        </Link>
        
        <Link to="/account" className="flex flex-col items-center">
          <div className="w-5 h-5 mb-1">
          <User size={20} stroke={isActive("/account") ? "#B91C1C" : "#000000"} strokeWidth={1.38} />
          </div>
          <span className={`text-xs ${isActive('/account') ? 'text-red-700' : 'text-neutral-400'}`}>Account</span>
        </Link>
      </div>
    </div>
  );
};
