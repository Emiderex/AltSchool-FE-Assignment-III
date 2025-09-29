import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Menu } from 'lucide-react';

// =========================================================
// 1. CORRECT IMAGE IMPORTS FROM SRC FOLDER
// =========================================================
import RedBenchImage from './assets/2.jpg';
import EggBalloon1Image from './assets/5.jpg';
import EggBalloon2Image from './assets/6.jpg';
import ManImage from './assets/7.png';
import ArchitectureImage from './assets/3.jpg';
import SamuraiKingImage from './assets/samuraiking.jpg'; 

// Sample product data - using imported image variables
const products = [
  { id: 'red-bench', title: 'Red Bench', price: 3.89, category: 'People', image: RedBenchImage },
  { id: 'egg-balloon-1', title: 'Egg Balloon', price: 93.89, category: 'Food', image: EggBalloon1Image },
  { id: 'egg-balloon-2', title: 'Egg Balloon', price: 93.89, category: 'Food', image: EggBalloon2Image },
  { id: 'man', title: 'Man', price: 100.00, category: 'People', image: ManImage },
  { id: 'architecture-1', title: 'Architecture', price: 101.00, category: 'Landmarks', image: ArchitectureImage },
  { id: 'architecture-2', title: 'Architecture', price: 101.00, category: 'Landmarks', image: ArchitectureImage },
  { id: 'samurai-king', title: 'Samurai King Resting', price: 100.00, category: 'Premium', image: SamuraiKingImage }
];

// =========================================================
// 2. Component Definitions (No major changes needed here)
// =========================================================

const Header = ({ cartCount, onCartToggle }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
      <div className="font-bold text-lg tracking-wider">BEJAMAS_</div>
      <div className="relative cursor-pointer p-2" onClick={onCartToggle}>
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  </header>
);

const FeaturedProduct = ({ onAddToCart }) => (
  <div className="bg-white rounded-lg overflow-hidden relative mb-8 pb-5 border-b-2 border-gray-200">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-semibold">Samurai King Resting</h2>
      <button
        onClick={() => onAddToCart('samurai-king', 'Samurai King Resting', 100.00, 'Premium')}
        className="bg-gray-800 text-white px-6 py-3 font-semibold text-sm hover:bg-gray-600"
      >
        ADD TO CART
      </button>
    </div>

    <div className="relative overflow-hidden mb-5">
      {/* 2.1. Feature Image path updated */}
      <img
        src={SamuraiKingImage} 
        alt="Samurai King"
        className="w-full h-full max-h-96 object-cover"
      />
      <div className="absolute -bottom-2 bg-white py-5 px-12">
        <h2 className="font-bold text-lg">Photo of the day</h2>
      </div>
    </div>
    
    {/* ... rest of FeaturedProduct component ... */}
    <div className="px-0">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">About the Samurai King Resting</h1>
          <h3 className="text-gray-500 py-1">Pets</h3>
        </div>
        <div>
          <h2 className="text-lg font-semibold">People also buy</h2>
        </div>
      </div>

      <div className="flex justify-between gap-10 items-start">
        <p className="text-gray-500 text-sm leading-relaxed flex-1 max-w-xl">
          So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter
          likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts
          for a type specimen book. So how did the classical Latin become so incoherent? According to McClintock, a
          15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder
          text to mockup various fonts for a type specimen book.
        </p>

        <div className="flex flex-col gap-4 min-w-72 flex-shrink-0">
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <img
                key={i}
                src={`/api/placeholder/90/105`} // Kept placeholder for small images
                alt={`Image ${i}`}
                className="w-20 h-24 object-cover cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            <h3 className="text-gray-800 mb-1">Details</h3>
            <p>Size: 1024 x 1024 pixel</p>
            <p>Size: 15 mb</p>
          </div>
        </div>
      </div>
    </div>
    {/* ... end rest of FeaturedProduct component ... */}
  </div>
);

