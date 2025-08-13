import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Menu, ShoppingBag, X, Home, Shirt, Watch, Percent, User, Heart } from 'lucide-react';
import OutfitCompatibilityChecker from './outfit';

const AxiomWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const slides = [
    {
      id: 1,
      title: "AXIOM Elite",
      subtitle: "Premium Performance Wear",
      description: "Engineered for the modern man who demands excellence in every detail",
      buttonText: "Explore Collection",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
      bgColor: "from-slate-900 via-blue-900 to-indigo-900",
      accentColor: "from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      title: "Urban Edge",
      subtitle: "Street Style Redefined",
      description: "Contemporary designs that bridge the gap between comfort and sophistication",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=face",
      bgColor: "from-gray-900 via-slate-800 to-zinc-900",
      accentColor: "from-orange-400 to-red-500"
    },
    {
      id: 3,
      title: "Executive",
      subtitle: "Business Elevated",
      description: "Sophisticated pieces crafted for the discerning professional",
      buttonText: "View Suits",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=800&h=600&fit=crop&crop=face",
      bgColor: "from-neutral-900 via-stone-800 to-amber-900",
      accentColor: "from-amber-400 to-yellow-500"
    }
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'clothing', label: 'Clothing', icon: Shirt },
    { id: 'accessories', label: 'Accessories', icon: Watch },
    { id: 'sale', label: 'Sale', icon: Percent },
    { id: 'account', label: 'Account', icon: User }
  ];

  useEffect(() => {
    if (currentPage === 'home') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  // Hero Page Component
  const HeroPage = () => (
    <div className="relative w-full h-screen overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgColor} transition-all duration-1000 ease-in-out`}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 right-20 w-32 h-32 bg-gradient-to-br ${currentSlideData.accentColor} rounded-full opacity-20 animate-pulse`}></div>
        <div className={`absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br ${currentSlideData.accentColor} rounded-full opacity-15 animate-bounce`} style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-20 bg-white/10 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-16 bg-white/10 rounded-full transform -rotate-45"></div>
      </div>

      <div className="relative z-40 flex items-center h-full px-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className={`text-sm font-semibold tracking-widest text-transparent bg-gradient-to-r ${currentSlideData.accentColor} bg-clip-text uppercase`}>
                {currentSlideData.subtitle}
              </h2>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none">
                {currentSlideData.title.split('').map((letter, index) => (
                  <span 
                    key={index} 
                    className="inline-block animate-pulse" 
                    style={{ animationDelay: `${index * 100}ms`, animationDuration: '2s' }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-white/70 max-w-md leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentPage('clothing')}
                className={`px-8 py-4 bg-gradient-to-r ${currentSlideData.accentColor} text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transform transition-all duration-300`}
              >
                {currentSlideData.buttonText}
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src={currentSlideData.image} 
                alt="Model"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/30 rounded"></div>
                </div>
                <p className="text-sm font-medium">Premium Fabric</p>
                <p className="text-xs text-white/60">Italian Cotton</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-50 flex items-center space-x-6">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? `bg-gradient-to-r ${currentSlideData.accentColor} shadow-lg` 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 border border-white/20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute bottom-8 right-8 z-50 text-white/60 font-mono text-sm">
        <span className="text-white font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className="text-white/5 font-black text-[20rem] leading-none tracking-tighter select-none">
          AXIOM
        </div>
      </div>
    </div>
  );

  // Other Pages Components
  const ClothingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-900 mb-4">Men's Clothing</h1>
          <p className="text-xl text-gray-600">Discover our premium collection</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(item => (
            <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Shirt className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Shirt {item}</h3>
                <p className="text-gray-600 mb-4">Crafted with Italian cotton</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">$199</span>
                  <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AccessoriesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-900 mb-4">Accessories</h1>
          <p className="text-xl text-gray-600">Complete your look with premium accessories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Watch', 'Belt', 'Wallet', 'Sunglasses'].map(item => (
            <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                <Watch className="w-16 h-16 text-blue-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item}</h3>
                <p className="text-gray-600 mb-4">Premium quality</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">$99</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SalePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-red-600 mb-4">SALE</h1>
          <p className="text-xl text-gray-600">Up to 50% off selected items</p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <Percent className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
            <p className="text-lg text-gray-600">Limited time deals on premium menswear</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AccountPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-24">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-900 mb-4">My Account</h1>
          <p className="text-xl text-gray-600">Manage your AXIOM experience</p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <User className="w-24 h-24 text-purple-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h2>
            <p className="text-lg text-gray-600">Your account dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HeroPage />;
      case 'clothing': return <ClothingPage />;
      case 'accessories': return <AccessoriesPage />;
      case 'sale': return <SalePage />;
      case 'account': return <AccountPage />;
      default: return <HeroPage />;
    }
  };

  return (
    <div className="relative">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold text-white tracking-wider hover:scale-105 transition-transform duration-200"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AXIOM
              </span>
            </button>
            <div className="hidden md:flex space-x-8 text-white/80">
              {navigationItems.slice(1, -1).map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`hover:text-white transition-colors duration-200 ${
                    currentPage === item.id ? 'text-white font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors duration-200" />
            <Heart className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors duration-200" />
            <ShoppingBag className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors duration-200" />
            <button
              onClick={() => setCurrentPage('account')}
              className={`p-2 rounded-full transition-colors duration-200 ${
                currentPage === 'account' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <User className="w-6 h-6 text-white/80 hover:text-white" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white/80" />
              ) : (
                <Menu className="w-6 h-6 text-white/80" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
            <div className="px-8 py-4 space-y-4">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full text-left py-2 text-white/80 hover:text-white transition-colors duration-200 ${
                      currentPage === item.id ? 'text-white font-semibold' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
            
      {/* Page Content */}
      {renderPage()}
    </div>
  );
};

export default AxiomWebsite;