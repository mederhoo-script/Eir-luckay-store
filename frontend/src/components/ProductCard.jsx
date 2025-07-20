import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Star, Package } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card-product group animate-in hover:scale-[1.02] transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="w-full h-56 sm:h-64 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Overlay for product info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="badge-fresh flex items-center gap-1">
              <Star size={12} className="fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inStock 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Category */}
        <p className="text-sm text-brand-green dark:text-brand-green font-medium mb-2">{product.category}</p>
        
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-brand-brown dark:text-brand-brown line-clamp-2 mb-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{product.description}</p>
        
        {/* Unit Info */}
        <div className="flex items-center gap-2 mb-4">
          <Package size={16} className="text-brand-green dark:text-brand-green" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Per {product.unit}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-brand-green">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">per {product.unit}</span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
              product.inStock
                ? 'btn-primary hover:scale-105 active:scale-95'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
