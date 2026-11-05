import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingCart, Zap, Check, Heart, Award, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, isOpen, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "15L");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeVariant = product.variants.find(v => v.size === selectedSize) || product.variants[0];

  const handleAdd = () => {
    addToCart(product, activeVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addToCart(product, activeVariant, quantity);
    setIsCartOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 border border-emerald-900/10 max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header bar */}
        <div className="p-4 bg-gradient-to-r from-[#03331b] to-[#095835] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
            <span className="text-xs font-semibold text-emerald-100">100% Cold-Pressed Lab Tested</span>
          </div>

          <button
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Image display */}
            <div className="bg-[#fbfaf6] p-6 rounded-2xl flex flex-col items-center justify-center border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-auto object-contain drop-shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/oil.jpg";
                }}
              />
              <span className="text-xs font-bold text-emerald-800 mt-3">
                {activeVariant.label} ({activeVariant.weight})
              </span>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">{product.rating} ({product.reviewsCount} reviews)</span>
              </div>

              <h2 className="text-xl font-black text-[#03331b] leading-tight">
                {product.name}
              </h2>

              <p className="text-xs font-bold text-emerald-800 mt-0.5">
                {product.gujaratiTitle}
              </p>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {product.tagline}
              </p>

              {/* Size Select */}
              <div className="mt-4">
                <span className="text-[11px] font-bold uppercase text-gray-500 block mb-1">
                  Choose Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedSize(v.size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === v.size
                          ? 'bg-[#095835] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {v.size} (₹{v.price})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#03331b]">
                  ₹{activeVariant.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{activeVariant.mrp}
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  Save ₹{activeVariant.save}
                </span>
              </div>
            </div>
          </div>

          {/* Key Purity Features */}
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-900/10">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#095835] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Purity Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
              {product.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutritional Breakdown Table */}
          {product.nutritionPer100g && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
                Nutritional Values (Per 100g)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">Energy</span>
                  <span className="font-bold text-[#03331b]">{product.nutritionPer100g.energy}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">Cholesterol</span>
                  <span className="font-bold text-emerald-700">{product.nutritionPer100g.cholesterol}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">Trans Fat</span>
                  <span className="font-bold text-emerald-700">{product.nutritionPer100g.transFat}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">Vitamin E</span>
                  <span className="font-bold text-amber-700">{product.nutritionPer100g.vitaminE}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 px-2 py-1 self-start sm:self-auto">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded"
              >
                -
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#095835] hover:bg-[#03331b] text-white shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-amber-300" /> Add to Cart (₹{activeVariant.price * quantity})
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3 px-5 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center gap-1.5 shadow"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

