import { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function FitscapeFooter() {
  return (
    <footer className="bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-white bg-clip-text text-transparent">
                Fitscape
              </h3>
            </div>
            <p className="text-purple-200 mb-6 leading-relaxed">
              Empowering women through fashion that moves with you. From workout wear to everyday elegance, find your perfect fit.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-300">Shop</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Activewear</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Casual Wear</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Accessories</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">New Arrivals</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Sale</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Size Guide</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-300">Customer Care</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Shipping Info</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Returns & Exchanges</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-300">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200">hello@fitscape.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-300 mt-0.5" />
                <span className="text-purple-200">
                  123 Fashion Avenue<br />
                  Style City, SC 12345
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3 text-pink-200">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-purple-600 border border-purple-500 rounded-l-md text-white placeholder-purple-300 focus:outline-none focus:border-pink-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-r-md transition-colors duration-200 font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-purple-300 text-sm">
              © 2025 Fitscape. All rights reserved. Made with love for active women.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-purple-300 hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors duration-200">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}