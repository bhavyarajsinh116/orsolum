import React, { useState } from 'react';
import { 
  User, Package, ShoppingBag, ShieldCheck, Coins, 
  MapPin, Clock, Search, Filter, Phone, CheckCircle, 
  RefreshCw, ArrowRight, Sparkles, ChevronRight, AlertCircle, LogIn 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

export default function CustomerDashboard({ onOpenLogin, onQuickViewProduct }) {
  const { user, isLoggedIn, logout } = useAuth();
  const { addToCart, setIsCartOpen, showToast } = useCart();

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog', 'orders', 'addresses', 'loyalty'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.gujaratiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReorder = (order) => {
    // Re-add items to cart
    const g20 = PRODUCTS[0];
    addToCart(g20, g20.variants[0], 1);
    setIsCartOpen(true);
    showToast(`Reordered items from ${order.orderId}!`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Header / Account Banner */}
      <div className="bg-gradient-to-r from-[#03331b] via-[#095835] to-[#0c6b41] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8 border border-emerald-400/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5b027_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg ring-4 ring-white/20">
              {isLoggedIn ? user.name.charAt(0) : "O"}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isLoggedIn ? `Namaste, ${user.name}` : "Welcome to Orsolum Store"}
                </h1>
                {isLoggedIn && (
                  <span className="bg-amber-400/90 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {user.tier}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 mt-1 flex items-center gap-2 flex-wrap">
                {isLoggedIn ? (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{user.city}, Gujarat</span>
                    <span>•</span>
                    <span>Phone: {user.phone}</span>
                  </>
                ) : (
                  <span>Log in to track your orders, view member pricing, and earn Orsolum loyalty coins.</span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Metrics / Action */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] text-emerald-200 font-semibold uppercase">Orsolum Coins</p>
                  <p className="text-xl font-black text-amber-300">{user.coins} <span className="text-xs font-medium text-white">(₹{user.coins} off)</span></p>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Customer Login / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="relative z-10 flex items-center gap-2 mt-6 pt-6 border-t border-white/15 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'catalog'
                ? 'bg-white text-[#03331b] shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-800" />
            <span>Product Store & Add to Cart</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-white text-[#03331b] shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-800" />
            <span>My Orders {isLoggedIn && user.orders?.length > 0 && `(${user.orders.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'addresses'
                ? 'bg-white text-[#03331b] shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>Delivery Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'loyalty'
                ? 'bg-white text-[#03331b] shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Purity Lab & Benefits</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRODUCT CATALOG & ADD TO CART (Core Requirement) */}
      {activeTab === 'catalog' && (
        <div>
          {/* Controls: Search & Category Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search G20, Mustard, Sesame..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835]"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              {[
                { id: 'all', label: 'All Products', count: PRODUCTS.length },
                { id: 'oils', label: 'Pure Cooking Oils', count: 3 },
                { id: 'cleaners', label: 'Washroom & Floor Cleaners', count: 2 },
                { id: 'soaps', label: 'Cold Pressed Soaps', count: 1 },
                { id: 'waterbag', label: '15L Canvas Waterbag', count: 1 },
                { id: 'commercial', label: 'Institutional Bulk', count: 1 },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-[#095835] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-amber-400 text-slate-950 font-black' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results count & banner */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-[#03331b]">
              Available Products for Online Order & Cart ({filteredProducts.length})
            </h2>
            <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ⚡ Same Day Dispatch Across Gujarat
            </span>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickViewProduct}
              />
            ))}
          </div>

          {/* Gujarat Regional Guarantee Banner */}
          <div className="mt-12 bg-gradient-to-r from-amber-50 via-white to-emerald-50 border-2 border-dashed border-[#095835]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#095835] text-amber-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#03331b]">
                  ઓરસોલમ શુદ્ધતાની ગેરંટી (Baap Hai Guarantee)
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  100% Saurashtra groundnuts, zero chemical bleaching, zero artificial scent. 
                  If you find even 0.01% adulteration, we guarantee a 10x refund.
                </p>
              </div>
            </div>

            <a
              href="tel:7820280700"
              className="px-5 py-3 rounded-xl bg-[#095835] hover:bg-[#03331b] text-white font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call Helpline: 7820 280 700</span>
            </a>
          </div>
        </div>
      )}

      {/* TAB 2: MY ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#03331b]">Order History & Real-Time Tracking</h2>
              <p className="text-xs text-gray-500 mt-0.5">Track live shipment from Rajkot central milling unit</p>
            </div>

            {isLoggedIn && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {user.orders?.length || 0} Total Orders
              </span>
            )}
          </div>

          {!isLoggedIn ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">Please log in to view your orders</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                Sign in with your registered phone number or test account to see real-time dispatch status.
              </p>
              <button
                onClick={onOpenLogin}
                className="mt-4 px-6 py-2.5 bg-[#095835] text-white font-bold rounded-xl text-xs hover:bg-[#03331b]"
              >
                Log In Now
              </button>
            </div>
          ) : user.orders && user.orders.length > 0 ? (
            <div className="space-y-4">
              {user.orders.map((order, idx) => (
                <div 
                  key={order.orderId || idx}
                  className="border border-gray-200 rounded-2xl p-4 sm:p-6 hover:border-emerald-300 transition-all bg-[#fbfaf6]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#03331b]">Order #{order.orderId}</span>
                          <span className="text-xs text-gray-400">• {order.date}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600 mt-0.5">{order.itemsSummary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-[#095835] border border-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {order.status}
                      </span>
                      <span className="text-base font-black text-[#03331b]">₹{order.total}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 pt-1">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Clock className="w-3.5 h-3.5" /> {order.deliveryDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleReorder(order)}
                        className="px-3.5 py-1.5 rounded-xl bg-white border border-[#095835] text-[#095835] font-bold hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reorder This
                      </button>
                      <button 
                        onClick={() => showToast(`Invoice downloaded for Order #${order.orderId}`, "success")}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors"
                      >
                        Tax Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-gray-700">No past orders yet</p>
              <p className="text-xs text-gray-500 mt-1">Browse our store and add 100% pure G-20 oil to cart!</p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="mt-4 px-6 py-2.5 bg-[#095835] text-white font-bold rounded-xl text-xs hover:bg-[#03331b]"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#03331b]">Delivery Addresses</h2>
              <p className="text-xs text-gray-500 mt-0.5">Where should we deliver your pure G-20 oil?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-[#095835] bg-emerald-50/40 rounded-2xl p-5 relative">
              <span className="absolute top-4 right-4 bg-[#095835] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                DEFAULT HOME
              </span>

              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#095835]" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  {isLoggedIn ? user.name : "Rajesh Patel"}
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {isLoggedIn ? user.address : "Block B-402, Shivalik Greens, 150 Feet Ring Road, Rajkot, Gujarat - 360005"}
              </p>

              <div className="mt-4 pt-3 border-t border-emerald-900/10 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Contact: {isLoggedIn ? user.phone : "+91 98250 12345"}</span>
                <span className="font-bold text-[#095835]">Delivered by Orsolum Direct Express</span>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-2">
                +
              </div>
              <p className="text-xs font-bold text-gray-800">Add New Delivery Address</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Farm house, restaurant, canteen or relative</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PURITY & BENEFITS */}
      {activeTab === 'loyalty' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#03331b] mb-2">Why Gujarat Chooses Orsolum G-20 Groundnut Oil</h2>
          <p className="text-xs text-gray-600 mb-6">Traditional cold-pressed wood extraction vs. commercial solvent extraction</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
              <h3 className="font-extrabold text-sm text-[#095835] flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Orsolum Pure G-20 Oil
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>100% Saurashtra G20 Groundnuts:</strong> Highest natural oil density & sweet aroma.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Wood Pressed (Lakdi Ghani):</strong> Temperature maintained below 45°C to preserve vitamin E.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Zero Chemical Refining:</strong> No hexane, no bleaching earth, no caustic soda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Zero Cholesterol & Zero Trans Fat:</strong> Naturally protective for cardiovascular health.</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <h3 className="font-extrabold text-sm text-red-700 flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-red-600" /> Ordinary Cottonseed (કપાસિયા) Oils
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Cotton crop is sprayed with heavy pesticides and synthetic chemical fertilizers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Extracted using high-temperature petroleum solvents like Hexane.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Stripped of all natural smell and replaced with artificial essences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>High trans-fats and chemical residues that affect heart and metabolism.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

