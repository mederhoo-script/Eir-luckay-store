import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList />
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* Overlay for when cart is open */}
      {isCartOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-0" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
}

export default App;