const FilterSidebar = ({ filters, onFilterChange, priceFilters, onPriceFilterChange }) => (
  <div className="py-5 w-56 min-w-56 flex-shrink-0">
    <div className="mb-6">
      <div className="font-semibold mb-4">Category</div>
      <div className="flex flex-col gap-2">
        {['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'].map(category => (
          <div key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={category.toLowerCase()}
              checked={filters.includes(category)}
              onChange={() => onFilterChange(category)}
              className="w-4 h-4"
            />
            <label htmlFor={category.toLowerCase()} className="text-sm cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t-2 border-gray-200 pt-5">
      <div className="font-semibold mb-4">Price range</div>
      <div className="flex flex-col gap-2">
        {[
          { id: 'lower-20', label: 'Lower than $20', range: [0, 20] },
          { id: '20-100', label: '$20 - $100', range: [20, 100] },
          { id: '100-200', label: '$100 - $200', range: [100, 200] },
          { id: 'more-200', label: 'More than $200', range: [200, Infinity] }
        ].map(price => (
          <div key={price.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`price-${price.id}`}
              checked={priceFilters.some(p => p[0] === price.range[0] && p[1] === price.range[1])}
              onChange={() => onPriceFilterChange(price.range)}
              className="w-4 h-4"
            />
            <label htmlFor={`price-${price.id}`} className="text-sm cursor-pointer">
              {price.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-lg overflow-hidden transition-transform hover:-translate-y-1 group">
    <div className="relative">
      {/* 2.2. Product Card Image path updated */}
      <img
        src={product.image} 
        alt={product.title}
        className="w-full h-44 object-cover"
        onError={(e) => {
          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 180'%3E%3Crect width='200' height='180' fill='%23ddd'/%3E%3Ctext x='100' y='90' text-anchor='middle' font-family='Arial' font-size='12' fill='%23666'%3E${product.title}%3C/text%3E%3C/svg%3E`;
        }}
      />
      <button
        onClick={() => onAddToCart(product.id, product.title, product.price, product.category)}
        className="absolute bottom-2 left-2 right-2 bg-black/80 text-white py-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
      >
        ADD TO CART
      </button>
    </div>
    <div className="p-4">
      <div className="text-xs text-gray-500 uppercase mb-1">{product.category}</div>
      <div className="font-semibold mb-2 text-sm">{product.title}</div>
      <div className="text-gray-500 font-medium">${product.price.toFixed(2)}</div>
    </div>
  </div>
);

const MobileFilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  priceFilters, 
  onPriceFilterChange,
  onClearAll 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-white rounded-t-2xl overflow-y-auto">
        <div className="p-5 pb-24">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold">Filter</h2>
            <button onClick={onClose} className="text-2xl p-1">
              <X size={24} />
            </button>
          </div>
          {/* ... rest of MobileFilterModal ... */}
          <div className="mb-6">
            <div className="font-semibold mb-4">Category</div>
            <div className="flex flex-col gap-2">
              {['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'].map(category => (
                <div key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`mobile-${category.toLowerCase()}`}
                    checked={filters.includes(category)}
                    onChange={() => onFilterChange(category)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`mobile-${category.toLowerCase()}`} className="text-sm cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-5">
            <div className="font-semibold mb-4">Price range</div>
            <div className="flex flex-col gap-2">
              {[
                { id: 'lower-20', label: 'Lower than $20', range: [0, 20] },
                { id: '20-100', label: '$20 - $100', range: [20, 100] },
                { id: '100-200', label: '$100 - $200', range: [100, 200] },
                { id: 'more-200', label: 'More than $200', range: [200, Infinity] }
              ].map(price => (
                <div key={price.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`mobile-price-${price.id}`}
                    checked={priceFilters.some(p => p[0] === price.range[0] && p[1] === price.range[1])}
                    onChange={() => onPriceFilterChange(price.range)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`mobile-price-${price.id}`} className="text-sm cursor-pointer">
                    {price.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-200 flex gap-4">
          <button
            onClick={onClearAll}
            className="flex-1 bg-white border-2 border-gray-800 py-3 font-semibold"
          >
            CLEAR
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 text-white py-3 font-semibold"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

const CartModal = ({ isOpen, onClose, cart, onClearCart }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white p-5 overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <div className="flex gap-2">
            <button
              onClick={onClearCart}
              className="bg-red-600 text-white px-3 py-1 text-xs font-semibold hover:bg-red-700"
            >
              CLEAR
            </button>
            <button onClick={onClose} className="text-xl p-1">
              <X size={24} />
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
                {/* 2.3. Cart Image path updated */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-15 h-15 object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold mb-1">{item.title}</div>
                  <div className="text-gray-500">${item.price.toFixed(2)} × {item.quantity}</div>
                </div>
              </div>
            ))}
            <div className="mt-5 font-bold">Total: ${total.toFixed(2)}</div>
          </>
        )}
      </div>
    </div>
  );
};

// =========================================================
// 3. Main Application Component
// =========================================================

export default function App() {
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [sortType, setSortType] = useState('price-asc');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const addToCart = (id, title, price, category) => {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Ensure image is sourced from the original products list
      const originalProduct = products.find(product => product.id === id);
      setCart([...cart, { 
        id, 
        title, 
        price, 
        category, 
        quantity: 1,
        image: originalProduct.image // Ensures the correct imported path is added to cart state
      }]);
    }
  };

  const handleFilterChange = (category) => {
    setFilters(prev => 
      prev.includes(category) 
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  const handlePriceFilterChange = (range) => {
    setPriceFilters(prev => {
      const exists = prev.some(p => p[0] === range[0] && p[1] === range[1]);
      if (exists) {
        return prev.filter(p => !(p[0] === range[0] && p[1] === range[1]));
      } else {
        return [...prev, range];
      }
    });
  };

  const clearAllFilters = () => {
    setFilters([]);
    setPriceFilters([]);
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    let filtered = [...products];

    // Apply category filters
    if (filters.length > 0) {
      filtered = filtered.filter(product => filters.includes(product.category));
    }

    // Apply price filters
    if (priceFilters.length > 0) {
      filtered = filtered.filter(product => 
        priceFilters.some(range => 
          product.price >= range[0] && product.price < range[1]
        )
      );
    }

    // Apply sorting
    switch (sortType) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Default sort by ID to maintain stable order if no other sort is applied
        filtered.sort((a, b) => a.id.localeCompare(b.id)); 
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, priceFilters, sortType]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const startIndex = (currentPage - 1) * productsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  // Helper for pagination buttons
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Show a max of 5 buttons (e.g., 1, 2, 3, 4, 5)

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        buttons.push(
            <button 
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-2 border ${i === currentPage ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-300'}`}
            >
                {i}
            </button>
        );
    }
    return buttons;
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} onCartToggle={() => setIsCartOpen(true)} />
      
      <div className="max-w-6xl mx-auto px-5 py-8">
        <FeaturedProduct onAddToCart={addToCart} />

        <div className="mt-8 pt-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-lg font-semibold">
                Photography <span className="text-gray-400">/ Premium Photos</span>
              </h2>
            </div>

            {/* Desktop Sort */}
            <div className="hidden sm:flex items-center gap-2 text-gray-400 text-sm">
              <span>Sort By</span>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="bg-white border-0 text-gray-800"
              >
                <option value="price-asc">Price (Asc)</option>
                <option value="price-desc">Price (Desc)</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="sm:hidden flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 text-sm"
            >
              <Menu size={16} />
              Filter
            </button>
          </div>

          <div className="flex gap-8 items-start">
            {/* Desktop Filters */}
            <div className="hidden sm:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                priceFilters={priceFilters}
                onPriceFilterChange={handlePriceFilterChange}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {pageProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-8">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-white border border-gray-300 px-3 py-2 disabled:opacity-50"
                  >
                    ‹
                  </button>
                  {renderPageButtons()}
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-white border border-gray-300 px-3 py-2 disabled:opacity-50"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        priceFilters={priceFilters}
        onPriceFilterChange={handlePriceFilterChange}
        onClearAll={clearAllFilters}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onClearCart={clearCart}
      />
    </div>
  );
}