import React, { useContext } from 'react';
import { ShoppingBag, Leaf, Store } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="gradient-fresh shadow-brand-lg sticky top-0 z-50 backdrop-blur-sm">
      <nav className="container-custom flex justify-between items-center py-4 lg:py-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-brand-sm">
            <Store className="w-6 h-6 text-brand-green" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-white">
              EIR Foodstuff
            </h1>
            <p className="text-brand-green-light text-sm font-medium hidden sm:block">
              Fresh • Quality • Affordable
            </p>
          </div>
        </div>

        {/* Navigation and Cart */}
        <div className="flex items-center space-x-4">
          {/* Quality Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
            <Leaf className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">100% Fresh</span>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={24} className="text-white" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full bg-brand-orange text-white text-xs font-bold shadow-lg animate-bounce-subtle">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
