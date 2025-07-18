import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [address, setAddress] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    // Replace with your actual phone number (including country code)
    const phoneNumber = "+2348123456789"; 

    let message = "📦 New Order from E-Shop:\n";
    cartItems.forEach(item => {
      message += `- ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n🏠 Delivery Address: ${address}\n`;
    message += `💰 *Total: $${total.toFixed(2)}*`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Cart Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-full"><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-full"><Plus size={14} /></button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
            <div className="p-4 border-t">
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <input 
                        type="text" 
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 123 Main Street, Lagos"
                        required
                    />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>
                <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors text-center"
                >
                    Order via WhatsApp
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
