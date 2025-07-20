import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Dark mode state management
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply dark mode class and persist to localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-cream transition-colors duration-200">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-background dark:bg-card border border-border rounded-full shadow-brand-md hover:shadow-brand-lg transition-all duration-200 group"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-foreground group-hover:text-brand-orange transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-foreground group-hover:text-brand-green transition-colors" />
        )}
      </button>
      
      <main className="container-custom py-8 lg:py-12">
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="bg-brand-brown dark:bg-brand-brown text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EIR Foodstuff Store</h3>
              <p className="text-gray-300 dark:text-gray-400">
                Your trusted partner for fresh, quality Nigerian foodstuff. 
                We deliver freshness to your doorstep.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300 dark:text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Delivery Info</li>
                <li>Bulk Orders</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300 dark:text-gray-400">
                <p>📱 WhatsApp: +234 812 345 6789</p>
                <p>📧 Email: info@eirfoodstuff.com</p>
                <p>📍 Lagos, Nigeria</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2024 EIR Foodstuff Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
