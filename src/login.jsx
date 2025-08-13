import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const FitscapeAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg relative">
              <Sparkles className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
            Fitscape
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back, beautiful' : 'Discover your perfect style'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-gray-600 text-center mt-2">
              {isLogin ? 'Enter your details to access your wardrobe' : 'Join our fashion community today'}
            </p>
          </div>

          <div className="space-y-5">
            {/* Name Field - Only for Signup */}
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required={!isLogin}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-purple-200 bg-white/70 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 placeholder-gray-500"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-purple-200 bg-white/70 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 placeholder-gray-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-purple-200 bg-white/70 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password Field - Only for Signup */}
            {!isLogin && (
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required={!isLogin}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-purple-200 bg-white/70 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {/* Forgot Password - Only for Login */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-800 text-sm transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Terms and Conditions - Only for Signup */}
            {!isLogin && (
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                By creating an account, you agree to our{' '}
                <button className="text-purple-600 hover:text-purple-800 underline transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-purple-600 hover:text-purple-800 underline transition-colors">
                  Privacy Policy
                </button>
              </p>
            )}
          </div>

          {/* Toggle Between Login/Signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={toggleForm}
              className="text-purple-600 hover:text-purple-800 font-semibold mt-2 transition-colors hover:underline"
            >
              {isLogin ? 'Create one now' : 'Sign in instead'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Fitscape. Where fashion meets you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FitscapeAuth;