import { useState, useMemo } from 'react';
import { Heart, ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClothingStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Dresses', 'Tops', 'Coats', 'Sweaters', 'Shirts'];
  const colors = ['Black', 'White', 'Brown', 'Beige', 'Gray', 'Pink'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const products = [
    {
      id: 1,
      name: 'Trendy Brown Coat',
      price: 75.00,
      originalPrice: 150.00,
      discount: 50,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop',
      category: 'Coats',
      color: 'Brown'
    },
    {
      id: 2,
      name: 'Classy Light Coat',
      price: 165.00,
      originalPrice: 220.00,
      discount: 25,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop',
      category: 'Coats',
      color: 'Beige'
    },
    {
      id: 3,
      name: 'Modern Brown Dress',
      price: 90.00,
      originalPrice: 120.00,
      discount: 25,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      category: 'Dresses',
      color: 'Brown'
    },
    {
      id: 4,
      name: 'Modern Black Dress',
      price: 75.00,
      originalPrice: 140.00,
      discount: 46,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1566479179817-c1ba1b0b98b6?w=300&h=400&fit=crop',
      category: 'Dresses',
      color: 'Black'
    },
    {
      id: 5,
      name: 'Light Brown Sweater',
      price: 63.00,
      originalPrice: 90.00,
      discount: 30,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      category: 'Sweaters',
      color: 'Brown'
    },
    {
      id: 6,
      name: 'Classic White Shirt',
      price: 45.00,
      originalPrice: 60.00,
      discount: 25,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
      category: 'Shirts',
      color: 'White'
    },
    {
      id: 7,
      name: 'Dark Yellow Shirt',
      price: 75.00,
      originalPrice: 100.00,
      discount: 25,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=400&fit=crop',
      category: 'Shirts',
      color: 'Brown'
    },
    {
      id: 8,
      name: 'Classic White Shirt',
      price: 70.00,
      originalPrice: 95.00,
      discount: 26,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=300&h=400&fit=crop',
      category: 'Shirts',
      color: 'White'
    },
    {
      id: 9,
      name: 'Modern White Suit',
      price: 90.00,
      originalPrice: 130.00,
      discount: 31,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      category: 'Tops',
      color: 'White'
    }
  ];


  // Memoize filtered and sorted products for optimization
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (selectedColor && product.color !== selectedColor) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });
    // Sorting
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [products, selectedCategory, selectedColor, priceRange, sortBy]);

  // Use INR symbol
  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
      <div className="relative overflow-hidden rounded-t-3xl">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {product.discount}% off
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
        </div>
        <h3 className="font-bold text-gray-800 mb-3 text-lg">{product.name}</h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-800">{formatINR(product.price)}</span>
          <span className="text-gray-400 line-through text-lg">{formatINR(product.originalPrice)}</span>
        </div>
        <button className="w-full bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] text-white py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4a5f2]/10 to-[#8810a3]/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] bg-clip-text text-transparent">
                ✨ FITSCAPE
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                {/* <Link/> */}
                <a href="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
                
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
              <button className="bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] text-white p-2 rounded-full hover:shadow-lg transition-all">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-8">
          <span>Home</span>
          <span>/</span>
          <span className="text-purple-600 font-medium">Shop</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop</h2>
          <p className="text-gray-600 text-lg">Discover our amazing collection of trendy clothing</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-8">
            {/* Filter Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-800 text-lg">Filter Options</h3>
              </div>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-2xl transition-all ${
                          selectedCategory === category 
                            ? 'bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-purple-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] rounded-full"
                          style={{ width: `${(priceRange[1] / 200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                        className={`px-4 py-2 rounded-2xl transition-all ${
                          selectedColor === color 
                            ? 'bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className="py-2 px-4 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-[#f4a5f2] hover:to-[#8810a3] hover:text-white transition-all"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> results
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] text-white shadow-lg">
                1
              </button>
              <button className="px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 shadow-lg">
                2
              </button>
              <button className="px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 shadow-lg">
                3
              </button>
              <span className="px-2">...</span>
              <button className="px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 shadow-lg">
                10
              </button>
            </div>
          </div>
        </div>

        {/* Footer Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🚚</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free shipping for orders above $150</p>
          </div>
          
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💳</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Flexible Payment</h3>
            <p className="text-gray-600">Multiple secure payment options</p>
          </div>
          
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-[#f4a5f2] to-[#8810a3] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎧</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600">We support online all days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingStore;