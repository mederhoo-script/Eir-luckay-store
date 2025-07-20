import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { X, Plus, Minus, Trash2, MapPin, Phone, ShoppingBag, AlertCircle } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryNote: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = total >= 200000 ? 0 : 5000; // Free delivery for orders above ₦200,000
  const grandTotal = total + deliveryFee;

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    const requiredFields = ['name', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !customerInfo[field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    // WhatsApp phone number for EIR Foodstuff Store (update with actual number)
    const phoneNumber = "+2348123456789"; 

    let message = "🛒 *NEW ORDER - EIR FOODSTUFF STORE* 🛒\n\n";
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Address: ${customerInfo.address}\n`;
    if (customerInfo.deliveryNote) {
      message += `Note: ${customerInfo.deliveryNote}\n`;
    }
    message += "\n📦 *Order Items:*\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantity: ${item.quantity} ${item.unit}(s)\n`;
      message += `   Price: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ${formatPrice(total)}\n`;
    message += `Delivery: ${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}\n`;
    message += `*TOTAL: ${formatPrice(grandTotal)}*\n\n`;
    
    message += "✅ Please confirm this order and let me know the estimated delivery time.\n\n";
    message += "Thank you for choosing EIR Foodstuff Store! 🙏";

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-card shadow-2xl transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="gradient-fresh p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Your Cart</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-brand-green-light mt-2">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
            </p>
          </div>

          {/* Cart Content */}
          <div className="flex-grow overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 dark:text-gray-400">Add some delicious foodstuff to get started!</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="card-elevated p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-brand-brown dark:text-brand-brown line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                          <p className="text-brand-green dark:text-brand-green font-bold">{formatPrice(item.price)}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                className="w-8 h-8 rounded-full border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                className="w-8 h-8 rounded-full border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-brand-green">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="card-elevated p-4 space-y-3">
                  <h3 className="font-semibold text-brand-brown dark:text-brand-brown">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                        {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    {deliveryFee === 0 && (
                      <p className="text-xs text-green-600">🎉 Free delivery on orders above ₦200,000!</p>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-brand-green">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="card-elevated p-4 space-y-4">
                  <h3 className="font-semibold text-brand-brown dark:text-brand-brown flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Information
                  </h3>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-field"
                      required
                    />
                    
                    <textarea
                      placeholder="Delivery Address *"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="input-field resize-none"
                      rows={3}
                      required
                    />
                    
                    <textarea
                      placeholder="Special delivery instructions (optional)"
                      value={customerInfo.deliveryNote}
                      onChange={(e) => handleInputChange('deliveryNote', e.target.value)}
                      className="input-field resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-start gap-3 mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium">WhatsApp Checkout</p>
                  <p>Your order will be sent via WhatsApp for confirmation and payment details.</p>
                </div>
              </div>
              
              <button 
                onClick={handleWhatsAppOrder}
                className="whatsapp-btn w-full justify-center text-lg"
              >
                <Phone className="w-5 h-5" />
                Order via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
