
import React from 'react';

const ProductCard = ({ product }) => {

  const getPriceDisplay = () => {
    if (product.pricingOption === 'FREE') {
      return 'FREE';
    } else if (product.pricingOption === 'VIEW_ONLY') {
      return 'View Only';
    } else {
      return `$${(product.price || 0).toFixed(2)}`;
    }
  };

  const getPriceColor = () => {
    if (product.pricingOption === 'FREE') {
      return 'text-green-400';
    } else if (product.pricingOption === 'VIEW_ONLY') {
      return 'text-yellow-400';
    } else {
      return 'text-white';
    }
  };

  return (
    <div className="bg-gray-800 rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-[3/4] bg-gray-700 relative overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300x400/4B5563/FFFFFF?text=No+Image'}
          alt={product.name || 'Product'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400/4B5563/FFFFFF?text=No+Image';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-2">
        <h3 className="text-white text-xs mb-1 line-clamp-1 leading-tight">
          {product.name || 'Unknown Product'}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">
            {product.category || 'General'}
          </span>
          <span className={`font-bold text-xs ${getPriceColor()}`}>
            {getPriceDisplay()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
