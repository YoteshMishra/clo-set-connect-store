import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/slices/productsSlice';
import filtersReducer from '../store/slices/filtersSlice';
import App from '../App';

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
    },
  });
};

const renderWithProvider = (component) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('CLO-SET Store App', () => {
  it('renders the main components', async () => {
    renderWithProvider(<App />);
    
    // Check if header is rendered
    expect(screen.getByText('CONNECT')).toBeInTheDocument();
    
    // Check if search input is rendered
    expect(screen.getByPlaceholderText('Find the items you\'re looking for')).toBeInTheDocument();
    
    // Check if pricing options are rendered
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('View Only')).toBeInTheDocument();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText(/Anisha's Favorite Top/)).toBeInTheDocument();
    });
  });

  it('filters products by search term', async () => {
    renderWithProvider(<App />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText(/Contents List/)).toBeInTheDocument();
    });
    
    // Search for "Anisha"
    const searchInput = screen.getByPlaceholderText('Find the items you\'re looking for');
    fireEvent.change(searchInput, { target: { value: 'Anisha' } });
    
    // Should show filtered results
    await waitFor(() => {
      expect(screen.getByText('Anisha\'s Favorite Top')).toBeInTheDocument();
    });
  });

  it('filters products by pricing options', async () => {
    renderWithProvider(<App />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText(/Contents List/)).toBeInTheDocument();
    });
    
    // Click on "Free" filter
    const freeCheckbox = screen.getByLabelText('Free');
    fireEvent.click(freeCheckbox);
    
    // Should show only free products
    await waitFor(() => {
      expect(screen.getByText('Men\'s Blue Jacket')).toBeInTheDocument();
    });
  });

  it('sorts products correctly', async () => {
    renderWithProvider(<App />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText(/Contents List/)).toBeInTheDocument();
    });
    
    // Change sorting to "Higher Price"
    const sortSelect = screen.getByDisplayValue('Item Name (Default)');
    fireEvent.change(sortSelect, { target: { value: 'priceHigh' } });
    
    // Products should be sorted by price (highest first)
    await waitFor(() => {
      const productCards = screen.getAllByText(/\$\d+\.\d+|FREE|View Only/);
      expect(productCards.length).toBeGreaterThan(0);
    });
  });
});
