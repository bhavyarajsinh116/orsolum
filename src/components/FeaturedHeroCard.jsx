import React, { useState } from 'react';
import { ShoppingCart, Check, Star, ShieldCheck, Zap, Award, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function FeaturedHeroCard({ onSelectProduct }) {
  const { addToCart, setIsCartOpen } = useCart();
  const heroProduct = PRODUCTS[0]; // Orsolum Oil – Groundnut (G20)

  const [selectedSize, setSelectedSize] = useState("15L");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentVariant = heroProduct.variants.find(v => v.size === selectedSize) || heroProduct.variants[0];

  const handleAddToCart = () => {
    addToCart(heroProduct, currentVariant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBookNow = () => {
    addToCart(heroProduct, currentVariant, quantity);
    setIsCartOpen(true);
  };

  return (
    <section className="py-8 sm:py-12 px-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-900/10 overflow-hidden p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Founder with Award & Certificate (Directly from reference) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-800/15 group">
              <img 
                src="/images/founder_award.jpg" 
                alt="Orsolum Founder with Certificate & Recognition" 
                className="w-full h-72 sm:h-80 md:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/oil.jpg";
                }}
              />

              {/* Award / Purity Overlay Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 rounded-xl text-white">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold leading-tight">Certified 100% Saurashtra G-20 Purity</p>
                    <p className="text-[10px] text-gray-300">Awarded for Traditional Wood Pressed Quality</p>
                  </div>
                </div>
              </div>

              {/* Gujarat Authentic Trust Tag */}
              <div className="absolute top-3 left-3 bg-[#095835] text-amber-300 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-300/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BAAP HAI QUALITY GUARANTEE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact UI Card from User Reference */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Tagline / Category */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-emerald-100 text-[#095835] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Flagship Heritage Series
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.9 / 5.0 (1,420+ Gujarat Families)</span>
              </div>
            </div>

            {/* Title matching screenshot: Orsolum Oil – Groundnut (G20) */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#03331b] tracking-tight leading-tight">
              Orsolum Oil – Groundnut (G20)
            </h2>

            {/* Gujarati Subtitle */}
            <p className="text-sm font-semibold text-emerald-800 mt-1">
              {heroProduct.gujaratiTitle} • {heroProduct.gujaratiDesc}
            </p>

            {/* Description matching screenshot */}
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              Orsolum groundnut oil - 100% pure G20 oil, no chemicals, no additives, no cholesterol. 
              Extracted through traditional Saurashtra wood pressing that keeps all natural aroma, 
              antioxidants and nutrients intact.
            </p>

            {/* Size Selector (15L / 5L / 1L) matching pricing table */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Select Pack Size:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {heroProduct.variants.map((variant) => {
                  const isSelected = selectedSize === variant.size;
                  return (
                    <button
                      key={variant.size}
                      onClick={() => setSelectedSize(variant.size)}
                      className={`relative p-3 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#095835] bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20'
                          : 'border-gray-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      {variant.popular && (
                        <span className="absolute -top-2.5 left-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                          POPULAR
                        </span>
                      )}

                      <span className="text-xs sm:text-sm font-bold text-gray-900">
                        {variant.label}
                      </span>

                      <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-base sm:text-lg font-extrabold text-[#095835]">
                          ₹{variant.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{variant.mrp}
                        </span>
                      </div>

                      <span className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                        Save ₹{variant.save}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Display matching screenshot: ₹ 3345 15L */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3 p-4 bg-[#fbfaf6] rounded-2xl border border-gray-200">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#03331b] tracking-tight">
                ₹ {currentVariant.price}
              </span>
              <span className="text-lg font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
                {currentVariant.size} Tin
              </span>
              <span className="text-sm text-gray-400 line-through">
                MRP ₹ {currentVariant.mrp}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                You Save ₹{currentVariant.save} (Special Direct Farm Rate)
              </span>
            </div>

            {/* Action Buttons: Book Now (matching UI) & Add to Cart */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-1 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-[#03331b]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Book Now Button (Stylized like the screenshot 🛒 Book Now) */}
              <button
                onClick={handleBookNow}
                className="flex-1 min-w-[170px] py-3.5 px-6 rounded-full bg-[#095835] hover:bg-[#03331b] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <ShoppingCart className="w-5 h-5 text-amber-300" />
                <span>🛒 Book Now (Quick Order)</span>
              </button>

              {/* Add to Cart secondary button */}
              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`py-3.5 px-5 rounded-full font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white border-[#095835] text-[#095835] hover:bg-emerald-50'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added!
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-500" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Quick trust bullet points */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1 font-medium text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Saurashtra G20 Groundnuts
              </span>
              <span className="flex items-center gap-1 font-medium text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" /> Free Gujarat Delivery over ₹999
              </span>
              <span className="flex items-center gap-1 font-medium text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" /> Cash on Delivery / UPI
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

