import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const FitscapeOrderTracker2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock user data
  const mockUser = { email: 'demo@fitscape.com', password: 'demo123' };

  // Mock tracking data
  const mockTrackingData = {
    orderNumber: 'FS2024-001234',
    status: 'shipped',
    estimatedDelivery: '2024-08-16',
    currentLocation: 'Mumbai Distribution Center',
    items: [
      { name: 'FitScape Pro Running Shoes', quantity: 1, price: '₹4,999' },
      { name: 'Performance T-Shirt', quantity: 2, price: '₹1,998' }
    ],
    timeline: [
      { status: 'ordered', date: '2024-08-10', time: '10:30 AM', completed: true },
      { status: 'confirmed', date: '2024-08-10', time: '02:15 PM', completed: true },
      { status: 'shipped', date: '2024-08-12', time: '09:45 AM', completed: true },
      { status: 'out_for_delivery', date: '2024-08-16', time: 'Expected', completed: false },
      { status: 'delivered', date: '2024-08-16', time: 'Expected', completed: false }
    ]
  };

  const handleLogin = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (loginForm.email === mockUser.email && loginForm.password === mockUser.password) {
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        alert('Invalid credentials. Use demo@fitscape.com / demo123');
        setLoading(false);
      }
    }, 1000);
  };

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status, completed) => {
    const iconClass = `w-6 h-6 ${completed ? 'text-purple-600' : 'text-gray-400'}`;
    
    switch (status) {
      case 'ordered': return <Package className={iconClass} />;
      case 'confirmed': return <CheckCircle className={iconClass} />;
      case 'shipped': return <Truck className={iconClass} />;
      case 'out_for_delivery': return <MapPin className={iconClass} />;
      case 'delivered': return <CheckCircle className={iconClass} />;
      default: return <Clock className={iconClass} />;
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'ordered': 'Order Placed',
      'confirmed': 'Order Confirmed',
      'shipped': 'Shipped',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered'
    };
    return statusMap[status] || status;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">FitScape</h1>
            <p className="text-purple-200">Login to track your orders</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-purple-200">
            <p>Demo credentials:</p>
            <p>Email: demo@fitscape.com</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">FitScape</h1>
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-purple-200" />
            <span className="text-white">Welcome back!</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Order Tracking Form */}
        {!trackingData && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Track Your Order</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., FS2024-001234)"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Tracking...
                  </div>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
            <p className="text-purple-200 text-sm mt-4 text-center">
              Try order number: FS2024-001234
            </p>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Order Details</h3>
                <button
                  onClick={() => setTrackingData(null)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  Track Another Order
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-purple-200 mb-2">Order Number</p>
                  <p className="text-white font-semibold text-lg">{trackingData.orderNumber}</p>
                </div>
                <div>
                  <p className="text-purple-200 mb-2">Estimated Delivery</p>
                  <p className="text-white font-semibold text-lg">{trackingData.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-purple-200 mb-2">Current Status</p>
                  <p className="text-white font-semibold text-lg capitalize">{trackingData.status.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-purple-200 mb-2">Current Location</p>
                  <p className="text-white font-semibold text-lg">{trackingData.currentLocation}</p>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Order Progress</h3>
              <div className="space-y-4">
                {trackingData.timeline.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${item.completed ? 'bg-purple-600' : 'bg-gray-600'}`}>
                      {getStatusIcon(item.status, item.completed)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-semibold ${item.completed ? 'text-white' : 'text-gray-400'}`}>
                          {getStatusText(item.status)}
                        </p>
                        <p className={`text-sm ${item.completed ? 'text-purple-200' : 'text-gray-500'}`}>
                          {item.date} {item.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Items in this Order</h3>
              <div className="space-y-4">
                {trackingData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-purple-200 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-white font-semibold">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitscapeOrderTracker2;