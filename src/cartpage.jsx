import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Heart, Tag, Truck, Shield, CreditCard } from 'lucide-react';

const FitscapeCartPage2 = () => {
  // Sample cart items (what would come from previous page)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Purple Haze Sports Bra",
      price: 45.99,
      originalPrice: 55.99,
      image: "https://images.unsplash.com/photo-1506629905607-66bf4d18b2db?w=300&h=300&fit=crop",
      category: "Sports Bras",
      size: "M",
      color: "Purple",
      quantity: 2,
      inStock: true,
      discount: 18
    },
    {
      id: 2,
      name: "Lavender Leggings Pro",
      price: 68.99,
      originalPrice: 78.99,
      image: "https://images.unsplash.com/photo-1506629905607-66bf4d18b2db?w=300&h=300&fit=crop",
      category: "Leggings",
      size: "L",
      color: "Lavender",
      quantity: 1,
      inStock: true,
      discount: 12
    },
    {
      id: 3,
      name: "Amethyst Tank Top",
      price: 32.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1506629905607-66bf4d18b2db?w=300&h=300&fit=crop",
      category: "Tops",
      size: "S",
      color: "Amethyst",
      quantity: 1,
      inStock: true,
      discount: 17
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const saveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    setSavedItems([...savedItems, itemToSave]);
    removeFromCart(id);
  };

  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => item.id === id);
    setCartItems([...cartItems, itemToMove]);
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'FITSCAPE20') {
      setAppliedPromo({ code: 'FITSCAPE20', discount: 20, amount: getSubtotal() * 0.20 });
    } else if (promoCode.toUpperCase() === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', discount: 10, amount: getSubtotal() * 0.10 });
    } else {
      alert('Invalid promo code');
    }
    setPromoCode('');
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getShipping = () => {
    return getSubtotal() > 75 ? 0 : 9.99;
  };

  const getDiscount = () => {
    return appliedPromo ? appliedPromo.amount : 0;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping() - getDiscount();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200">
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </button>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FITSCAPE
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h2>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl">
              <div className="flex items-center">
                <Truck size={24} className="mr-3" />
                <div>
                  <p className="font-semibold">
                    {getSubtotal() >= 75 ? '🎉 You qualified for FREE shipping!' : `Add $${(75 - getSubtotal()).toFixed(2)} more for FREE shipping!`}
                  </p>
                  {getSubtotal() < 75 && (
                    <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${Math.min((getSubtotal() / 75) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full sm:w-32 h-32 object-cover rounded-xl"
                      />
                      {item.discount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>Color: <strong>{item.color}</strong></span>
                            <span className="text-green-600 font-medium">✓ In Stock</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ${item.price}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors duration-200"
                          >
                            <Heart size={16} className="mr-1" />
                            Save for Later
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Saved for Later ({savedItems.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedItems.map((item) => (
                    <div key={`saved-${item.id}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.size} • {item.color}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => moveToCart(item.id)}
                            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                          >
                            Move to Cart
                          </button>
                          <button className="text-xs text-red-500 hover:text-red-700 font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Order Summary
              </h3>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center text-green-600 text-sm">
                    <Tag size={16} className="mr-1" />
                    {appliedPromo.code} applied - {appliedPromo.discount}% off
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${getTax().toFixed(2)}</span>
                </div>
                
                {getTotalSavings() > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>You Save</span>
                    <span>${getTotalSavings().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg mb-4">
                Proceed to Checkout
              </button>

              {/* Security Features */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center">
                  <CreditCard size={16} className="mr-2 text-blue-500" />
                  <span>Multiple payment options</span>
                </div>
                <div className="flex items-center">
                  <Truck size={16} className="mr-2 text-purple-500" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitscapeCartPage2;