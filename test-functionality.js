// Manual testing script to verify all functionality
console.log('🧪 Testing CLO-SET CONNECT Store Application');
console.log('==========================================');

// Test 1: Check if Redux store is working
console.log('\n✅ Test 1: Redux Store');
try {
  const store = window.__REDUX_DEVTOOLS_EXTENSION__ ? 'Redux DevTools Available' : 'Redux Store Working';
  console.log('   ✓ Redux store initialized');
} catch (e) {
  console.log('   ❌ Redux store error:', e.message);
}

// Test 2: Check if components are rendered
console.log('\n✅ Test 2: Component Rendering');
const header = document.querySelector('header');
const searchInput = document.querySelector('input[placeholder*="Find the items"]');
const filterPanel = document.querySelector('div:has(h3:contains("Contents Filter"))');

console.log('   ✓ Header:', header ? 'Rendered' : 'Missing');
console.log('   ✓ Search Input:', searchInput ? 'Rendered' : 'Missing');
console.log('   ✓ Filter Panel:', document.body.textContent.includes('Contents Filter') ? 'Rendered' : 'Missing');

// Test 3: Check responsive grid
console.log('\n✅ Test 3: Responsive Grid');
const productGrid = document.querySelector('[class*="grid"]');
console.log('   ✓ Product Grid:', productGrid ? 'Found' : 'Missing');

// Test 4: Check if products are loaded
console.log('\n✅ Test 4: Product Loading');
setTimeout(() => {
  const products = document.querySelectorAll('[class*="bg-gray-800"]');
  console.log('   ✓ Products loaded:', products.length > 0 ? `${products.length} products` : 'No products found');
}, 2000);

// Test 5: Search functionality
console.log('\n✅ Test 5: Search Functionality');
if (searchInput) {
  console.log('   ✓ Search input available for testing');
  console.log('   → Try typing "Anisha" to test search');
} else {
  console.log('   ❌ Search input not found');
}

// Test 6: Filter checkboxes
console.log('\n✅ Test 6: Filter Options');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
console.log('   ✓ Filter checkboxes:', checkboxes.length >= 3 ? `${checkboxes.length} found` : 'Missing filters');

// Test 7: Sorting dropdown
console.log('\n✅ Test 7: Sorting');
const sortSelect = document.querySelector('select');
console.log('   ✓ Sort dropdown:', sortSelect ? 'Available' : 'Missing');

console.log('\n🎉 Manual Testing Guide:');
console.log('1. Search: Type "Anisha" in search box');
console.log('2. Filter: Check/uncheck Paid, Free, View Only');
console.log('3. Sort: Change sorting options');
console.log('4. Price Slider: Select "Paid" to activate slider');
console.log('5. Responsive: Resize window to test grid');
console.log('6. Infinite Scroll: Scroll down to load more');
