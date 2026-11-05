import React, { useState } from 'react';
import Header from './components/Header';
import TopArchesBanner from './components/TopArchesBanner';
import FeaturedHeroCard from './components/FeaturedHeroCard';
import HeritagePillars from './components/HeritagePillars';
import CustomerDashboard from './components/CustomerDashboard';
import OutletNetwork from './components/OutletNetwork';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import LoginModal from './components/LoginModal';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { toast } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf6] text-gray-900 selection:bg-[#095835] selection:text-white">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#03331b] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-3 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE (Directly inspired by Reference UI) */}
        {activeTab === 'home' && (
          <div>
            {/* Top Arches Green Banner (from Screenshot Top Section) */}
            <TopArchesBanner
              onNavigateToOutlets={() => setActiveTab('outlets')}
              onNavigateToCommercial={() => setActiveTab('dashboard')}
            />

            {/* Featured Product Hero Card (from Screenshot Middle Section) */}
            <FeaturedHeroCard
              onSelectProduct={(p) => setQuickViewProduct(p)}
            />

            {/* Heritage Gujarati Banner & 8 Purity Badges (from Screenshot Bottom Section) */}
            <HeritagePillars
              onSelectSize={(size) => {
                const g20 = PRODUCTS[0];
                setQuickViewProduct(g20);
              }}
            />

            {/* Quick Catalog Spotlight inside Home */}
            <section className="py-12 px-4 max-w-6xl mx-auto border-t border-emerald-900/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pure Oils • Cleaners • Soaps • 15L Waterbag</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#03331b]">
                    Explore All Orsolum Products & Add to Cart
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Authentic Saurashtra G20 Groundnut Oil, Acid-Free Washroom &amp; Floor Cleaners, Grade-1 Handmade Soaps, and 15L Insulated Waterbag.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#095835] text-white hover:bg-[#03331b] text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                  <span>Open Full Customer Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

              {/* Category Quick Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PRODUCTS PAGE */}
        {activeTab === 'products' && (
          <div className="py-8">
            <CustomerDashboard
              onOpenLogin={() => setIsLoginOpen(true)}
              onQuickViewProduct={(p) => setQuickViewProduct(p)}
            />
          </div>
        )}

        {/* VIEW 3: CUSTOMER DASHBOARD (The core user request) */}
        {activeTab === 'dashboard' && (
          <div className="py-4">
            <CustomerDashboard
              onOpenLogin={() => setIsLoginOpen(true)}
              onQuickViewProduct={(p) => setQuickViewProduct(p)}
            />
          </div>
        )}

        {/* VIEW 4: GUJARAT OUTLET NETWORK */}
        {activeTab === 'outlets' && (
          <OutletNetwork />
        )}

        {/* VIEW 5: HERITAGE & PURITY */}
        {activeTab === 'heritage' && (
          <div>
            <HeritagePillars />
            <OutletNetwork />
          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onViewOrders={() => {
          setIsCheckoutOpen(false);
          setActiveTab('dashboard');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          setActiveTab('dashboard');
        }}
      />

      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

    </div>
  );
}

