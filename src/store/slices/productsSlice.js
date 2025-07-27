import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock data for development - will be replaced with API call
const mockProducts = [
  {
    id: 1,
    name: "Women's Gray Dress",
    category: "Women",
    price: 32.00,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Red Poncho",
    category: "Women",
    price: 14.00,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Men's Blue Jacket",
    category: "Men",
    price: 0,
    pricingOption: "FREE",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Black High Heels",
    category: "Shoes",
    price: 0,
    pricingOption: "VIEW_ONLY",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop"
  },
  {
    id: 5,
    name: "White Sneakers",
    category: "Shoes",
    price: 89.99,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Summer Dress",
    category: "Women",
    price: 45.50,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Anisha's Favorite Top",
    category: "Women",
    price: 25.99,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1564257577-2d3b9b2c1b8b?w=300&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Classic Jeans",
    category: "Men",
    price: 0,
    pricingOption: "FREE",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Designer Handbag",
    category: "Accessories",
    price: 150.00,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Casual T-Shirt",
    category: "Men",
    price: 0,
    pricingOption: "VIEW_ONLY",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Elegant Blouse",
    category: "Women",
    price: 38.75,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1564257577-2d3b9b2c1b8b?w=300&h=300&fit=crop"
  },
  {
    id: 12,
    name: "Sports Shoes",
    category: "Shoes",
    price: 0,
    pricingOption: "FREE",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
  },
  {
    id: 13,
    name: "Winter Coat",
    category: "Women",
    price: 120.00,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop"
  },
  {
    id: 14,
    name: "Casual Sneakers",
    category: "Shoes",
    price: 0,
    pricingOption: "VIEW_ONLY",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop"
  },
  {
    id: 15,
    name: "Business Shirt",
    category: "Men",
    price: 45.99,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop"
  },
  {
    id: 16,
    name: "Summer Hat",
    category: "Accessories",
    price: 0,
    pricingOption: "FREE",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=300&fit=crop"
  },
  {
    id: 17,
    name: "Leather Jacket",
    category: "Men",
    price: 199.99,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop"
  },
  {
    id: 18,
    name: "Floral Dress",
    category: "Women",
    price: 0,
    pricingOption: "FREE",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop"
  },
  {
    id: 19,
    name: "Stylish Boots",
    category: "Shoes",
    price: 75.00,
    pricingOption: "PAID",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop"
  },
  {
    id: 20,
    name: "Casual Cardigan",
    category: "Women",
    price: 0,
    pricingOption: "FREE",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop"
  }
];

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 20 } = {}) => {
    try {
      // Try to fetch from the provided API
      const response = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data');

      // Transform API data to match our expected structure
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(item => {
          // Map pricingOption numbers to strings
          let pricingOptionString;
          switch(item.pricingOption) {
            case 0: pricingOptionString = 'FREE'; break;
            case 1: pricingOptionString = 'PAID'; break;
            case 2: pricingOptionString = 'VIEW_ONLY'; break;
            default: pricingOptionString = item.price > 0 ? 'PAID' : 'FREE';
          }

          return {
            id: item.id || Math.random(),
            name: item.title || item.name || 'Unknown Product',
            category: item.creator || item.category || 'General',
            price: item.price || 0,
            pricingOption: pricingOptionString,
            image: item.imagePath || item.image || item.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'
          };
        });
      }

      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Return mock data with pagination simulation
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = mockProducts.slice(startIndex, endIndex);

      // Always return the mock data structure for consistency
      return paginatedData;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
    total: 0,
  },
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredItems = action.payload;
    },
    resetProducts: (state) => {
      state.items = [];
      state.filteredItems = [];
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          // Direct array response (our mock data)
          if (state.page === 1) {
            // First page - replace items
            state.items = action.payload;
          } else {
            // Subsequent pages - append items
            state.items = [...state.items, ...action.payload];
          }
          state.hasMore = action.payload.length === 20; // Assume more if we got full page
        } else {
          // Object response with pagination info (from real API)
          if (state.page === 1) {
            state.items = action.payload.products || action.payload;
          } else {
            state.items = [...state.items, ...(action.payload.products || action.payload)];
          }
          state.hasMore = action.payload.hasMore !== undefined ? action.payload.hasMore : true;
          state.total = action.payload.total || state.items.length;
        }

        state.filteredItems = state.items;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilteredProducts, resetProducts, incrementPage } = productsSlice.actions;
export default productsSlice.reducer;
