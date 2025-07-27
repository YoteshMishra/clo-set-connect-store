import React, { useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, hasMore, onLoadMore }) => {
  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    // Check if IntersectionObserver is available (for test environment)
    if (typeof IntersectionObserver !== 'undefined') {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    }
  }, [loading, hasMore, onLoadMore]);

  if (products.length === 0 && !loading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-gray-400 text-lg mb-2">No products found</div>
        <div className="text-gray-500 text-sm">Try adjusting your filters or search terms</div>
      </div>
    );
  }

  return (
    <>
      <div className="product-grid">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductElementRef} key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product.id} product={product} />;
          }
        })}
      </div>
      
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
