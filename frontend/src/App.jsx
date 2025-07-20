import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-cream">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container-custom py-8 lg:py-12">
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="bg-brand-brown text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EIR Foodstuff Store</h3>
              <p className="text-gray-300">
                Your trusted partner for fresh, quality Nigerian foodstuff. 
                We deliver freshness to your doorstep.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Contact</li>
                <li>Delivery Info</li>
                <li>Bulk Orders</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>📱 WhatsApp: +234 812 345 6789</p>
                <p>📧 Email: info@eirfoodstuff.com</p>
                <p>📍 Lagos, Nigeria</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EIR Foodstuff Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
