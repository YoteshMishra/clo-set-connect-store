import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchTerm: '',
    pricingOptions: [], // ['PAID', 'FREE', 'VIEW_ONLY']
    sortBy: 'relevance', // 'relevance', 'priceHigh', 'priceLow'
    priceRange: [0, 999],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPricingOptions: (state, action) => {
      state.pricingOptions = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.pricingOptions = [];
      state.sortBy = 'relevance';
      state.priceRange = [0, 999];
    },
  },
});

export const {
  setSearchTerm,
  setPricingOptions,
  setSortBy,
  setPriceRange,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
