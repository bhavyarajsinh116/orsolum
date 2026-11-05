import React from 'react';
import { ShieldCheck, Heart, Sparkles, Phone, Award, Flame, Leaf, Wind, Utensils, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function HeritagePillars({ onSelectSize }) {
  const { addToCart } = useCart();
  const heroProduct = PRODUCTS[0];

  const handleQuickAdd = (sizeCode) => {
    const variant = heroProduct.variants.find(v => v.size === sizeCode);
    if (variant) {
      addToCart(heroProduct, variant, 1);
    }
  };

  const featurePillars = [
    { title: "Pure G-20", desc: "Premium Saurashtra Seeds", icon: Leaf },
    { title: "15L / 5L / 1L", desc: "Pure Groundnut Oil", icon: Award },
    { title: "No Artificial Flavor", desc: "Zero Essence or Fragrance", icon: Sparkles },
    { title: "Less Oil Absorb", desc: "Light, Crispy Frying", icon: Flame },
    { title: "100% Chemical Free", desc: "Traditional Lakdi Ghani", icon: ShieldCheck },
    { title: "Pure Smell", desc: "Natural Nutty Aroma", icon: Wind },
    { title: "No Cholesterol", desc: "Healthy Heart Lipids", icon: Heart },
    { title: "Best For Frying", desc: "High Heat Tolerance", icon: Utensils }
  ];

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Authentic Poster & Price Table (From Reference Bottom-Left) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#fdfbf7] via-white to-amber-50/50 rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/15 flex flex-col justify-between">
          
          <div>
            {/* Top Gujarati Punchline */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src="/images/Orsolumlogo.png" 
                  alt="Orsolum Logo" 
                  className="h-9 w-auto"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-[#095835]">
                  Organic Soil
                </span>
              </div>
              <span className="text-[11px] font-extrabold bg-[#095835] text-amber-300 px-3 py-1 rounded-full shadow-sm">
                સૌરાષ્ટ્રની શ્રેષ્ઠ ગુણવત્તા
              </span>
            </div>

            <div className="text-center my-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#03331b] leading-snug">
                કપાસિયા તેલ નહીં,
              </h3>
              <h3 className="text-2xl sm:text-3xl font-black text-[#095835] leading-snug mt-1">
                પરંતુ ઓરસોલમ મગફળીના તેલ પર વિશ્વાસ કરો.
              </h3>
              <p className="text-xs text-gray-600 mt-2">
                Say NO to refined cottonseed oil with artificial chemicals. Choose 100% pure cold-pressed Saurashtra G20 Groundnut Oil for your family's daily health.
              </p>
            </div>

            {/* Authentic Pricing Table (From Reference) */}
            <div className="mt-5 overflow-hidden rounded-2xl border-2 border-[#095835] shadow-md">
              <div className="grid grid-cols-3 bg-[#03331b] text-amber-200 text-xs sm:text-sm font-black text-center py-2.5">
                <div>Liter / Size</div>
                <div>MRP</div>
                <div>SELLING PRICE</div>
              </div>

              {/* 15 Liter Tier */}
              <div className="grid grid-cols-3 bg-red-600 text-white font-extrabold text-center py-3 border-b border-red-500 items-center text-xs sm:text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-base font-black">15 Liter</span>
                  <span className="text-[10px] text-amber-200">Family Saver</span>
                </div>
                <div className="line-through text-red-200 text-sm">
                  ₹ 3500
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-black text-amber-300">₹ 3345</span>
                  <button 
                    onClick={() => handleQuickAdd("15L")}
                    className="ml-1 bg-white text-red-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded shadow"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* 5 Liter Tier */}
              <div className="grid grid-cols-3 bg-red-600/95 text-white font-extrabold text-center py-3 border-b border-red-500 items-center text-xs sm:text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-base font-black">5 Liter</span>
                  <span className="text-[10px] text-amber-200">Kitchen Jar</span>
                </div>
                <div className="line-through text-red-200 text-sm">
                  ₹ 1500
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-black text-amber-300">₹ 1299</span>
                  <button 
                    onClick={() => handleQuickAdd("5L")}
                    className="ml-1 bg-white text-red-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded shadow"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* 1 Liter Tier */}
              <div className="grid grid-cols-3 bg-red-600 text-white font-extrabold text-center py-3 items-center text-xs sm:text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-base font-black">1 Liter</span>
                  <span className="text-[10px] text-amber-200">Bottle</span>
                </div>
                <div className="line-through text-red-200 text-sm">
                  ₹ 280
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-black text-amber-300">₹ 250</span>
                  <button 
                    onClick={() => handleQuickAdd("1L")}
                    className="ml-1 bg-white text-red-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded shadow"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Visual presentation: Mascot & Product Tin */}
            <div className="mt-5 grid grid-cols-2 gap-4 items-center bg-amber-100/50 p-4 rounded-2xl border border-amber-300/40">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="/images/mascot_preview.jpg" 
                  alt="Orsolum Peanut Mascot" 
                  className="h-28 sm:h-32 object-contain drop-shadow-md rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/oil.jpg";
                  }}
                />
                <span className="text-xs font-black text-[#03331b] mt-1">100% Shuddh Mungfali</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <img 
                  src="/images/tin_preview.jpg" 
                  alt="Orsolum 15L Tin" 
                  className="h-28 sm:h-32 object-contain drop-shadow-md rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/oil.jpg";
                  }}
                />
                <span className="text-xs font-black text-emerald-800 mt-1">15L Fresh Tin Pack</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 text-center text-xs text-gray-500">
            * Direct factory pricing. Delivery available across Rajkot, Ahmedabad, Surat, Vadodara & all Gujarat.
          </div>
        </div>

        {/* Right Side: Trust Card, Founder Namaste & 8 Purity Badges (From Reference Bottom-Right) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          
          {/* Top Namaste Green Card */}
          <div className="bg-[#095835] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border-2 border-emerald-400/30">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5b027_1px,transparent_1px)] [background-size:12px_12px]"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              {/* Founder Namaste photo */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md">
                  <img 
                    src="/images/founder_namaste.jpg" 
                    alt="Founder in Namaste greeting" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/founder_award.jpg";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow">
                  TRUSTED
                </div>
              </div>

              {/* Message */}
              <div className="text-center sm:text-left">
                <p className="text-amber-300 text-xs font-extrabold uppercase tracking-widest">
                  Direct from Saurashtra Soil
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-tight">
                  Thank You For Trusting Orsolum Oil
                </h3>
                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  "Our mission is to bring 100% natural, unadulterated oil back to every Gujarati home, 
                  protecting families from chemical cottonseed oils."
                </p>
                <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-semibold bg-emerald-900/80 px-2.5 py-1 rounded text-amber-200 border border-emerald-700">
                    www.orsolum.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 8 Feature Badges Grid (Matching Reference Exact Layout) */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featurePillars.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-emerald-50/60 hover:bg-emerald-100/70 transition-all rounded-2xl p-3 text-center border border-emerald-900/10 flex flex-col items-center justify-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-black text-[#03331b] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Slogan & Customer Care Helpline Banner */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#095835] uppercase tracking-wide">
                  The Taste of Tradition,
                </p>
                <p className="text-sm font-extrabold text-[#03331b]">
                  The Trust of Orsolum.
                </p>
              </div>

              <a 
                href="tel:7820280700"
                className="flex items-center gap-3 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-2xl border border-emerald-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#095835] text-amber-300 flex items-center justify-center shadow">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-gray-500 block uppercase">
                    Customer Care No
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#03331b]">
                    7820 280 700
                  </span>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

