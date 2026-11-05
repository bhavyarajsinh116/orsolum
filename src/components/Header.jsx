import React, { useState } from 'react';
import { ShoppingCart, User, Phone, MapPin, Search, Menu, X, ShieldCheck, Heart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ activeTab, setActiveTab, onOpenLogin }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products & Sizes' },
    { id: 'dashboard', label: 'Customer Dashboard', highlight: true },
    { id: 'outlets', label: '50+ Gujarat Outlets' },
    { id: 'heritage', label: 'About & Purity' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#095835]/15 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-[#03331b] text-amber-200 text-xs sm:text-sm py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-100">100% Pure Saurashtra G-20 Groundnut Oil • 0% Chemicals</span>
            <span className="hidden md:inline text-amber-300 font-bold bg-[#095835]/70 px-2 py-0.5 rounded text-[11px]">
              કપાસિયા તેલ નહીં, ઓરસોલમ મગફળીનું તેલ!
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            <a href="tel:7820280700" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Care: <strong className="text-white">7820 280 700</strong></span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-200">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>50+ Outlets Across Gujarat</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-1 bg-white rounded-full shadow-sm border border-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/images/Orsolumlogo.png" 
                alt="Orsolum Organic Soil Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/oil.jpg";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#03331b] leading-tight">
                ORSOLUM
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#095835]">
                ORGANIC SOIL • 100% PURE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-[#095835] text-white shadow-md shadow-emerald-900/20'
                    : item.highlight
                    ? 'bg-amber-100/70 text-[#095835] hover:bg-amber-100 border border-amber-300/60'
                    : 'text-gray-700 hover:text-[#095835] hover:bg-emerald-50'
                }`}
              >
                {item.highlight && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Customer Account / Login Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#095835] text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left text-xs leading-none">
                    <span className="block font-semibold text-[#03331b] truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">{user.coins} Coins</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-emerald-700 font-medium">{user.city} • {user.tier}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#095835] font-medium flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#095835]" />
                      Customer Dashboard & Store
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#095835] font-medium flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Order History ({user.orders ? user.orders.length : 0})
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#095835] hover:bg-[#03331b] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow"
              >
                <User className="w-4 h-4" />
                <span>Customer Login</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#095835] transition-all hover:scale-105 active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-extrabold text-[11px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-sm ring-2 ring-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-gray-700 hover:text-[#095835]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#095835] text-white'
                  : 'text-gray-800 hover:bg-emerald-50'
              }`}
            >
              <span>{item.label}</span>
              {item.highlight && (
                <span className="text-xs bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                  Customer Store
                </span>
              )}
            </button>
          ))}

          {!isLoggedIn ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full mt-2 py-3 bg-[#095835] text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Customer Login / Register
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full mt-2 py-2.5 border border-red-200 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out ({user.name.split(' ')[0]})
            </button>
          )}

          <div className="pt-3 border-t border-gray-100 text-xs text-center text-gray-500">
            Helpline: <strong>7820 280 700</strong> • Rajkot, Gujarat
          </div>
        </div>
      )}
    </header>
  );
}

