import React, { useContext } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-gray-800">E-Shop</h1>
        <button
          onClick={onCartClick}
          className="relative p-2 rounded-full hover:bg-gray-100"
        >
          <ShoppingBag size={24} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
