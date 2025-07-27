import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductGrid from './components/ProductGrid';
import { fetchProducts, setFilteredProducts, incrementPage } from './store/slices/productsSlice';
import { setSearchTerm, setPricingOptions, setPriceRange, resetFilters } from './store/slices/filtersSlice';
import './mobile.css';

function App() {
  const dispatch = useDispatch();
  const { items: products, loading, hasMore, page } = useSelector(state => state.products);
  const { searchTerm, pricingOptions, priceRange } = useSelector(state => state.filters);

  // Load state from URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const pricingParam = urlParams.get('pricing');

    const priceMinParam = urlParams.get('priceMin');
    const priceMaxParam = urlParams.get('priceMax');

    if (searchParam) {
      dispatch(setSearchTerm(searchParam));
    }
    if (pricingParam) {
      dispatch(setPricingOptions(pricingParam.split(',')));
    }

    if (priceMinParam || priceMaxParam) {
      dispatch(setPriceRange([
        priceMinParam ? parseInt(priceMinParam) : 0,
        priceMaxParam ? parseInt(priceMaxParam) : 999
      ]));
    }
  }, [dispatch]);

  // Load initial products
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts({ page: 1, limit: 20 }));
    }
  }, [dispatch, products.length]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set('search', searchTerm);
    }
    if (pricingOptions.length > 0) {
      params.set('pricing', pricingOptions.join(','));
    }

    if (priceRange[0] > 0) {
      params.set('priceMin', priceRange[0].toString());
    }
    if (priceRange[1] < 999) {
      params.set('priceMax', priceRange[1].toString());
    }

    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [searchTerm, pricingOptions, priceRange]);

  // Handle search changes
  const handleSearchChange = useCallback((value) => {
    dispatch(setSearchTerm(value));
  }, [dispatch]);

  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    if (filters.pricingOptions) {
      dispatch(setPricingOptions(filters.pricingOptions));
    }
    if (filters.priceRange) {
      dispatch(setPriceRange(filters.priceRange));
    }
  }, [dispatch]);



  // Handle price range changes
  const handlePriceRangeChange = useCallback((range) => {
    dispatch(setPriceRange(range));
  }, [dispatch]);

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(incrementPage());
      dispatch(fetchProducts({ page: page + 1, limit: 20 }));
    }
  }, [dispatch, loading, hasMore, page]);

  // Process and filter products
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const name = product.name || '';
        const category = product.category || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               category.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Apply pricing filter
    if (pricingOptions.length > 0) {
      filtered = filtered.filter(product => {
        if (pricingOptions.includes('FREE') && product.pricingOption === 'FREE') return true;
        if (pricingOptions.includes('PAID') && product.pricingOption === 'PAID') return true;
        if (pricingOptions.includes('VIEW_ONLY') && product.pricingOption === 'VIEW_ONLY') return true;
        return false;
      });
    }

    // Apply price range filter (only for PAID items)
    if ((priceRange[0] > 0 || priceRange[1] < 999) && pricingOptions.includes('PAID')) {
      filtered = filtered.filter(product => {
        // Only apply price range to PAID items
        if (product.pricingOption === 'PAID') {
          return product.price >= priceRange[0] && product.price <= priceRange[1];
        }
        // Keep non-PAID items if they match other filters
        return true;
      });
    }

    // No sorting applied - keep original order (relevance)

    try {
      dispatch(setFilteredProducts(filtered));
    } catch (error) {
      console.error('Error setting filtered products:', error);
    }
    return filtered;
  }, [products, searchTerm, pricingOptions, priceRange, dispatch]);

  // Load more products when page changes
  useEffect(() => {
    if (page > 1) {
      dispatch(fetchProducts({ page, limit: 20 }));
    }
  }, [dispatch, page]);

  return (
    <div className="min-h-screen bg-gray-900 mobile-container" style={{ margin: '0 20px' }}>
      {/* Row 1: Header with App Name and Optional Feature Button */}
      <div className="bg-gray-900 px-4 py-3 mobile-header">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-xl font-bold">CONNECT</h1>
              <button className="bg-white text-black px-3 py-1 text-xs font-medium border border-gray-300">
                OPTIONAL FEATURE
              </button>
            </div>
          </div>
        </div>

      {/* Row 2: Search Input with Search Icon - Thick row */}
      <div className="mobile-search-container" style={{ backgroundColor: '#374151', paddingLeft: '24px', paddingRight: '24px', paddingTop: '2px', paddingBottom: '2px' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 max-w-lg">
                <input
                  type="text"
                  placeholder="Find the items you're looking for"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="block w-full pl-4 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none text-sm border-0 rounded-none mobile-search-input"
                  style={{
                    backgroundColor: '#374151',
                    border: 'none',
                    outline: 'none',
                    height: '48px',
                    lineHeight: '48px'
                  }}
                />
                <div className="ml-3 px-3 py-2 bg-blue-600 text-white cursor-pointer rounded mobile-search-icon">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Gap between rows */}
      <div className="mobile-gap-medium" style={{ height: '50px'}}></div>

      {/* Row 3: Pricing Options, Pricing Slider, and Reset Button - Very thick row */}
      <div className="mobile-pricing-container" style={{ backgroundColor: '#2d3748', height: '40px', display: 'flex', alignItems: 'center', paddingLeft: '24px', paddingRight: '24px' }}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mobile-pricing-layout">
              {/* Left: Pricing Options and Pricing Slider */}
              <div className="flex items-center space-x-8">
                {/* Pricing Options */}
                <div className="flex items-center space-x-4 mobile-pricing-options">
                  <span className="text-white text-sm">Pricing Options:</span>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={pricingOptions.includes('PAID')}
                      onChange={() => {
                        const newOptions = pricingOptions.includes('PAID')
                          ? pricingOptions.filter(p => p !== 'PAID')
                          : [...pricingOptions, 'PAID'];
                        handleFilterChange({ pricingOptions: newOptions });
                      }}
                      className="w-3 h-3 mr-2"
                      style={{ accentColor: '#3b82f6' }}
                    />
                    <span className="text-white text-sm">Paid</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={pricingOptions.includes('FREE')}
                      onChange={() => {
                        const newOptions = pricingOptions.includes('FREE')
                          ? pricingOptions.filter(p => p !== 'FREE')
                          : [...pricingOptions, 'FREE'];
                        handleFilterChange({ pricingOptions: newOptions });
                      }}
                      className="w-3 h-3 mr-2"
                      style={{ accentColor: '#3b82f6' }}
                    />
                    <span className="text-white text-sm">Free</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={pricingOptions.includes('VIEW_ONLY')}
                      onChange={() => {
                        const newOptions = pricingOptions.includes('VIEW_ONLY')
                          ? pricingOptions.filter(p => p !== 'VIEW_ONLY')
                          : [...pricingOptions, 'VIEW_ONLY'];
                        handleFilterChange({ pricingOptions: newOptions });
                      }}
                      className="w-3 h-3 mr-2"
                      style={{ accentColor: '#3b82f6' }}
                    />
                    <span className="text-white text-sm">View Only</span>
                  </label>
                </div>

                {/* Pricing Slider - Only show when PAID is selected */}
                {pricingOptions.includes('PAID') && (
                  <div className="flex items-center space-x-3 mobile-pricing-slider" style={{ marginLeft: '80px' }}>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">$0</span>
                      <input
                        type="range"
                        min="0"
                        max="999"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange([0, parseInt(e.target.value)])}
                        className="w-32"
                      />
                      <span className="text-gray-400 text-xs">${priceRange[1]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Reset Button */}
              <button
                onClick={handleResetFilters}
                className="hover:text-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-600 mobile-reset-button"
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#ffffff'
                }}
              >
                RESET
              </button>
            </div>
          </div>
        </div>

      {/* Gap between pricing row and product grid */}
      <div className="mobile-gap-medium" style={{ height: '40px'}}></div>

      {/* Product Grid */}
      <div className="p-4 mobile-product-grid">
          <div className="max-w-7xl mx-auto">
            <ProductGrid
              products={processedProducts}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
