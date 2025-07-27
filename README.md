# CLO-SET CONNECT Store

A modern e-commerce store page built with React.js, featuring advanced product filtering, real-time search, and responsive design.

![CLO-SET CONNECT Store Preview](./preview.png)

## 🚀 Live Demo

[View Live Application](https://clo-set-connect-store.vercel.app) <!-- Update with your actual deployment URL -->

## 📱 Preview

The application features a clean, modern interface with:
- Dark theme design
- Responsive grid layout
- Real-time product filtering
- Advanced search functionality

## ✨ Features

### Core Functionality
- **Smart Filtering System** - Filter products by pricing options (Paid, Free, View Only)
- **Real-time Search** - Instant product search with keyword matching
- **Responsive Grid** - Adaptive layout that works on all devices
- **Infinite Scroll** - Seamless loading of more products as you scroll
- **Price Range Filter** - Dynamic price slider for paid items
- **State Persistence** - Filters and search persist across page reloads

### User Experience
- **Clean Interface** - Modern dark theme with intuitive navigation
- **Fast Performance** - Optimized with React best practices
- **Mobile First** - Designed for mobile devices, enhanced for desktop
- **Accessibility** - Proper ARIA labels and keyboard navigation

### Technical Features
- **API Integration** - Connects to live product data API
- **Error Handling** - Graceful fallbacks when API is unavailable
- **Redux State Management** - Centralized state for complex interactions
- **Component Architecture** - Modular, reusable React components

## 🛠️ Built With

- **React 19** - Latest React with modern hooks and features
- **Redux Toolkit** - Efficient state management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool
- **Axios** - Promise-based HTTP client
- **Vitest** - Fast unit testing framework

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YoteshMishra/clo-set-connect-store.git

# Navigate to project directory
cd clo-set-connect-store

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5174 in your browser
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run test suite
npm run lint     # Check code quality
```

## API Integration

The application is configured to fetch data from the provided API endpoint:
`https://closet-recruit-api.azurewebsites.net/api/data`

If the API is unavailable, the application falls back to mock data for development and testing purposes.

## Design Implementation

The application closely follows the provided design mockup with:
- Dark theme (gray-900 background)
- Responsive layout
- Proper spacing and typography
- Interactive elements with hover states
- Loading states and error handling

## Browser Compatibility

- Modern browsers supporting ES6+
- Responsive design for mobile and desktop
- Optimized for performance with lazy loading

## Deployment

### Production Build
```bash
npm run build
```

### Deploy to Vercel
1. Push to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Or connect GitHub repository for automatic deployment

## Live Demo

🚀 **Live Application**: [Add your deployment URL here]

## Project Structure

```
clo-set-store/
├── src/
│   ├── components/          # React components
│   ├── store/              # Redux store and slices
│   ├── tests/              # Test files
│   └── App.jsx             # Main application component
├── public/                 # Static assets
├── dist/                   # Production build
└── README.md              # Project documentation
```
